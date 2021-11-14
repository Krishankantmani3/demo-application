import { Schema } from "mongoose";
import { MESSAGE, TASK_STATUS } from "../../app/constant/constant";
import { Task, Tasks } from "../model/task.model";

export class TaskDb{

    public async saveTask(task: Task){
        try {
            let newTask = new Tasks(task);
            let result = await newTask.save();
            return result;
        } catch (error) {
            console.error("TaskDB.saveTask", error);
            return MESSAGE.DATABASE_ERROR;
        }
    }

    public async findTaskById(_id: Schema.Types.ObjectId): Promise<string | Task>{
        try{
            let result = Tasks.findOne({_id});
            if(result = undefined){
                return MESSAGE.NO_DATA_FOUND;
            }
            return result;
        }
        catch(err){
            console.error("TaskDB.findTaskById", err);
            return MESSAGE.DATABASE_ERROR;
        }
    }

    public async findAndupdateTaskById(taskId: Schema.Types.ObjectId, update: any){
        try {
            let updatedTask = await Tasks.findOneAndUpdate({_id: taskId}, update,{new: true});
            if(updatedTask = undefined){
                return MESSAGE.NO_DATA_FOUND;
            }

            return updatedTask;
        } catch (error) {
            console.error("TaskDB.findAndupdateTaskById", error);
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
            console.error("TaskDB.getAllUassignedTask", error);
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
            console.error("TaskDB.getAllUassignedTask", error);
            return MESSAGE.DATABASE_ERROR;
        }
    }
}