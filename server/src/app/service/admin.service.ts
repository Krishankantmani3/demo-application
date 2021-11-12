import { Task } from "../../db/model/task.model";
import { TaskDB } from "../../db/query/task.db";
import { TASK_STATUS } from "../constant/task.status";

const message = {
    DATABASE_ERROR: "DATABASE_ERROR",
    NO_DATA_FOUND: "NO_DATA_FOUND",
    SERVER_ERROR: "SERVER_ERROR"
};

export class AdminService{
    
    taskDB: TaskDB;

    constructor(){
        this.taskDB = new TaskDB();
    }

    

    

}