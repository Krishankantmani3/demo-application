import { envValidationForProd } from "./app/config/env.config";
import express, { Application, Request, Response } from "express";
import { Approutes } from "./app/config/routes";
import setMongooseConfig from './mongodb/config/mongoose.config';
import http from 'http';
const cookieParser = require('cookie-parser');

envValidationForProd();
setMongooseConfig();

var app = express();
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
const appRoutes = new Approutes(app);
const httpServer = http.createServer(app);

httpServer.listen(process.env.PORT,()=>{
    console.log("http running on " + process.env.PORT);
});

