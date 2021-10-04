//import { Task } from "../../db/model/task.model";
import { TaskDB } from "../../db/query/task.db";
import { TASK_PROGRESS } from "../constant/task.status";

const message = {
    DATABASE_ERROR: "DATABASE_ERROR",
    NO_DATA_FOUND: "NO_DATA_FOUND",
    SERVER_ERROR: "SERVER_ERROR"
};

export class ArchitectService{
    
    taskDB: TaskDB;

    constructor(){
        this.taskDB = new TaskDB();
        this.updateProgressOfTask = this.updateProgressOfTask.bind(this);

    }

    public async updateProgressOfTask(req: any, res: any){
        try{
           let update = {progress: req.body.progress};
           let taskId = req.params.taskId;
           let result: any = await this.taskDB.findAndupdateTaskById(taskId, update);

           if(result == message.NO_DATA_FOUND){
               res.status(300).json({error: message.NO_DATA_FOUND});
           }
           else if(result == message.DATABASE_ERROR){
            res.status(501).json({error: message.DATABASE_ERROR});
           }

           res.status(200).status({data: result});

        }
        catch(err){
            console.error("ArchitectService.updateProgressOfTask", err);
            res.status(401).json({error: message.SERVER_ERROR});            
        }
    }

}