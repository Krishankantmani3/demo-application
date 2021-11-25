import { Schema } from "mongoose";
import { MESSAGE, TASK_STATUS } from "../../app/constant/constant";
import { printErrorLog } from "../../app/utility/logger";
import { Task, Tasks } from "../model/task.model";

export class TaskDb{

    public async saveTask(task: Task){
        try {
            let newTask = new Tasks(task);
            let result = await newTask.save();
            return result;
        } catch (error) {
            printErrorLog("TaskDB", "saveTask", error);
            return MESSAGE.DATABASE_ERROR;
        }
    }

    public async findTaskById(_id: Schema.Types.ObjectId): Promise<string | Task>{
        try{
            let result = Tasks.findOne({_id});
            if(result == undefined){
                return MESSAGE.NO_DATA_FOUND;
            }
            return result;
        }
        catch(err){
            printErrorLog("TaskDB", "findTaskById", err);
            return MESSAGE.DATABASE_ERROR;
        }
    }

    public async findAndupdateTaskById(query: any, update: any){
        try {
            let updatedTask = await Tasks.findOneAndUpdate(query, {$set: update}, {new: true});
            if(updatedTask == undefined){
                return MESSAGE.NO_DATA_FOUND;
            }

            return updatedTask;
        } catch (error) {
            printErrorLog("TaskDB", "findAndupdateTaskById", error);
            return MESSAGE.DATABASE_ERROR;
        }
    }

    public async getAllTaskAssignedToArchitectId(_id: Schema.Types.ObjectId){
        try {
            let tasks = await Tasks.find({assignedTo : _id});
            if(tasks.length == 0){
                return MESSAGE.NO_DATA_FOUND;
            }
            return tasks;
        } catch (error) {
            printErrorLog("TaskDB", "getAllUassignedTask", error);
            return MESSAGE.DATABASE_ERROR;
        }
    }

    public async getAllTaskCreatedByBuilderId(_id: Schema.Types.ObjectId){
        try {
            let tasks = await Tasks.find({createdBy: _id});
            if(tasks.length == 0){
                return MESSAGE.NO_DATA_FOUND;
            }
            return tasks;
        } catch (error) {
            printErrorLog("TaskDB", "getAllUassignedTask", error);
            return MESSAGE.DATABASE_ERROR;
        }
    }
}