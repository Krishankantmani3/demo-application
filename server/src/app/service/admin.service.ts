import { UserDao } from "../../mongodb/dao/user.dao";
import { MESSAGE, USER_ROLE } from "../utility/constant/constant";
import { UserResponseDTO } from "../utility/dto/userResponse.dto";
import { printErrorLog } from "../utility/logger";

export class AdminService {

    private userDao: UserDao;
    constructor() {
        this.userDao = new UserDao();
        this.getStudentList = this.getStudentList.bind(this);
        this.getEducatorsList = this.getEducatorsList.bind(this);
        this.getStudentOrEducatorDetailsByUserName = this.getStudentOrEducatorDetailsByUserName.bind(this);
        this.verifyEmailByAdmin = this.verifyEmailByAdmin.bind(this);
        this.activateUSerByAdmin = this.activateUSerByAdmin.bind(this);
        this.deactivateUserByAdmin = this.deactivateUserByAdmin.bind(this);
    }

    async getStudentList(req: any, res: any, next: any) {
        try {
            let students = await this.userDao.getStudentsList();
            if (!students) {
                res.status(204).json({ message: MESSAGE.NO_DATA_FOUND });
            }
            return res.status(200).json(students);
        }
        catch (err) {
            printErrorLog("AdminService", "getAllStudentList", err);
            next(err);
        }
    }

    async getEducatorsList(req: any, res: any, next: any) {
        try {
            let educators = await this.userDao.getStudentsList();
            if (!educators) {
                res.status(204).json({ message: MESSAGE.NO_DATA_FOUND });
            }
            return res.status(200).json(educators);
        }
        catch (err) {
            printErrorLog("AdminService", "getAllEducatorsList", err);
            next(err);
        }
    }

    async getStudentOrEducatorDetailsByUserName(req: any, res: any, next: any) {
        try {
            let username = req.params.username;
            let roles = [USER_ROLE.EDUCATOR, USER_ROLE.STUDENT];
            let user = await this.userDao.findOneByUserNameAndRoles(username, roles);
            if (!user) {
                return res.status(204).json({ message: MESSAGE.NO_DATA_FOUND });
            }
            return res.status(200).json(new UserResponseDTO(user));
        }
        catch (err) {
            printErrorLog("AdminService", "getAllEducatorsList", err);
            next(err);
        }
    }

    async verifyEmailByAdmin(req: any, res: any, next: any) {
        try {
            let userId = req.params.userId;
            let updateObj = { isEmailVerified: true };
            await this.userDao.updateUserField(userId, updateObj);
            return res.status(204).json({ message: "successfully Updated" });
        }
        catch (err) {
            printErrorLog("AdminService", "verifyEmailByAdmin", err);
            next(err);
        }
    }

    async activateUSerByAdmin(req: any, res: any, next: any) {
        try {
            let userId = req.params.userId;
            let updateObj = { isUserActivated: true };
            await this.userDao.updateUserField(userId, updateObj);
            return res.status(204).json({ message: "successfully Updated" });
        }
        catch (err) {
            printErrorLog("AdminService", "verifyUserActivationByAdmin", err);
            next(err);
        }
    }

    async deactivateUserByAdmin(req: any, res: any, next: any) {
        try {
            let userId = req.params.userId;
            let updateObj = { isUserActivated: false };
            await this.userDao.updateUserField(userId, updateObj);
            return res.status(204).json({ message: "successfully Updated" });
        }
        catch (err) {
            printErrorLog("AdminService", "deactivateUserByAdmin", err);
            next(err);
        }
    }
}