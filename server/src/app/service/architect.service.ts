//import { Task } from "../../db/model/task.model";
import { TaskDb } from "../../mongodb/query/task.db";
import { MESSAGE, TASK_PROGRESS } from "../utility/constant/constant";
import { printErrorLog } from "../utility/logger";

export class ArchitectService {

    taskDb: TaskDb;

    constructor() {
        this.taskDb = new TaskDb();
        this.updateProgressOfTask = this.updateProgressOfTask.bind(this);
        this.getAllTasksAssignedToArchitect = this.getAllTasksAssignedToArchitect.bind(this);
        this.getTask = this.getTask.bind(this);
    }

    public async updateProgressOfTask(req: any, res: any) {
        try {
            let update = { progress: req.params.progress };
            let taskId = req.params.taskId;
            let query = {_id: taskId, assignedTo: req.user._id };
            let result: any = await this.taskDb.findAndupdateTaskById(query, update);
            if (result == MESSAGE.NO_DATA_FOUND) {
                res.status(304).json({ error: MESSAGE.NO_DATA_FOUND });
            }
            else if (result == MESSAGE.DATABASE_ERROR) {
                res.status(501).json({ error: MESSAGE.DATABASE_ERROR });
            }

            res.status(200).json(result);
        }
        catch (err) {
            printErrorLog("ArchitectService", "updateProgressOfTask", err);
            res.status(501).json({ error: MESSAGE.SERVER_ERROR });
        }
    }

    public async getAllTasksAssignedToArchitect(req: any, res: any) {
        try {
            let user = req.user;
            if (!user) {
                return res.status(401).json({ "message": 'UnAuthorized' });
            }

            let tasks = await this.taskDb.getAllTaskAssignedToArchitectId(user._id);
            if (tasks == MESSAGE.NO_DATA_FOUND) {
                return res.status(204).json({ "message": MESSAGE.NO_DATA_FOUND });
            }
            else if(tasks == MESSAGE.DATABASE_ERROR){
                return res.status(500).json({ "message": MESSAGE.DATABASE_ERROR });
            }
            return res.status(200).json(tasks);
        }
        catch (err) {
            printErrorLog("ArchitectService", "getAllTasksAssignedToArchitect", err);
            res.status(501).json({ error: MESSAGE.SERVER_ERROR });
        }
    }

    public async getTask(req: any, res: any) {
        try {
            let user = req.user;
            let taskId = req.params.taskId;
            if (!user) {
                return res.status(401).json({ "message": 'UnAuthorized' });
            }
            let task: any = await this.taskDb.findTaskById(taskId);
            if (task == MESSAGE.NO_DATA_FOUND) {
                return res.status(404).json({ "message": MESSAGE.NO_DATA_FOUND });
            }
            else if(task == MESSAGE.DATABASE_ERROR){
                return res.status(500).json({ "message": MESSAGE.DATABASE_ERROR });
            }
            else if (task.assignedTo != user._id) {
                return res.status(401).json({ "message": MESSAGE.UNAUTHORIZED_ACCESS });
            }
            return res.status(200).json(task);
        }
        catch (err) {
            printErrorLog("ArchitectService", "getTask", err);
            res.status(501).json({ error: MESSAGE.SERVER_ERROR });
        }
    }

}