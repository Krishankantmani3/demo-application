import { Task } from "../../db/model/task.model";
import { TaskDb } from "../../db/query/task.db";
import { TASK_STATUS } from "../constant/constant";

export class AdminService{
    
    taskDb: TaskDb;

    constructor(){
        this.taskDb = new TaskDb();
    }  
}