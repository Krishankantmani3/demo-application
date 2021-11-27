import { Task } from "../../mongodb/model/task.model";
import { TaskDb } from "../../mongodb/query/task.db";
import { UserDb } from "../../mongodb/query/user.db";
import { MESSAGE, TASK_PROGRESS, TASK_STATUS } from "../utility/constant/constant";
import { printErrorLog } from "../utility/logger";

export class BuilderService {

    taskDb: TaskDb;
    userDb: UserDb;

    constructor() {
        this.taskDb = new TaskDb();
        this.userDb = new UserDb();
        this.createTask = this.createTask.bind(this);
        this.assignTask = this.assignTask.bind(this);
        this.getArchitectList = this.getArchitectList.bind(this);
        this.getAllTaskCreatedByBuilder = this.getAllTaskCreatedByBuilder.bind(this);
    }

    public async createTask(req: any, res: any) {
        try {
            let task: Task = req.body;
            task.createdBy = req.user._id;
            task.status = task.assignedTo ? TASK_STATUS.ASSIGNED : TASK_STATUS.UNASSIGNED;
            task.progress = TASK_PROGRESS.PENDING;

            if(task.assignedTo){
                let result = await this.userDb.isArchitectId(task.assignedTo);
                if (result == MESSAGE.DATABASE_ERROR) {
                    return res.status(500).json({ message: MESSAGE.DATABASE_ERROR });
                }
                else if(result == false){
                    res.status(400).json({ message: MESSAGE.INVALID_DATA });
                }
            }

            let result = await this.taskDb.saveTask(task);
            if (result == MESSAGE.DATABASE_ERROR) {
                res.status(500).json({ message: MESSAGE.DATABASE_ERROR });
            }
            res.status(200).json({ data: result });
        }
        catch (err) {
            printErrorLog("BuilderService", "createTask", err);
            res.status(501).json({ message: MESSAGE.SERVER_ERROR });
        }
    }

    public async getArchitectList(req: any, res: any) {
        try {
            let result = await this.userDb.getArchitectList();
            if (result == MESSAGE.DATABASE_ERROR) {
                res.status(500).json({ message: MESSAGE.DATABASE_ERROR });
            }
            else if (result == MESSAGE.NO_DATA_FOUND) {
                return res.status(204);
            }


            res.status(200).json({ data: result });
        }
        catch (err) {
            printErrorLog("BuilderService", "getArchitectList", err);
            res.status(501).json({ message: MESSAGE.SERVER_ERROR });
        }
    }

    public async assignTask(req: any, res: any) {
        try {
            let architectId = req.params.assignee;

            let taskId = req.params.taskId;
            let result = await this.userDb.isArchitectId(architectId);
            if (result == MESSAGE.DATABASE_ERROR) {
                return res.status(500).json({ message: MESSAGE.DATABASE_ERROR });
            }
            else if (result == false) {
                return res.status(301).json({ message: MESSAGE.INVALID_DATA });
            }

            let update = { assignedTo: architectId, status: TASK_STATUS.ASSIGNED, progress: TASK_PROGRESS.PENDING };
            let query = { _id: taskId, createdBy: req.user._id };
            let updatedTask: any = await this.taskDb.findAndupdateTaskById(query, update);

            if (updatedTask == MESSAGE.DATABASE_ERROR) {
                return res.status(501).json({ message: MESSAGE.DATABASE_ERROR });
            }
            else if (updatedTask == MESSAGE.NO_DATA_FOUND) {
                return res.status(301).json({ message: MESSAGE.NO_DATA_FOUND });
            }
            else {
                return res.status(200).json(updatedTask);
            }
        }
        catch (err) {
            printErrorLog("BuilderService", "assignTask", err);
            res.status(401).json({ message: MESSAGE.SERVER_ERROR });
        }
    }

    public async getAllTaskCreatedByBuilder(req: any, res: any) {
        try {
            let tasks: any = await this.taskDb.getAllTaskCreatedByBuilderId(req.user._id);
            if (tasks == MESSAGE.DATABASE_ERROR) {
                return res.status(501).json({ message: MESSAGE.DATABASE_ERROR });
            }
            else if (tasks == MESSAGE.NO_DATA_FOUND) {
                return res.status(204).json({ message: MESSAGE.NO_DATA_FOUND });
            }
            return res.status(200).json(tasks);
        } catch (error) {
            printErrorLog("BuilderService", "getAllTaskAssignedByBuilder", error);
            res.status(500).json({ message: MESSAGE.SERVER_ERROR });
        }
    }

}


