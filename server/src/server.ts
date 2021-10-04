import express, { Application, Request, Response } from "express";
import { Approutes } from "./app/config/routes";
import setMongooseConfig from './db/config/mongoose.config';
import cors from 'cors';

const cookieParser = require('cookie-parser');
const config = require('./app/config/config.json');

const PORT = 9000;

var corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true
};

class Server {
    app: Application;
    appRoutes: Approutes;
    constructor() {
        this.app = express();
        this.loadGlobalMiddleware(this.app);
        this.appRoutes = new Approutes(this.app);
    }

    public startServer() {
        this.appRoutes.initializeAllRouting();
        this.app.listen(PORT, () => {
            console.log("listening at port 9000");
        });
    }

    loadGlobalMiddleware(app: Application) {
        app.use(cors(corsOptions));
        app.use(cookieParser("YOUR_SECRET"));
        app.use(express.json());
    }
}

let server: Server = new Server();
setMongooseConfig();
server.startServer();



