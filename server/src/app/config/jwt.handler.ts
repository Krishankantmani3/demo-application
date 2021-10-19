import jwt from 'jsonwebtoken';

const error = {
    SERVER_ERROR: "SERVER_ERROR",
    INVALID_TOKEN: "INVALID_TOKEN"
};

export class JwtHandler{

    public generateToken(payload:any, options?:any){
        try{
            console.log(process.env.ACCESS_TIME);
            if(!options){
                options = { 
                    expiresIn: process.env.ACCESS_TIME
                };   
            }
            let token =  jwt.sign(payload, 'process.env.JWT_ACCESS_SECRET', options );
            return token;
        }
        catch(err){
            console.error("jwtHandler.genrateToken", err);
            return error.SERVER_ERROR;
        }
    }

    public verifyToken(token:any){
        try{
            let userData = jwt.verify(token, "process.env.JWT_ACCESS_SECRET");
            return userData;
        }
        catch(err){
            // console.error("JwtHandler.verifyToken",err);
            return error.INVALID_TOKEN;
        }
    }
}



