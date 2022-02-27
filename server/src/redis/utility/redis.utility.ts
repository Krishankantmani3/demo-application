'use strict'
import { printErrorLog } from "../../app/utility/logger";
import { redisClient } from "../config/redis.config";

export class RedisUtility {
    constructor() { }

    public async getValueFromRedis(key: string | number) {
        try {
            let result = await redisClient.get(key);
            if (!result) {
                return false;
            }
            return JSON.parse(result);
        } catch (err) {
            printErrorLog("RedisUtility", "getValueFromRedis", err);
            throw err;
        }
    }

    public async setValueToRedis(key: string | number, value: any) {
        try {
            await redisClient.set(key, JSON.stringify(value));
        } catch (err) {
            printErrorLog("RedisUtility", "setValueToRedis", err);
            throw err;
        }
    }

    public async deleteOneKeyFromRedis(key: any) {
        try {
            await redisClient.del(key);
        } catch (err) {
            printErrorLog("RedisUtility", "getValueFromRedis", err);
            throw err;
        }
    }

    public async getValueFromKeyPattern(key: string | number) {
        try {
            let result = await redisClient.keys(key);
            if (result && result.length) {
                return result;
            }
            return false;
        } catch (err) {
            printErrorLog("RedisUtility", "getValueFromRedis", err);
            throw err;
        }
    }

    public async deleteKeysFromKeyPattern(key: string) {
        try {
            let values: any = await this.getValueFromKeyPattern(key);
            if (values && values.length) {
                return this.deleteOneKeyFromRedis(values);
            }
            else {
                return true;
            }
        } catch (err) {
            printErrorLog("RedisUtility", "deleteKeyFromRedis", err);
            throw err;
        }
    }

    public async getValuesForMultipleKey(key: any) {
        try {
            let result = await redisClient.mget(key);
            if (result && result.length) {
                result = result.map((obj: any) => JSON.parse(obj));
                return result;
            }
            else {
                return false;
            }
        } catch (err) {
            printErrorLog("RedisUtility", "getValueFromRedis", err);
            throw err;
        }
    }

    public async setExpiryRedis(key: any, seconds: number) {
        try {
            let result = await redisClient.get(key);
            await redisClient.set(key, result, 'ex', seconds);
        } catch (err) {
            printErrorLog("RedisUtility", "setExpiryRedis", err);
            throw err;
        }
    }

    public async setDataAndExpiry(key: any, data: any, seconds: number) {
        try {
            await redisClient.set(key, JSON.stringify(data), 'ex', seconds);
        } catch (err) {
            printErrorLog("RedisUtility", "setDataAndExpiry", err);
            throw err;
        }
    }


}