import { Schema } from "mongoose";
import { USER_ROLE } from "../../app/constant/user.role";
import { User, Users } from "../model/user.model";


const message = {
    DATABASE_ERROR: "DATABASE_ERROR",
    NO_DATA_FOUND: "NO_DATA_FOUND"
};

export class UserDB {

    public async findOneByUserName(username: string) {
        try {
            let user = await Users.findOne({ username });
            if (user == undefined) {
                return message.NO_DATA_FOUND;
            }
            return user;
        }
        catch (err) {
            console.error("UserDB.findOneByUserName", err);
            return message.DATABASE_ERROR;
        }
    }

    public async findByUserNameOrEmail(username: any, email: any) {
        try {
            let result = await Users.find({ $or: [{ "email" : email }, { "username" : username }] });

            if (result.length == 0) {
                return message.NO_DATA_FOUND;
            }
            else {
                return result;
            }
        } catch (err) {
            console.error("UserDB.findByUserNameOrEmail", err);
            return message.DATABASE_ERROR;
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
            return message.DATABASE_ERROR;
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
            return message.DATABASE_ERROR;
        }
    }


}