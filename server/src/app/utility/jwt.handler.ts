import jwt from 'jsonwebtoken';
import { MESSAGE } from './constant/constant';
import { printErrorLog } from './logger';


export class JwtHandler{

    constructor(){
        // if(process.env.JWT_ACCESS_SECRET == undefined){
        //     throw new Error('JWT_ACCESS_SECRET is not set');
        // }
    }

    public generateToken(payload:any, options?:any){
        try{
            if(process.env.JWT_ACCESS_SECRET == undefined){
                throw new Error('JWT_ACCESS_SECRET is not set');
            }
            // console.log(process.env.ACCESS_TIME);
            if(!options){
                options = {
                    expiresIn: process.env.ACCESS_TIME
                };
            }
            let token =  jwt.sign(payload, process.env.JWT_ACCESS_SECRET, options );
            return token;
        }
        catch(err){
            printErrorLog("jwtHandler", "genrateToken", err);
            return MESSAGE.SERVER_ERROR;
        }
    }

    public verifyToken(token:any){
        if(process.env.JWT_ACCESS_SECRET == undefined){
            throw new Error('JWT_ACCESS_SECRET is not set');
        }
        try{
            let decoded_data = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return decoded_data;
        }
        catch(err){
            // printErrorLog("JwtHandler", "verifyToken", err);
            return MESSAGE.INVALID_TOKEN;
        }
    }
}



