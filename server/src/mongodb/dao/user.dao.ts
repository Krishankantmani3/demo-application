import { Schema } from "mongoose";
import mongoose from 'mongoose';
import { MESSAGE } from "../../app/utility/constant/constant";
import { USER_ROLE } from "../../app/utility/constant/constant";
import { printErrorLog } from "../../app/utility/logger";
import { User, Users } from "../model/user.model";

export class UserDao {

    public async findOneByUserName(username: string) {
        try {
            let user = await Users.findOne({ username });
            if (user == undefined) {
                return false;
            }
            return user;
        }
        catch (err) {
            printErrorLog("UserDao", "findOneByUserName", err);
            throw { status: 500, message: MESSAGE.DATABASE_ERROR };
        }
    }

    public async findOneByUserNameAndRoles(username: string, roles: number[]) {
        try {
            let user = await Users.findOne({ username, role: { $in: roles}});
            if (user == undefined) {
                return false;
            }
            return user;
        }
        catch (err) {
            printErrorLog("UserDao", "findOneByUserNameAndRoles", err);
            throw { status: 500, message: MESSAGE.DATABASE_ERROR };
        }
    }

    public async findByUserNameOrEmail(username: any, email: any) {
        try {
            let result = await Users.find({ $or: [{ "email": email }, { "username": username }] });
            if (result.length == 0) {
                return false;
            }
            console.log("result", result);
            return result;
        } catch (err) {
            printErrorLog("UserDao", "findByUserNameOrEmail", err);
            throw { status: 500, message: MESSAGE.DATABASE_ERROR };
        }
    }

    public async saveNewUser(user: User) {
        try {
            let newUser = new Users(user);
            let data = await newUser.save();
            return data;
        } catch (err) {
            printErrorLog("UserDao", "saveNewUser", err);
            throw { status: 500, message: MESSAGE.DATABASE_ERROR };
        }
    }

    public async isArchitectId(userId: Schema.Types.ObjectId) {
        try {
            let result = await Users.findOne({ _id: userId });
            if (result == undefined || !result.role.includes(USER_ROLE.STUDENT)) {
                return false;
            }
            return true;
        }
        catch (err) {
            printErrorLog("UserDao", "isItArchitectId", err);
            throw { status: 500, message: MESSAGE.DATABASE_ERROR };
        }
    }

    public async getStudentsList() {
        try {
            let result = await Users.find({ role: USER_ROLE.STUDENT }, { email: 1, username: 1, fullname: 1, isEmailVerified: 1, isUserActivated: 1 });
            if (!result || result.length == 0) {
                return false;
            }
            return result;
        }
        catch (err) {
            printErrorLog("UserDao", "getStudentsList", err);
            throw { status: 500, message: MESSAGE.DATABASE_ERROR };
        }
    }

    public async getEducatorsList() {
        try {
            let result = await Users.find({ role: USER_ROLE.EDUCATOR }, { email: 1, username: 1, fullname: 1, isEmailVerified: 1, isUserActivated: 1 });
            if (!result || result.length == 0) {
                return false;
            }
            return result;
        }
        catch (err) {
            printErrorLog("UserDao", "getEducatorsList", err);
            throw { status: 500, message: MESSAGE.DATABASE_ERROR };
        }
    }

    public async updateUserField(userId: any, updateObj: any){
        try{
            console.log("userId in server side", updateObj);
            return Users.updateOne({_id: mongoose.Types.ObjectId(userId)}, {$set: updateObj});
        }
        catch(err){
            printErrorLog("UserDao", "updateUserField", err);
            throw { status: 500, message: MESSAGE.DATABASE_ERROR };
        }
    }
}