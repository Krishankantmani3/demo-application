import { JwtHandler } from "../utility/jwt.handler";
import { USER_ROLE } from "../utility/constant/constant";
import { MESSAGE } from "../utility/constant/constant";
import { printErrorLog } from "../utility/logger";

export class AuthMiddleWare{

    jwtHandler: JwtHandler;
    constructor(){
        this.jwtHandler = new JwtHandler();
        this.adminAuth = this.adminAuth.bind(this);
        this.architectAuth = this.architectAuth.bind(this);
        this.builderAuth = this.builderAuth.bind(this);
        this.auth = this.auth.bind(this);
    }

    public roleAuth(req: any, res: any, next: any, role: number){
        try{
            let token = req.signedCookies.jwt_token;
            let userData: any = this.jwtHandler.verifyToken(token);
            console.log(token);
            
            if(userData == MESSAGE.INVALID_TOKEN || userData.role != role){
               return  res.status(403).json({status: MESSAGE.ACCESS_DENIED});
            }
            req.user = userData;
            return next();
        }
        catch(err){
            printErrorLog("AuthService","auth", err);
            res.status(403).json({status: MESSAGE.SERVER_ERROR});
        }
    }

    public adminAuth(req: any, res: any, next: any){
        this.roleAuth(req, res, next, USER_ROLE.ADMIN);
    }

    public architectAuth(req: any, res: any, next: any){
        this.roleAuth(req, res, next, USER_ROLE.ARCHITECT);
    }

    public builderAuth(req: any, res: any, next: any){
        this.roleAuth(req, res, next, USER_ROLE.BUILDER);
    }

    public auth(req: any, res: any){
        try{
            let token = req.signedCookies.jwt_token;
            let userData: any = this.jwtHandler.verifyToken(token);
            if(userData == MESSAGE.INVALID_TOKEN){
                return res.status(403).json({ message: MESSAGE.INVALID_TOKEN });
            }
            
            return res.status(200).json(userData);
        }
        catch(err){
            printErrorLog("AuthService","auth", err);
            res.status(503).json({status: MESSAGE.SERVER_ERROR});
        }
    }
}

