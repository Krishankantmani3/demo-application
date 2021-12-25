import { Schema } from "mongoose";
import { MESSAGE, TASK_STATUS } from "../../app/utility/constant/constant";
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

    public getAllTaskAssignedToArchitectId(_id: Schema.Types.ObjectId){
        return new Promise((resolve, reject)=>{
            Tasks.find({assignedTo: _id}, {title: 1, description: 1, status: 1, progress: 1, createdBy: 1}).populate('createdBy', 'username').exec((err: any, tasks: any)=>{
                if(err){
                    printErrorLog("TaskDB", "getAllTaskAssignedToArchitectId", err);
                    return resolve(MESSAGE.DATABASE_ERROR);
                }
                
                if(tasks.length == 0){
                    return resolve(MESSAGE.NO_DATA_FOUND);
                }       
                return resolve(tasks);

            });
        });
    }

    public getAllTaskCreatedByBuilderId(_id: Schema.Types.ObjectId){
        return new Promise((resolve, reject)=>{
            Tasks.find({createdBy: _id}, {title: 1, description: 1, status: 1, progress: 1, assignedTo: 1}).populate('assignedTo', 'username').exec((err: any, tasks: any)=>{
                if(err){
                    printErrorLog("TaskDB", "getAllTaskCreatedByBuilderId", err);
                    return resolve(MESSAGE.DATABASE_ERROR);
                }
                
                if(tasks.length == 0){
                    return resolve(MESSAGE.NO_DATA_FOUND);
                }       
                return resolve(tasks);

            });
        });
    }

    public getAllTasks() {
        return new Promise((resolve, reject) => {
            Tasks.find({}, { title: 1, description: 1, status: 1, progress: 1, assignedTo: 1, createdBy: 1 })
            .populate('assignedTo', 'username')
            .populate('createdBy', 'username')
            .exec((err: any, tasks: any) => {
                if (err) {
                    printErrorLog("TaskDB", "getAllTasks", err);
                    return resolve(MESSAGE.DATABASE_ERROR);
                }

                if (tasks.length == 0) {
                    return resolve(MESSAGE.NO_DATA_FOUND);
                }
                return resolve(tasks);

            });
        });
    }
}