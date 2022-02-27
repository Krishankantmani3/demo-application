import { USER_ROLE } from "../utility/constant/constant";
import { MESSAGE } from "../utility/constant/constant";
import { printErrorLog } from "../utility/logger";
import { RedisUtility } from "../../redis/utility/redis.utility";
import { UserResponseDTO } from "../utility/dto/userResponse.dto";

export class AuthMiddleWare {

    redisUtility: RedisUtility;

    constructor() {
        this.redisUtility = new RedisUtility();
        this.adminAuth = this.adminAuth.bind(this);
        this.architectAuth = this.architectAuth.bind(this);
        this.builderAuth = this.builderAuth.bind(this);
        this.auth = this.auth.bind(this);
    }

    private async roleAuth(req: any, res: any, next: any, role: number) {
        try {
            if (req.isAuthenticated() && req.user) {
                if (req.user.role.findIndex((ele: number) => ele == role) >= 0) {
                    return next();
                }
                else {
                    return res.status(403).json({ status: MESSAGE.ACCESS_DENIED });
                }
            }
            else {
                return res.status(403).json({ message: MESSAGE.INVALID_TOKEN });
            }
        }
        catch (err) {
            printErrorLog("AuthService", "roleAuth", err);
            res.status(403).json({ status: MESSAGE.SERVER_ERROR });
        }
    }

    public async adminAuth(req: any, res: any, next: any) {
        return await this.roleAuth(req, res, next, USER_ROLE.ADMIN);
    }

    public async architectAuth(req: any, res: any, next: any) {
        return await this.roleAuth(req, res, next, USER_ROLE.ARCHITECT);
    }

    public async builderAuth(req: any, res: any, next: any) {
        return await this.roleAuth(req, res, next, USER_ROLE.BUILDER);
    }

    public async auth(req: any, res: any) {
        try {
            console.log("req.user", req.user);
            if (req.isAuthenticated() && req.user) {
                console.log("reached at ", new UserResponseDTO(req.user));
                return res.status(200).json(new UserResponseDTO(req.user));
            }
            else {
                return res.status(403).json({ message: MESSAGE.INVALID_TOKEN });
            }
        }
        catch (err) {
            printErrorLog("AuthService", "auth", err);
            res.status(503).json({ status: MESSAGE.SERVER_ERROR });
        }
    }
}

