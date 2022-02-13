import session from "express-session";
import { redisClient } from "../../redis/config/redis.config";
var RedisStore = require('connect-redis')(session);

export const sessionOption = {
    name: 'session_cookie',
    store: new RedisStore({ client: redisClient }),
    secret: "xyz",
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