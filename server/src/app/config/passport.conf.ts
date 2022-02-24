import { RedisUtility } from "../../redis/utility/redis.utility";
import * as local from "passport-local";
import { MESSAGE } from "../utility/constant/constant";
import * as bcrypt from 'bcrypt';
import { UserDb } from "../../mongodb/query/user.db";
import { UserResponseDTO } from "../utility/dto/userResponse.dto";
import { UserSessionDTO } from "../utility/dto/userSession.dto";
import { UserSessionUtility } from "../utility/userSession.utility";
import { printErrorLog } from "../utility/logger";

const redisUtility = new RedisUtility();
const userDb = new UserDb();
const LOGIN_KEY_PREFIX = 'login_';
const userSessionUtility = new UserSessionUtility();
const SESSION_MAX_LIMIT = 2;

async function verifyLoginCredential(username: any, password: any) {
    let result: any = {};

    let userDetails = await userDb.findOneByUserName(username);
    if (userDetails == MESSAGE.NO_DATA_FOUND) {
        result = { status: 403, message: "wrong username or password" };
        throw result;
    }
    else if (userDetails == MESSAGE.DATABASE_ERROR) {
        result = { status: 500, message: "internal error" };
        throw result;
    }
    let status = bcrypt.compareSync(password, userDetails.password);
    result = { status: true, userDetails: new UserResponseDTO(userDetails) };
    if (status) {
        return result;
    }
    else {
        throw { status: 403, message: "wrong username or password" };
    }
}

export const passportConfig = (passport: any, tokenService?: any) => {

    passport.serializeUser(async (user: any, done: any) => {
        return done(null, { sessionId: user.sessionId, username: user.username });
    });

    passport.deserializeUser(async (sessionUser: any, done: any) => {
        if (!sessionUser || !sessionUser.username) {
            return done(null, false);
        }
        let redisKey = LOGIN_KEY_PREFIX + sessionUser.username + '_' + sessionUser.sessionId;
        let storedUserDetails = await redisUtility.getValueFromRedis(redisKey);
        if (storedUserDetails) {
            return done(null, storedUserDetails);
        }
        return done(null, false);
    });

    passport.use("local", new local.Strategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        async (req: any, username, password, done) => {
            try {
                let result = await verifyLoginCredential(username, password);
                const status = result.status;
                let userDetails: UserSessionDTO | string = result.userDetails;
                userDetails = new UserSessionDTO(userDetails);
                let keyPattern = LOGIN_KEY_PREFIX + userDetails.username + "_*";
                let userSessionCount = null;
                if (req.body.forcedLogin) {
                    await userSessionUtility.deleteFromAllSession(keyPattern);
                }
                else {
                    userSessionCount = await userSessionUtility.userSessionCount(keyPattern);
                }

                if (userSessionCount >= SESSION_MAX_LIMIT) {
                    throw { message: "Active session exceeding limit", status: 406 };
                }

                userDetails.setUserSessionId(req.sessionID);
                let redisKey = LOGIN_KEY_PREFIX + userDetails.username + '_' + req.sessionID;
                await redisUtility.setValueToRedis(redisKey, userDetails);
                return done(null, userDetails);
            } catch (err: any) {
                done(null, false, err);
            }
        }
    ));
}
