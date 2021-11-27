import { Schema } from "mongoose";
import { MESSAGE } from "../../app/utility/constant/constant";
import { USER_ROLE } from "../../app/utility/constant/constant";
import { printErrorLog } from "../../app/utility/logger";
import { User, Users } from "../model/user.model";

export class UserDb {

    public async findOneByUserName(username: string) {
        try {
            let user = await Users.findOne({ username });
            if (user == undefined) {
                return MESSAGE.NO_DATA_FOUND;
            }
            return user;
        }
        catch (err) {
            printErrorLog("UserDB", "findOneByUserName", err);
            return MESSAGE.DATABASE_ERROR;
        }
    }

    public async findByUserNameOrEmail(username: any, email: any) {
        try {
            let result = await Users.find({ $or: [{ "email" : email }, { "username" : username }] });
            if (result.length == 0) {
                return MESSAGE.NO_DATA_FOUND;
            }
            else {
                return result;
            }
        } catch (err) {
            printErrorLog("UserDB", "findByUserNameOrEmail", err);
            return MESSAGE.DATABASE_ERROR;
        }
    }

    public async saveNewUser(user: User) {
        try {
            let newUser = new Users(user);
            let data = await newUser.save();
            return data;
        } catch (err) {
            printErrorLog("UserDB", "saveNewUser", err);
            return MESSAGE.DATABASE_ERROR;
        }
    }

    public async isArchitectId(userId: Schema.Types.ObjectId){
        try{

            let result = await Users.findOne({_id: userId});
            if(result == undefined || !result.role.includes(USER_ROLE.ARCHITECT)){
                return false; 
            } 
            return true;
        }
        catch(err){
            printErrorLog("UserDB", "isItArchitectId", err);
            return MESSAGE.DATABASE_ERROR;
        }
    }

    public async getArchitectList(){
        try{
            let result = Users.find({role: USER_ROLE.ARCHITECT});
            if(!result && result.length == 0 ){
                return MESSAGE.NO_DATA_FOUND;
            }
            return result;
        }
        catch(err){
            printErrorLog("UserDB", "getArchitectList", err);
            return MESSAGE.DATABASE_ERROR;
        }
    }
}