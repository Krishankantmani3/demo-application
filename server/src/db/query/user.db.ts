import { Schema } from "mongoose";
import { MESSAGE } from "../../app/constant/constant";
import { USER_ROLE } from "../../app/constant/user.role";
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
            console.error("UserDB.findOneByUserName", err);
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
            console.error("UserDB.findByUserNameOrEmail", err);
            return MESSAGE.DATABASE_ERROR;
        }
    }

    public async saveNewUser(user: User) {
        try {
            let newUser = new Users(user);
            let data = await newUser.save();
            console.log(data);
            
            return data;
        } catch (err) {
            console.error("UserDB.saveNewUser", err);
            return MESSAGE.DATABASE_ERROR;
        }
    }

    public async isArchitectId(_id: Schema.Types.ObjectId){
        try{
            let result = Users.findOne({_id});
            if(result == undefined || result.Role != USER_ROLE.ARCHITECT){
                return false; 
            } 
            return true;
        }
        catch(err){
            console.error("UserDB.isItArchitectId", err);
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
            console.error("UserDB", "getArchitectList", err);
            return MESSAGE.DATABASE_ERROR;
        }
    }


}