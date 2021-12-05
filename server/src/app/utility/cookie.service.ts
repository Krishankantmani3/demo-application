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
                maxAge: process.env.COOKIE_TIMEOUT, // would expire after 24 hrs.
                httpOnly: true, // The cookie only accessible by the web server
                signed: true,
                sameSite: 'None',
                secure: true
            }
            res.cookie("jwt_token", token, options);
        }
    }
    catch (err) {
        throw new Error('Invalid_token');
    }
}