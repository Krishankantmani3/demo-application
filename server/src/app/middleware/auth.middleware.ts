import { JwtHandler } from "../config/jwt.handler";
import { USER_ROLE } from "../constant/user.role";

const error = {
    SERVER_ERROR: "SERVER_ERROR",
    INVALID_TOKEN: "INVALID_TOKEN",
    ACCESS_DENIED: "ACCESS_DENIED"
};

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
            
            if(userData == error.INVALID_TOKEN || userData.role != role){
               return  res.status(403).json({status: error.ACCESS_DENIED});
            }
            req.user = userData;
            return next();
        }
        catch(err){
            console.error("AuthService.auth", err);
            res.status(403).json({status: error.SERVER_ERROR});
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
            if(userData == error.INVALID_TOKEN){
                return res.status(403).json({ message: error.INVALID_TOKEN });
            }
            
            return res.status(200).json(userData);
        }
        catch(err){
            console.error("AuthService.auth", err);
            res.status(503).json({status: error.SERVER_ERROR});
        }
    }
}

