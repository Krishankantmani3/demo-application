"use strict";
const nodemailer = require("nodemailer");
import { config } from "../../config/config";

export class NodeMailerService{
    transporter: any;
    NODEMAILER_INFO: any;

    constructor(){
        process.env.NODEMAILER_INFO = process.env.NODEMAILER_INFO || JSON.stringify(config.NODEMAILER_INFO);
        this.NODEMAILER_INFO = JSON.parse(process.env.NODEMAILER_INFO);
        this.initializeTransporter();
    }

    initializeTransporter(){
        this.transporter = nodemailer.createTransport({
            service: this.NODEMAILER_INFO.service,
            auth: {
              user: this.NODEMAILER_INFO.user,
              pass: this.NODEMAILER_INFO.pass,
            },
          });
    }

    async sendMail(sendFrom: any, sendTo: any , subject: any, body: any){
        let info = await this.transporter.sendMail({
            from: sendFrom, // sender address
            to: sendTo, // list of receivers
            subject: subject, // Subject line
            text: body, // plain text body
            // html: "<b>Hello world? oops</b>", // html body
          });

          return info.messageId;
    }
}
