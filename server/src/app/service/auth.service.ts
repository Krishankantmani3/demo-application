import * as bcrypt from 'bcrypt';
import { JwtHandler } from "../config/jwt.handler";
import { UserDb } from "../../db/query/user.db";
import { User } from '../../db/model/user.model';

const MESSAGE = {
    SERVER_ERROR: "SERVER_ERROR",
    DATABASE_ERROR: "DATABASE_ERROR",
    INCORRECT_EMAIL_OR_PASSWORD: "INCORRECT_EMAIL_OR_PASSWORD",
    NO_DATA_FOUND: "NO_DATA_FOUND",
    USER_ALREADY_EXIST: "USER_ALREADY_EXIST"
};


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
            console.error("log ---- /api/test/");
            res.status(200).json({ testing: "OK" });
        }
        catch (err) {
            console.error("AuthService.test", err);
            res.status(401).json({ error: MESSAGE.SERVER_ERROR });
        }
    }


    public async register(req: any, res: any) {
        try {
            req.user = req.body.user;
            console.log(req.body);

            if (req.user == undefined) {
                return res.status(301).json({ "error": "empty data" });
            }
            let email = req.user.email;
            let username = req.user.username;
            let result = await this.userDb.findByUserNameOrEmail(username, email);

            if (result == MESSAGE.NO_DATA_FOUND) {
                let data = await this.userDb.saveNewUser(new User(req.body.user));
                if (data == MESSAGE.DATABASE_ERROR) {
                    return res.status(500).json({ "error": MESSAGE.DATABASE_ERROR });
                }

                let userData = {
                    _id: data._id,
                    email: data.email,
                    username: data.email,
                    role: data.role,
                    fullname: data.fullname
                };

                this.setJwtTokenInCookies(req, res, userData);
                return res.status(200).json(userData);
            }
            else {
                return res.status(301).json({ "error": MESSAGE.USER_ALREADY_EXIST });
            }
        }
        catch (err) {
            console.log("AuthService.register", err);
            res.status(401).json({ "error": err });
        }
    }

    public async login(req: any, res: any) {
        try {
            req = req.body;

            let username = req.user.username;
            let password = req.user.password;

            let userDetails = await this.userDb.findOneByUserName(username);

            if (userDetails == MESSAGE.NO_DATA_FOUND) {
                return res.status(303).json({ "error": MESSAGE.INCORRECT_EMAIL_OR_PASSWORD });
            }
            else if (userDetails == MESSAGE.DATABASE_ERROR) {
                return res.status(500).json({ error: MESSAGE.SERVER_ERROR });
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

                this.setJwtTokenInCookies(req, res, userData);
                console.log("userDAta in server side auth", userData);
                return res.status(200).json(userData);
            }
            else {
                return res.status(303).json({ "error": MESSAGE.INCORRECT_EMAIL_OR_PASSWORD });
            }
        }
        catch (err) {
            console.log("AuthService.login", err);
            res.status(500).json({ "error": MESSAGE.SERVER_ERROR });
        }
    }


    public async logout(req: any, res: any) {
        try {
            console.log("token req.signedCookies.jwt_token", req.signedCookies.jwt_token);
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
            console.error("AuthService.logout", err);
            res.status(500).json({ error: MESSAGE.SERVER_ERROR, status: false });
        }
    }

    setJwtTokenInCookies(req: any, res: any, user: any) {
        try {
            let payload = {
                _id: user._id,
                username: user.username,
                role: user.role
            };

            let token = this.jwtHandler.generateToken(payload);
            if (token == MESSAGE.SERVER_ERROR) {
                res.status(500).json({ "error": MESSAGE.SERVER_ERROR });
            }
            else {
                let options = {
                    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
                    httpOnly: true, // The cookie only accessible by the web server
                    signed: true,
                    sameSite: 'None',
                    secure: true
                }

                // res.header('Access-Control-Allow-Origin', req.headers.origin);
                // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.cookie("jwt_token", token, options);
            }
        }
        catch (err) {
            throw new Error('Invalid_token');
        }
    }

    authorized(req: any, res: any, user: any) {
        res.status(200).json({ "authorized": true });
    }




}