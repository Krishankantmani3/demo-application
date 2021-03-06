import { Schema } from "mongoose";
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export class User{
    username: string;
    password: string;
    email: string;
    fullname: string;
    role: [number];

    constructor(user: User){
        this.username = user.username;
        this.password = this.hashPasswd(user.password);
        this.email = user.email;
        this.fullname = user.fullname;
        this.role = user.role;
    }

    public hashPasswd(password: string){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }

}

let UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    fullname: {type: String, required: true},
    role: {type: [Number], required: true},
});

export let Users = mongoose.model('User', UserSchema);

