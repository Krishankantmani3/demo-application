import { RedisUtility } from "../../redis/utility/redis.utility";
import * as local from "passport-local";
import { MESSAGE } from "../utility/constant/constant";
import * as bcrypt from 'bcrypt';
import { UserDb } from "../../mongodb/query/user.db";
import { UserResponseDTO } from "../utility/dto/userResponse.dto";
import { UserSessionDTO } from "../utility/dto/userSession.dto";

const redisUtility = new RedisUtility();
const userDb = new UserDb();
const LOGIN_KEY_PREFIX = 'login_';

async function verifyLoginCredential(username: any, password: any) {
    let result: any = {};

    let userDetails = await userDb.findOneByUserName(username);
    if (userDetails == MESSAGE.NO_DATA_FOUND) {
        result = { status: false, userDetails: MESSAGE.NO_DATA_FOUND };
        return result;
    }
    else if (userDetails == MESSAGE.DATABASE_ERROR) {
        result = { status: false, userDetails: MESSAGE.SERVER_ERROR };
        return result;
    }
    let status = bcrypt.compareSync(password, userDetails.password);
    result = { status, userDetails: new UserResponseDTO(userDetails) };
    return result;
}

export const passportConfig = (passport: any, tokenService?: any) => {

    passport.serializeUser(async (user: any, done: any) => {
        return done(null, { sessionId: user.sessionId, username: user.username });
    });

    passport.deserializeUser(async (sessionUser: any, done: any) => {
        if (!sessionUser || !sessionUser.username) {
            return done(null, false);
        }
        let redisKey = LOGIN_KEY_PREFIX + sessionUser.sessionId;
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
            let result = await verifyLoginCredential(username, password);
            const status = result.status;
            let userDetails: UserSessionDTO | string = result.userDetails;

            if (result.status && req.sessionID) {
                userDetails = new UserSessionDTO(userDetails);
                userDetails.setUserSessionId(req.sessionID);
                let redisKey = LOGIN_KEY_PREFIX + req.sessionID;
                await redisUtility.setValueToRedis(redisKey, userDetails);
                return done(null, userDetails);
            }
            else {
                return done(null, false);
            }
        }
    ));
}
