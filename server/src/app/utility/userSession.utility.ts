import { RedisUtility } from "../../redis/utility/redis.utility";
import { printErrorLog } from "./logger";

export class UserSessionUtility {
    redisUtility: RedisUtility;

    constructor(){
        this.redisUtility = new RedisUtility();
    }

    async setUserDataToRedisStore(key: any, data: any){
        try {
            await this.redisUtility.setDataByKey(key, data);
        } catch (err) {
            printErrorLog("UserSessionUtility", "setUserDataToRedisStore", err);
            throw err;
        }
    }

    async userSessionCount(key: any){
        try {
            let users: any = await this.redisUtility.getDataByKeyPattern(key);
            if(users && users.length){
                return users.length;
            }
            else{
                return 0;
            }
        } catch (err) {
            printErrorLog("UserSessionUtility", "userSessionCount", err);
            throw err;
        }
    }

    async deleteLeastRecentlyData(){
        try {
            
        } catch (err) {
            printErrorLog("UserSessionUtility", "deleteLeastRecentlyData", err);
            throw err;
        }
    }

    async deleteFromAllSession(key: any) {
        try {
            let sessionKeys: any = await this.redisUtility.getDataByKeyPattern(key);
            let sessions: any = await this.redisUtility.getMultiDataByMultiKey(sessionKeys);
            sessions = sessions.map((obj: any) => "sess:" + obj.sessionId );
            let fun1 = this.redisUtility.deleteDataByKey(sessions);
            let fun2 = this.redisUtility.deleteDataByKeyPattern(key);
            return Promise.all([fun1, fun2]);
        } catch (err) {
            printErrorLog("UserSessionUtility", "deleteFromAllSession", err);
            throw err;
        }
    }

    async resetUserSessionExpiry(key: any, seconds: number){
        try {
            this.redisUtility.setExpiry(key, seconds);
        } catch (err) {
            printErrorLog("UserSessionUtility", "resetUserSessionExpiry", err);
            throw err;
        }
    }
}