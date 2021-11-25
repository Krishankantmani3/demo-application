import { Task } from "../../mongodb/model/task.model";
import { TaskDb } from "../../mongodb/query/task.db";
import { TASK_STATUS } from "../utility/constant/constant";

export class AdminService{
    
    taskDb: TaskDb;

    constructor(){
        this.taskDb = new TaskDb();
    }  
}