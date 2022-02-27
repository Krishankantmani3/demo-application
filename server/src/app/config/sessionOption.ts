import session from "express-session";
import { redisClient } from "../../redis/config/redis.config";
var RedisStore = require('connect-redis')(session);

if (!process.env.COOKIE_SECRET) {
    console.error('[error]: The "COOKIE_SECRET" environment variable is required')
    process.exit(1)
}

if (!process.env.COOKIE_TIMEOUT_SEC) {
    console.error('[error]: The "COOKIE_TIMEOUT" environment variable is required')
    process.exit(1)
}

const COOKIE_SECRET = process.env.COOKIE_SECRET;
const COOKIE_TIMEOUT_SEC = parseInt(process.env.COOKIE_TIMEOUT_SEC);

export const sessionOption = {
    name: 'session_cookie',
    store: new RedisStore({ client: redisClient }),
    secret: COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    rolling: true,
    cookie: {
        maxAge: COOKIE_TIMEOUT_SEC*1000,
        httpOnly: false,
        secure: false,
        path: "/",
        sameSite: true 
    }
};