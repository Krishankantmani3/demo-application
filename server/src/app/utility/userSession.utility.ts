import { RedisUtility } from "../../redis/utility/redis.utility";

export class UserSessionUtility {
    redisUtility: RedisUtility;

    constructor(){
        this.redisUtility = new RedisUtility();
    }

    async setUserDataToRedisStore(key: any, data: any){
        try {
            await this.redisUtility.setValueToRedis(key, data);   
        } catch (err) {
            throw err;
        }
    }

    async userSessionCount(key: any){
        try {
            let users: any = await this.redisUtility.getValueFromKeyPattern(key);
            return users.length;
        } catch (err) {
            throw err;
        }
    }

    async deleteLeastRecentlyData(){
        try {
            
        } catch (err) {
            
        }
    }

    async deleteFromAllSession(key: any) {
        try {
            let sessionKeys: any = await this.redisUtility.getValueFromKeyPattern(key);
            let sessions: any = await this.redisUtility.getValuesForMultipleKey(sessionKeys);
            sessions = sessions.map((obj: any) => "sess:" + obj.sessionId );
            let fun1 = this.redisUtility.deleteOneKeyFromRedis(sessions);
            let fun2 = this.redisUtility.deleteKeysFromKeyPattern(key);
            return Promise.all([fun1, fun2]);
        } catch (err) {
            throw err;
        }
    }
}