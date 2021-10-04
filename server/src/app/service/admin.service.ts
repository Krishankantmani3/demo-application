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
        this.createTask = this.createTask.bind(this);
    }

    public async createTask(req: any, res: any){
        try{
            let task: Task = req.body.task;
            task.createdBy = req.user._id;
            task.status = TASK_STATUS.UNASSIGNED;
            let result = await this.taskDB.saveTask(task);
            if(result == message.DATABASE_ERROR){
                res.status(500).json({error: message.DATABASE_ERROR});
            }
            res.status(200).json({data: result});
        }
        catch(err){
            console.error("AdminService.createTask", err);
            res.status(401).json({error: message.SERVER_ERROR});            
        }
    }

    

}