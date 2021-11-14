import { Task } from "../../db/model/task.model";
import { TaskDb } from "../../db/query/task.db";
import { UserDb } from "../../db/query/user.db";
import { MESSAGE, TASK_PROGRESS, TASK_STATUS } from "../constant/constant";

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
            console.log(req.body);
            let task: Task = req.body;
            task.createdBy = req.user._id;
            task.status = task.assignedTo ? TASK_STATUS.ASSIGNED : TASK_STATUS.UNASSIGNED;
            task.progress = TASK_PROGRESS.PENDING;

            let result = await this.taskDb.saveTask(task);
            if (result == MESSAGE.DATABASE_ERROR) {
                res.status(500).json({ error: MESSAGE.DATABASE_ERROR });
            }
            res.status(200).json({ data: result });
        }
        catch (err) {
            console.error("BuilderService", "createTask", err);
            res.status(501).json({ error: MESSAGE.SERVER_ERROR });
        }
    }

    public async getArchitectList(req: any, res: any) {
        try {
            let result = await this.userDb.getArchitectList();
            if (result == MESSAGE.DATABASE_ERROR) {
                res.status(500).json({ error: MESSAGE.DATABASE_ERROR });
            }
            else if (result == MESSAGE.NO_DATA_FOUND) {
                return res.status(204);
            }


            res.status(200).json({ data: result });
        }
        catch (err) {
            console.error("BuilderService", "getArchitectList", err);
            res.status(501).json({ error: MESSAGE.SERVER_ERROR });
        }
    }

    public async assignTask(req: any, res: any) {
        try {
            let architectId = req.body.architectId;
            let taskId = req.body.taskId;
            let result = await this.userDb.isArchitectId(architectId);
            if (result == MESSAGE.DATABASE_ERROR) {
                return res.status(501).json({ error: MESSAGE.DATABASE_ERROR });
            }
            else if (result == false) {
                return res.status(301).json({ error: MESSAGE.INVALID_DATA });
            }

            let update = { assignedTo: architectId, assignedBy: req.user._id, status: TASK_STATUS.ASSIGNED, progress: TASK_PROGRESS.PENDING };
            let updatedTask: any = await this.taskDb.findAndupdateTaskById(taskId, update);

            if (updatedTask == MESSAGE.DATABASE_ERROR) {
                return res.status(501).json({ error: MESSAGE.DATABASE_ERROR });
            }
            else if (updatedTask = MESSAGE.NO_DATA_FOUND) {
                return res.status(301).json({ error: MESSAGE.NO_DATA_FOUND });
            }
            else {
                return res.status(200).json({ updatedTask });
            }
        }
        catch (err) {
            console.error("BuilderService.assignTask", err);
            res.status(401).json({ error: MESSAGE.SERVER_ERROR });
        }
    }

    public async getAllTaskCreatedByBuilder(req: any, res: any) {
        try {
            let tasks: any = await this.taskDb.getAllTaskCreatedByBuilderId(req.user._id);
            if (tasks == MESSAGE.DATABASE_ERROR) {
                return res.status(501).json({ error: MESSAGE.DATABASE_ERROR });
            }
            else if (tasks == MESSAGE.NO_DATA_FOUND) {
                return res.status(304).json({ error: MESSAGE.NO_DATA_FOUND });
            }

            console.log("tasks", tasks);
            return res.status(200).json(tasks);

        } catch (error) {
            console.error("BuilderService.getAllTaskAssignedByBuilder", error);
            res.status(401).json({ error: MESSAGE.SERVER_ERROR });
        }
    }

}


