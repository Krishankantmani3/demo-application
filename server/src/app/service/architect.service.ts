//import { Task } from "../../db/model/task.model";
import { TaskDb } from "../../db/query/task.db";
import { TASK_PROGRESS } from "../constant/constant";

const MESSAGE = {
    DATABASE_ERROR: "DATABASE_ERROR",
    NO_DATA_FOUND: "NO_DATA_FOUND",
    SERVER_ERROR: "SERVER_ERROR"
};

export class ArchitectService{
    
    taskDb: TaskDb;

    constructor(){
        this.taskDb = new TaskDb();
        this.updateProgressOfTask = this.updateProgressOfTask.bind(this);
        this.getAllTasksAssignedToArchitect = this.getAllTasksAssignedToArchitect.bind(this);
    }

    public async updateProgressOfTask(req: any, res: any){
        try{
           let update = {progress: req.body.progress};
           let taskId = req.params.taskId;
           let result: any = await this.taskDb.findAndupdateTaskById(taskId, update);

           if(result == MESSAGE.NO_DATA_FOUND){
               res.status(300).json({error: MESSAGE.NO_DATA_FOUND});
           }
           else if(result == MESSAGE.DATABASE_ERROR){
            res.status(501).json({error: MESSAGE.DATABASE_ERROR});
           }

           res.status(200).status({data: result});

        }
        catch(err){
            console.error("ArchitectService.updateProgressOfTask", err);
            res.status(501).json({error: MESSAGE.SERVER_ERROR});
        }
    }

    public async getAllTasksAssignedToArchitect(req: any, res: any){
        try{
            let user = req.user;
            if(!user){
                return res.status(401).json({"message": 'UnAuthorized'});
            }

            let tasks = await this.taskDb.getAllTaskAssignedToArchitectId(user._id);
            if(tasks == MESSAGE.NO_DATA_FOUND){
                return res.status(204).json({"message": MESSAGE.NO_DATA_FOUND});
            }

            console.log("tasks", tasks);

            return res.status(200).json(tasks);
        }
        catch(err){
            console.error("ArchitectService.getAllTasks", err);
            res.status(501).json({error: MESSAGE.SERVER_ERROR});
        }
    }

}