import { UserDao } from "../../mongodb/dao/user.dao";
import { User } from '../../mongodb/model/user.model';
import { MESSAGE, USER_ROLE } from '../utility/constant/constant';
import { printErrorLog } from '../utility/logger';
import passport from 'passport';
import { RedisUtility } from "../../redis/utility/redis.utility";
import { UserResponseDTO } from "../utility/dto/userResponse.dto";

export class AuthService {

    userDb: UserDao;
    redisUtility: RedisUtility;

    constructor() {
        this.userDb = new UserDao();
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

    public async register(req: any, res: any, next: any) {
        try {
            let user = req.body.user;

            if (user == undefined) {
                return res.status(400).json({ message: MESSAGE.INVALID_DATA });
            }
            let email = user.email;
            let username = user.username;
            let result = await this.userDb.findByUserNameOrEmail(username, email);

            if (!result) {
                let userData: any = {
                    email: user.email,
                    username: user.username,
                    role: [USER_ROLE.STUDENT],
                    fullname: user.fullname,
                    password: user.password
                };

                let data = await this.userDb.saveNewUser(new User(userData));
                return res.status(200).json(new UserResponseDTO(data));
            }
            else {
                return res.status(301).json({ message: MESSAGE.USER_ALREADY_EXIST });
            }
        }
        catch (err) {
            printErrorLog("AuthService", "register", err);
            next(err);
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
}