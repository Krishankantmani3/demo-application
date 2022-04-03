import { config } from "../../config/config";
import { printErrorLog } from "../utility/logger";

function setAppEnvVariable() {

    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = 'development';
    }

    process.env.PORT = process.env.PORT || JSON.stringify(config.PORT);
    process.env.MONGO_URI = process.env.MONGO_URI || config.MONGO_URI;
    process.env.ACCESS_TIME = process.env.ACCESS_TIME || config.ACCESS_TIME;
    process.env.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || config.JWT_ACCESS_SECRET;
    process.env.COOKIE_SECRET = process.env.COOKIE_SECRET || config.COOKIE_SECRET;
    process.env.ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || config.ALLOWED_ORIGIN;
    process.env.COOKIE_TIMEOUT_SEC = process.env.COOKIE_TIMEOUT__SEC || JSON.stringify(config.COOKIE_TIMEOUT_SEC);
    process.env.REDIS_URI = process.env.REDIS_URI || JSON.stringify(config.REDIS_URI);
    process.env.SESSION_MAX_LIMIT = process.env.SESSION_MAX_LIMIT || JSON.stringify(config.SESSION_MAX_LIMIT);
    process.env.NODEMAILER_INFO = process.env.NODEMAILER_INFO || JSON.stringify(config.NODEMAILER_INFO);
}

setAppEnvVariable();

export function envValidationForProd() {
    if (process.env.NODE_ENV == 'production') {
        requiredEnv(process.env.PORT);
        requiredEnv(process.env.MONGO_URI);
        requiredEnv(process.env.ACCESS_TIME);
        requiredEnv(process.env.JWT_ACCESS_SECRET);
        requiredEnv(process.env.COOKIE_SECRET);
        requiredEnv(process.env.ALLOWED_ORIGIN);
        requiredEnv(process.env.COOKIE_TIMEOUT_SEC);
        requiredEnv(process.env.REDIS_URI);
        requiredEnv(process.env.SESSION_MAX_LIMIT);
    }
}

function requiredEnv(env: any){
    if (!env) {
        printErrorLog('env.config.ts', 'requiredEnv', `[error]: The "${env}" environment variable is required`)
        process.exit(1)
    }
}

