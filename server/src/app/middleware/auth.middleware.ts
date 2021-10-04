import { JwtHandler } from "../config/jwt.handler";
import { ROLE } from "../constant/user.role";

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
        this.roleAuth = this.roleAuth.bind(this);
    }


    public auth(req: any, res: any, next: any, role: number){
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
        this.auth(req, res, next, ROLE.ADMIN);
    }

    public architectAuth(req: any, res: any, next: any){
        this.auth(req, res, next, ROLE.ARCHITECT);
    }

    public builderAuth(req: any, res: any, next: any){
        this.auth(req, res, next, ROLE.BUILDER);
    }

    public roleAuth(req: any, res: any, next: any){

        console.log(req.params);
        
        let role = req.params.role;

        if(role == 1){
            this.adminAuth(req, res, next);
        }
        else if(role == 3){
            // this.auth(req, res, next, ROLE.ARCHITECT);
            this.architectAuth(req, res, next);
        }
        else if(role == 2){
            this.builderAuth(req, res, next);
        }
    }
}

