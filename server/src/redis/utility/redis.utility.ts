'use strict'

import { printErrorLog } from "../../app/utility/logger";
import { redisClient } from "../config/redis.config";

export class RedisUtility{
    constructor(){}

    public getValueFromRedis(key: string | number){
        return new Promise((resolve, reject)=>{
            redisClient.get(key, (err: Error, result: string) => {
                if (err) {
                    printErrorLog("RedisUtility", "getValueFromRedis", err);
                    return reject(err);
                }
                
                if (result) {
                    return resolve(JSON.parse(result));
                }
                else {
                    return resolve(false);
                }
              });
        });
    }

    public setValueToRedis(key: string | number, value: any){
        return new Promise<void>((resolve, reject)=>{
            redisClient.set(key, JSON.stringify(value), (err: Error, data: any)=>{
                if(err){
                    printErrorLog("RedisUtility", "setValueToRedis", err);
                    return reject(err);
                } else{
                    resolve();
                }
            });
        });
    }

    public deleteOneKeyFromRedis(key: string | number){
        return new Promise((resolve, reject) =>{
            redisClient.del(key, (err: Error, data: any)=>{
                if(err){
                    printErrorLog("RedisUtility", "deleteKeyFromRedis", err);
                    return reject(err);
                }

                return resolve(true);
            });
        });
    }

    public getValueFromKeyPattern(key: string | number){
        return new Promise((resolve, reject)=>{
            redisClient.keys(key, (err: Error, result: string) => {
                if (err) {
                    printErrorLog("RedisUtility", "getValueFromKeyPattern", err);
                    return reject(err);
                }        
                if (result) {
                    return resolve(result);
                }
                else {
                    return resolve(false);
                }
              });
        });
    }

    public deleteManyKeysFromRedis(key: [string] | [number] ){
        return new Promise((resolve, reject) =>{
            redisClient.mdel(key, (err: Error, data: any)=>{
                if(err){
                    printErrorLog("RedisUtility", "deleteManyKeysFromRedis", err);
                    return reject(err);
                }

                return resolve(true);
            });
        });
    }
}