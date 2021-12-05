import { setAppEnvVariable } from "./app/config/env.config";
import express, { Application, Request, Response } from "express";
import { Approutes } from "./app/config/routes";
import setMongooseConfig from './mongodb/config/mongoose.config';
import http from 'http';
import https from 'https';
import { corsMiddlewareFun } from "./app/middleware/cors.middleware";
const cookieParser = require('cookie-parser'); 

class Server {
    app: Application;
    appRoutes: Approutes;
    httpServer: any;
    httpsServer: any;

    constructor() {
        setAppEnvVariable();
        this.app = express();
        // your express configuration here
        this.httpServer = http.createServer(this.app);
        const credentials = {key: process.env.SSL_KEY, cert: process.env.SSL_CERT};
        this.httpsServer = https.createServer(credentials, this.app);
        this.loadGlobalMiddleware();
        this.appRoutes = new Approutes(this.app);
    }

    public startServer() {
        this.httpServer.listen(80,()=>{
            console.log("http running on 80"); 
        });
        this.httpsServer.listen(process.env.PORT, ()=>{
            console.log("port", process.env.PORT);
        });
    }

    loadGlobalMiddleware() {
        this.app.enable('trust proxy');
        this.app.use(function(req,res,next){
            if (!req.secure) {
                return res.redirect('https://' + req.headers.host + req.url);
            }
            return next();
        });
        this.app.use(corsMiddlewareFun());
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



