import jwt from 'jsonwebtoken';
import { MESSAGE } from './constant/constant';
import { printErrorLog } from './logger';


export class JwtHandler{

    public generateToken(payload:any, options?:any){
        try{
            // console.log(process.env.ACCESS_TIME);
            if(!options){
                options = {
                    expiresIn: process.env.ACCESS_TIME
                };
            }
            let token =  jwt.sign(payload, 'process.env.JWT_ACCESS_SECRET', options );
            return token;
        }
        catch(err){
            printErrorLog("jwtHandler", "genrateToken", err);
            return MESSAGE.SERVER_ERROR;
        }
    }

    public verifyToken(token:any){
        try{
            let decoded_data = jwt.verify(token, "process.env.JWT_ACCESS_SECRET");
            return decoded_data;
        }
        catch(err){
            // printErrorLog("JwtHandler", "verifyToken", err);
            return MESSAGE.INVALID_TOKEN;
        }
    }
}



