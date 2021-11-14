import { Task } from "../../db/model/task.model";
import { TaskDb } from "../../db/query/task.db";
import { TASK_STATUS } from "../constant/constant";

const MESSAGE = {
    DATABASE_ERROR: "DATABASE_ERROR",
    NO_DATA_FOUND: "NO_DATA_FOUND",
    SERVER_ERROR: "SERVER_ERROR"
};

export class AdminService{
    
    taskDb: TaskDb;

    constructor(){
        this.taskDb = new TaskDb();
    }  
}