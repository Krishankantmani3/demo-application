import { Task } from "../../db/model/task.model";
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

export class BuilderService {

    taskDB: TaskDB;
    userDB: UserDB;

    constructor() {
        this.taskDB = new TaskDB();
        this.userDB = new UserDB();
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

            let result = await this.taskDB.saveTask(task);
            if (result == message.DATABASE_ERROR) {
                res.status(500).json({ error: message.DATABASE_ERROR });
            }
            res.status(200).json({ data: result });
        }
        catch (err) {
            console.error("BuilderService", "createTask", err);
            res.status(501).json({ error: message.SERVER_ERROR });
        }
    }

    public async getArchitectList(req: any, res: any) {
        try {
            let result = await this.userDB.getArchitectList();
            if (result == message.DATABASE_ERROR) {
                res.status(500).json({ error: message.DATABASE_ERROR });
            }
            else if (result == message.NO_DATA_FOUND) {
                return res.status(204);
            }


            res.status(200).json({ data: result });
        }
        catch (err) {
            console.error("BuilderService", "getArchitectList", err);
            res.status(501).json({ error: message.SERVER_ERROR });
        }
    }

    public async assignTask(req: any, res: any) {
        try {
            let architectId = req.body.architectId;
            let taskId = req.body.taskId;
            let result = await this.userDB.isArchitectId(architectId);
            if (result == message.DATABASE_ERROR) {
                return res.status(501).json({ error: message.DATABASE_ERROR });
            }
            else if (result == false) {
                return res.status(301).json({ error: message.INVALID_DATA });
            }

            let update = { assignedTo: architectId, assignedBy: req.user._id, status: TASK_STATUS.ASSIGNED, progress: TASK_PROGRESS.PENDING };
            let updatedTask: any = await this.taskDB.findAndupdateTaskById(taskId, update);

            if (updatedTask == message.DATABASE_ERROR) {
                return res.status(501).json({ error: message.DATABASE_ERROR });
            }
            else if (updatedTask = message.NO_DATA_FOUND) {
                return res.status(301).json({ error: message.NO_DATA_FOUND });
            }
            else {
                return res.status(200).json({ updatedTask });
            }
        }
        catch (err) {
            console.error("BuilderService.assignTask", err);
            res.status(401).json({ error: message.SERVER_ERROR });
        }
    }

    public async getAllTaskCreatedByBuilder(req: any, res: any) {
        try {
            let tasks: any = await this.taskDB.getAllTaskCreatedByBuilderId(req.user._id);
            if (tasks == message.DATABASE_ERROR) {
                return res.status(501).json({ error: message.DATABASE_ERROR });
            }
            else if (tasks == message.NO_DATA_FOUND) {
                return res.status(304).json({ error: message.NO_DATA_FOUND });
            }

            console.log("tasks", tasks);
            return res.status(200).json(tasks);

        } catch (error) {
            console.error("BuilderService.getAllTaskAssignedByBuilder", error);
            res.status(401).json({ error: message.SERVER_ERROR });
        }
    }

}


