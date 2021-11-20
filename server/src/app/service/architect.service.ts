//import { Task } from "../../db/model/task.model";
import { TaskDb } from "../../db/query/task.db";
import { MESSAGE, TASK_PROGRESS } from "../constant/constant";


export class ArchitectService{
    
    taskDb: TaskDb;

    constructor(){
        this.taskDb = new TaskDb();
        this.updateProgressOfTask = this.updateProgressOfTask.bind(this);
        this.getAllTasksAssignedToArchitect = this.getAllTasksAssignedToArchitect.bind(this);
        this.getTask = this.getTask.bind(this);
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
            console.error("ArchitectService", "getAllTasksAssignedToArchitect", err);
            res.status(501).json({error: MESSAGE.SERVER_ERROR});
        }
    }

    public async getTask(req: any, res: any){
        try{
            let user = req.user;
            let taskId = req.params.taskId;

            if(!user){
                return res.status(401).json({"message": 'UnAuthorized'});
            }

            let task: any = await this.taskDb.findTaskById(taskId);
            console.log("task", task);
            
            if(task == MESSAGE.NO_DATA_FOUND){
                return res.status(404).json({"message": MESSAGE.NO_DATA_FOUND});
            }
            else if(task.assignedTo != user._id ){
                return res.status(401).json({"message": MESSAGE.UNAUTHORIZED_ACCESS});
            }

            return res.status(200).json(task);
        }
        catch(err){
            console.error("ArchitectService", "getTask", err);
            res.status(501).json({error: MESSAGE.SERVER_ERROR});
        }
    }

}