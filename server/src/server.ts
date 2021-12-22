import { envValidationForProd } from "./app/config/env.config";
import express, { Application, Request, Response } from "express";
import { Approutes } from "./app/config/routes";
import setMongooseConfig from './mongodb/config/mongoose.config';
import http from 'http';
import { RedisUtility } from "./redis/utility/redis.utility";
const cookieParser = require('cookie-parser');

class Server {
    app: Application;
    appRoutes: Approutes;
    httpServer: any;
    httpsServer: any;
    redisUitility: RedisUtility;

    constructor() {
        envValidationForProd();
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.loadGlobalMiddleware();
        this.appRoutes = new Approutes(this.app);
        this.redisUitility = new RedisUtility();
    }

    public startServer() {
        this.httpServer.listen(process.env.PORT,()=>{
            console.log("http running on " + process.env.PORT); 
        });
    }

    loadGlobalMiddleware() {
        this.app.use(cookieParser(process.env.COOKIE_SECRET));
        this.app.use(express.json());
        this.app.use('/', (req, res, next)=>{
            console.log("req --> ", req.url);
            next();
        });
    }
}

let server: Server = new Server();
setMongooseConfig();
server.startServer();



