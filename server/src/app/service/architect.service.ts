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
        this.getAllTasksAssignedToArchitect = this.getAllTasksAssignedToArchitect.bind(this);
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
            res.status(501).json({error: message.SERVER_ERROR});
        }
    }

    public async getAllTasksAssignedToArchitect(req: any, res: any){
        try{
            let user = req.user;
            if(!user){
                return res.status(401).json({"message": 'UnAuthorized'});
            }

            let tasks = await this.taskDB.getAllTaskAssignedToArchitectId(user._id);
            if(tasks == message.NO_DATA_FOUND){
                return res.status(204).json({"message": message.NO_DATA_FOUND});
            }

            console.log("tasks", tasks);

            return res.status(200).json(tasks);
        }
        catch(err){
            console.error("ArchitectService.getAllTasks", err);
            res.status(501).json({error: message.SERVER_ERROR});
        }
    }

}