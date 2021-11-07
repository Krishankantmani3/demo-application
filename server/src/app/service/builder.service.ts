import { TaskDB } from "../../db/query/task.db";
import { UserDB } from "../../db/query/user.db";
import { TASK_PROGRESS, TASK_STATUS } from "../constant/task.status";

const message = {
    DATABASE_ERROR: "DATABASE_ERROR",
    NO_DATA_FOUND: "NO_DATA_FOUND",
    SERVER_ERROR: "SERVER_ERROR",
    INVALID_DATA: "INVALID_DATA",
    NO_ASSIGNED_TASK: "NO_ASSIGNED_TASK"
};

export class BuilderService{
    
    taskDB: TaskDB;
    userDB: UserDB;

    constructor(){
        this.taskDB = new TaskDB();
        this.userDB = new UserDB();
        this.assignTask = this.assignTask.bind(this);
        this.getAllUassignedTask = this.getAllUassignedTask.bind(this);
        this.getAllTaskAssignedByBuilder = this.getAllTaskAssignedByBuilder.bind(this);
    }

    public async getAllUassignedTask(req: any, res: any){
        try {
            let tasks: any = await this.taskDB.getAllUnassignedTask();
            if(tasks == message.NO_DATA_FOUND){
                return res.status(404).json({error: message.NO_DATA_FOUND});
            }
            else if(tasks == message.DATABASE_ERROR){
                return res.status(500).json({error: message.SERVER_ERROR});
            }

            return tasks;
            
        } catch (error) {
            console.error("BuilderService.getAllUassignedTask", error);
            res.status.json({error: message.SERVER_ERROR});
        }
    }

    public async assignTask(req: any, res: any){
        try{
            let architectId = req.body.architectId;
            let taskId = req.body.taskId;
            let result = await this.userDB.isArchitectId(architectId);
            if(result == message.DATABASE_ERROR){
                return res.status(501).json({error: message.DATABASE_ERROR}); 
            }
            else if(result == false){
                return res.status(301).json({error: message.INVALID_DATA});
            }

            let update = { assignedTo: architectId, assignedBy: req.user._id, status: TASK_STATUS.ASSIGNED, progress: TASK_PROGRESS.PENDING };
            let updatedTask: any = await this.taskDB.findAndupdateTaskById(taskId, update);

            if(updatedTask == message.DATABASE_ERROR){
                return res.status(501).json({error: message.DATABASE_ERROR}); 
            }
            else if(updatedTask = message.NO_DATA_FOUND){
                return res.status(301).json({error: message.NO_DATA_FOUND});
            }
            else{
                return res.status(200).json({updatedTask});
            }
        }
        catch(err){
            console.error("BuilderService.assignTask", err);
            res.status(401).json({error: message.SERVER_ERROR});            
        }
    }

    public async getAllTaskAssignedByBuilder(req: any, res: any){
        try {
            let tasks: any = await this.taskDB.getAllTaskByAssignedById(req.user._id);
            if(tasks == message.DATABASE_ERROR){
                return res.status(501).json({error: message.DATABASE_ERROR});
            }
            else if(tasks == message.NO_DATA_FOUND){
                return res.status(301).json({error: message.NO_DATA_FOUND});
            }

            return tasks;

        } catch (error) {
            console.error("BuilderService.getAllTaskAssignedByBuilder", error);
            res.status(401).json({error: message.SERVER_ERROR});
        }
    }
    
}


