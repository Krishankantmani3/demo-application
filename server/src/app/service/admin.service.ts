import { UserDao } from "../../mongodb/dao/user.dao";
import { MESSAGE } from "../utility/constant/constant";
import { printErrorLog } from "../utility/logger";

export class AdminService {

    private userDao: UserDao;
    constructor() {
        this.userDao = new UserDao();
        this.getAllStudentList = this.getAllStudentList.bind(this);
    }

    async getAllStudentList(req: any, res: any, next: any) {
        try {
            let tasks = await this.userDao.getStudentList();
            if (!tasks) {
                res.status(204).json({ message: MESSAGE.NO_DATA_FOUND });
            }
            return res.status(200).json(tasks);
        }
        catch (err) {
            printErrorLog("AdminService", "getAllTasks", err);
            next(err);
        }
    }
}