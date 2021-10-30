import express, { Application, Request, Response } from "express";
import { Approutes } from "./app/config/routes";
import setMongooseConfig from './db/config/mongoose.config';
import cors from 'cors';
import * as fs from 'fs';
import http from 'http';
import https from 'https';

// var fs = require('fs');
// var http = require('http');
// var https = require('https');

var privateKey  = fs.readFileSync('/project/cert/api.com/api.com.decrypted.key', 'utf8');
var certificate = fs.readFileSync('/project/cert/api.com/api.com.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

const cookieParser = require('cookie-parser');
const config = require('./app/config/config.json');

const PORT = 9000;

var corsOptions = {
    origin: 'http://172.17.0.2:4200',
    credentials: true
};

class Server {
    app: Application;
    appRoutes: Approutes;
    httpServer: any;
    httpsServer: any;

    constructor() {
        this.app = express();
        // your express configuration here
        this.httpServer = http.createServer(this.app);
        this.httpsServer = https.createServer(credentials, this.app);
        this.loadGlobalMiddleware();
        this.appRoutes = new Approutes(this.app);
    }

    public startServer() {
        this.appRoutes.initializeAllRouting();
        // this.app.listen(PORT, () => {
        //     console.log("listening at port 9000");
        // });

        this.httpServer.listen(80,()=>{
            console.log("http running on 80"); 
        });
        
        this.httpsServer.listen(443, ()=>{
            console.log("https running on 443");
        });
    }

    loadGlobalMiddleware() {
        this.app.enable('trust proxy');
        this.app.use(function(req,res,next){
            console.log("hello", req.url);
            
            if (!req.secure) {
                return res.redirect('https://' + req.headers.host + req.url);
            }

            return next();
        });
        this.app.use(cors(corsOptions));
        this.app.use(cookieParser("YOUR_SECRET"));
        this.app.use(express.json());
    }
}

let server: Server = new Server();
setMongooseConfig();
server.startServer();



