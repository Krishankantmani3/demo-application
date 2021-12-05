import * as fs from 'fs';
const config = require('../../config/config');

export function setAppEnvVariable() {

    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = 'development';
    }

    process.env.SSL_KEY  = fs.readFileSync('/server/cert/api.com/api.com.decrypted.key', 'utf8');
    process.env.SSL_CERT = fs.readFileSync('/server/cert/api.com/api.com.crt', 'utf8');
    envValidationForProd();

    process.env.PORT = process.env.PORT || JSON.stringify(config.PORT[process.env.NODE_ENV.toUpperCase()]);
    process.env.MONGO_URI = process.env.MONGO_URI || config.MONGO_URI[process.env.NODE_ENV.toUpperCase()];
    process.env.ACCESS_TIME = process.env.ACCESS_TIME || config.ACCESS_TIME[process.env.NODE_ENV.toUpperCase()];
    process.env.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || JSON.stringify(config.JWT_ACCESS_SECRET[process.env.NODE_ENV.toUpperCase()]);
    process.env.COOKIE_SECRET = process.env.COOKIE_SECRET || config.COOKIE_SECRET[process.env.NODE_ENV.toUpperCase()];
    process.env.ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || config.ALLOWED_ORIGIN[process.env.NODE_ENV.toUpperCase()];
    process.env.COOKIE_TIMEOUT = process.env.COOKIE_TIMEOUT || config.COOKIE_TIMEOUT[process.env.NODE_ENV.toUpperCase()];
}

function envValidationForProd() {
    if (process.env.NODE_ENV == 'production' && !(process.env.PORT && process.env.MONGO_URI && process.env.ACCESS_TIME && process.env.JWT_ACCESS_SECRET)) {
        throw new Error('any env is undefined');
    }
}


