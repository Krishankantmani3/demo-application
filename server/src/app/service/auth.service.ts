import * as bcrypt from 'bcrypt';
import { JwtHandler } from "../utility/jwt.handler";
import { UserDb } from "../../mongodb/query/user.db";
import { User } from '../../mongodb/model/user.model';
import { MESSAGE } from '../utility/constant/constant';
import { printErrorLog } from '../utility/logger';
import { setJwtTokenInCookies } from '../utility/cookie.service';

export class AuthService {

    jwtHandler: JwtHandler;
    userDb: UserDb;

    constructor() {
        this.jwtHandler = new JwtHandler();
        this.userDb = new UserDb();
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.logout = this.logout.bind(this);
        this.test = this.test.bind(this);
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

    public async login(req: any, res: any) {
        try {
            req = req.body;
            let username = req.user.username;
            let password = req.user.password;
            let userDetails = await this.userDb.findOneByUserName(username);

            if (userDetails == MESSAGE.NO_DATA_FOUND) {
                return res.status(303).json({ message: MESSAGE.INCORRECT_EMAIL_OR_PASSWORD });
            }
            else if (userDetails == MESSAGE.DATABASE_ERROR) {
                return res.status(500).json({ message: MESSAGE.SERVER_ERROR });
            }
            let status = bcrypt.compareSync(password, userDetails.password);
            if (status) {
                let userData = {
                    _id: userDetails._id,
                    email: userDetails.email,
                    username: userDetails.email,
                    role: userDetails.role,
                    fullname: userDetails.fullname
                };
                setJwtTokenInCookies(req, res, userData);
                return res.status(200).json(userData);
            }
            else {
                return res.status(303).json({ message: MESSAGE.INCORRECT_EMAIL_OR_PASSWORD });
            }
        }
        catch (err) {
            printErrorLog("AuthService", "login", err);
            res.status(500).json({ message: MESSAGE.SERVER_ERROR });
        }
    }


    public async logout(req: any, res: any) {
        try {
            let options = {
                maxAge: 0, // would expire after 15 minutes
                httpOnly: true, // The cookie only accessible by the web server
                signed: true,
                sameSite: 'None',
                secure: true
            }
            res.clearCookie('jwt_token', options);
            res.status(200).json({ status: true });
        }
        catch (err) {
            printErrorLog("AuthService", "logout", err);
            res.status(500).json({ message: MESSAGE.SERVER_ERROR, status: false });
        }
    }

    authorized(req: any, res: any, user: any) {
        res.status(200).json({ "authorized": true });
    }
}