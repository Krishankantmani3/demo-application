import mongoose from 'mongoose';
import { printConsoleLog, printErrorLog } from '../../app/utility/logger';
let config = require('../../config/config');

export default function setMongooseConfig() {

    if (process.env.MONGO_URI == undefined) {
        throw new Error(`No MongoDB connection URI specified.`);
    }

    const db = mongoose.connection;
    db.on('error', (err) => {
        printErrorLog("mongoose.config.ts", "onError", err);
    });

    // db.once('open', ()=>{
    //     printConsoleLog("mongoose.config.ts", "onceOpen", "");
    // });

    db.on('connected', () => {
        // printConsoleLog("mongoose.config.ts", "onConnected", "");

        db.on('disconnected', (err) => {
            printErrorLog("mongoose.config.ts", "onDisconnected", err);
        });
    });

    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
            printErrorLog("mongoose.config.ts", "onConnect", err);
        }
        else {
            printConsoleLog("mongoose.config.ts", "onConnect", `connected successfully at ${process.env.MONGO_URI}`);
        }
    });
}
