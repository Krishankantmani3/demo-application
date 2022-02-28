import { MESSAGE } from "./constant/constant";
import { JwtHandler } from "./jwt.handler";

export function setJwtTokenInCookies(req: any, res: any, user: any) {
    const jwtHandler = new JwtHandler();
    try {
        let payload = {
            _id: user._id,
            username: user.username,
            role: user.role
        };

        let token = jwtHandler.generateToken(payload);
        if (token == MESSAGE.SERVER_ERROR) {
            return res.status(500).json({ "error": MESSAGE.SERVER_ERROR });
        }
        else {
            let options = {
                maxAge: process.env.COOKIE_TIMEOUT_SEC,
                httpOnly: true,
                signed: true,
                sameSite: 'Strict',
                secure: true
            }
            res.cookie("jwt_token", token, options);
        }
    }
    catch (err) {
        throw err;
    }
}