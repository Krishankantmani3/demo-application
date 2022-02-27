import { JwtHandler } from "../utility/jwt.handler";
import { UserDb } from "../../mongodb/query/user.db";
import { User } from '../../mongodb/model/user.model';
import { MESSAGE } from '../utility/constant/constant';
import { printErrorLog } from '../utility/logger';
import { setJwtTokenInCookies } from '../utility/cookie.service';
import passport from 'passport';
import { RedisUtility } from "../../redis/utility/redis.utility";
import { UserResponseDTO } from "../utility/dto/userResponse.dto";

export class AuthService {

    jwtHandler: JwtHandler;
    userDb: UserDb;
    redisUtility: RedisUtility;

    constructor() {
        this.jwtHandler = new JwtHandler();
        this.userDb = new UserDb();
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.logout = this.logout.bind(this);
        this.test = this.test.bind(this);
        this.redisUtility = new RedisUtility();
    }

    public async test(req: any, res: any) {
        try {
            res.status(200).json({ testing: "OK" });
        }
        catch (err) {
            printErrorLog("AuthService", "test", err);
            res.status(401).json({ message: MESSAGE.SERVER_ERROR });
        }
    }

    public async register(req: any, res: any) {
        try {
            req.user = req.body.user;

            if (req.user == undefined) {
                return res.status(301).json({ message: MESSAGE.INVALID_DATA });
            }
            let email = req.user.email;
            let username = req.user.username;
            let result = await this.userDb.findByUserNameOrEmail(username, email);

            if (result == MESSAGE.NO_DATA_FOUND) {
                let data = await this.userDb.saveNewUser(new User(req.body.user));
                if (data == MESSAGE.DATABASE_ERROR) {
                    return res.status(500).json({ message: MESSAGE.DATABASE_ERROR });
                }

                let userData = {
                    _id: data._id,
                    email: data.email,
                    username: data.email,
                    role: data.role,
                    fullname: data.fullname
                };

                setJwtTokenInCookies(req, res, userData);
                return res.status(200).json(userData);
            }
            else {
                return res.status(301).json({ message: MESSAGE.USER_ALREADY_EXIST });
            }
        }
        catch (err) {
            printErrorLog("AuthService", "register", err);
            res.status(401).json({ message: err });
        }
    }

    public async login(req: any, res: any, next: any) {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                printErrorLog("AuthService", "login", err);
                return next(err);
            }

            if (!user) {
                return res.status(info.status).json(info.message);
            }

            req.logIn(user, (err: Error) => {
                if (err) {
                    printErrorLog("AuthService", "login", err);
                    return next(err);
                }

                return res.status(200).json(new UserResponseDTO(req.user));
            });
        })(req, res, next);
    }

    public async logout(req: any, res: any, next: any) {
        try {
            let username: any = null;
            if (!req.user) {
                return res.status(200).json({ status: true });
            }
            else{
                username = req.user.username;
            }
            req.logout();
            req.session.destroy(async (err: any) => {
                if (err) {
                    return next(err);
                }
                await this.redisUtility.deleteDataByKey('login_' + username + '_' +req.sessionID);
                return res.status(200).json({ status: true });
            });
        }
        catch (err) {
            printErrorLog("AuthService", "logout", err);
            return res.status(500).json({ message: MESSAGE.SERVER_ERROR, status: false });
        }
    }

    authorized(req: any, res: any, user: any) {
        res.status(200).json({ "authorized": true });
    }
}