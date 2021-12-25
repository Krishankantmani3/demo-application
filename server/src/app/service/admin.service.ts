import { Task } from "../../mongodb/model/task.model";
import { TaskDb } from "../../mongodb/query/task.db";
import { MESSAGE, TASK_STATUS } from "../utility/constant/constant";
import { printErrorLog } from "../utility/logger";

export class AdminService{
    
    private taskDb: TaskDb;

    constructor(){
        this.taskDb = new TaskDb();
        this.getAllTasks = this.getAllTasks.bind(this);
    }

    async getAllTasks(req: any, res: any) {
        try {
            let tasks = await this.taskDb.getAllTasks();
            if (tasks == MESSAGE.NO_DATA_FOUND) {
                return res.status(204).json({ "message": MESSAGE.NO_DATA_FOUND });
            }
            else if (tasks == MESSAGE.DATABASE_ERROR) {
                return res.status(500).json({ "message": MESSAGE.DATABASE_ERROR });
            }
            return res.status(200).json(tasks);
        }
        catch (err) {
            printErrorLog("AdminService", "getAllTasks", err);
            res.status(501).json({ error: MESSAGE.SERVER_ERROR });
        }
    }
}