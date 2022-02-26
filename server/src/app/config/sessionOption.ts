import session from "express-session";
import { redisClient } from "../../redis/config/redis.config";
var RedisStore = require('connect-redis')(session);

const COOKIE_SECRET = process.env.COOKIE_SECRET
if (!COOKIE_SECRET) {
    console.error('[error]: The "API_KEY" environment variable is required')
    process.exit(1)
}

export const sessionOption = {
    name: 'session_cookie',
    store: new RedisStore({ client: redisClient }),
    secret: COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 10,
        httpOnly: false,
        secure: false,
        path: "/",
        sameSite: true 
    }
};