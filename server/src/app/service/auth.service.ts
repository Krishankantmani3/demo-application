import * as bcrypt from 'bcrypt';
import { JwtHandler } from "../config/jwt.handler";
import { UserDB } from "../../db/query/user.db";
import { User } from '../../db/model/user.model';

const error = {
    SERVER_ERROR: "SERVER_ERROR",
    DATABASE_ERROR: "DATABASE_ERROR",
    INCORRECT_EMAIL_OR_PASSWORD: "INCORRECT_EMAIL_OR_PASSWORD",
    NO_DATA_FOUND: "NO_DATA_FOUND",
    USER_ALREADY_EXIST: "USER_ALREADY_EXIST"
};


export class AuthService {

    jwtHandler: JwtHandler;
    userDB: UserDB;

    constructor() {
        this.jwtHandler = new JwtHandler();
        this.userDB = new UserDB();
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
            res.status(401).json({ error: error.SERVER_ERROR });
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
            let result = await this.userDB.findByUserNameOrEmail(username, email);

            if (result == error.NO_DATA_FOUND) {
                let data = await this.userDB.saveNewUser(new User(req.body.user));
                if (data == error.DATABASE_ERROR) {
                    return res.status(500).json({ "error": error.DATABASE_ERROR });
                }

                this.setJwtTokenInCookies(req, res, data);
                return res.status(200).json({ status: "loggedIn" });
            }
            else {
                return res.status(301).json({ "error": error.USER_ALREADY_EXIST });
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
            console.log(req);

            let username = req.user.username;
            let password = req.user.password;

            let user = await this.userDB.findOneByUserName(username);

            if (user == error.NO_DATA_FOUND) {
                return res.status(303).json({ "error": error.INCORRECT_EMAIL_OR_PASSWORD });
            }
            else if (user == error.DATABASE_ERROR) {
                return res.status(500).json({ error: error.SERVER_ERROR });
            }

            let status = bcrypt.compareSync(password, user.password);

            if (status) {
                this.setJwtTokenInCookies(req, res, user);
                return res.status(204).json({});
            }
            else {
                return res.status(303).json({ "error": error.INCORRECT_EMAIL_OR_PASSWORD });
            }
        }
        catch (err) {
            console.log("AuthService.login", err);
            res.status(500).json({ "error": error.SERVER_ERROR });
        }
    }


    public async logout(req: any, res: any) {
        try {
            res.clearCookie('jwt_token');
            res.status(200).json({ status: true });
        }
        catch (err) {
            console.error("AuthService.logout", err);
            res.status(401).json({ error: error.SERVER_ERROR });
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
            if (token == error.SERVER_ERROR) {
                res.status(500).json({ "error": error.SERVER_ERROR });
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

    authorized(req: any, res: any, user: any){
        res.status(200).json({ "authorized" : true });
    }




}