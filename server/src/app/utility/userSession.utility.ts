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

    async deleteFromAllSession(key: any){
        try {
            let users: any = await this.redisUtility.getValueFromRedis(key);
            await this.redisUtility.deleteManyKeysFromRedis(users);
        } catch (err) {
            throw err;
        }
    }
}