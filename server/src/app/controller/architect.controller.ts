import { Application, Router } from "express";
import { AuthMiddleWare } from "../middleware/auth.middleware";
import { ArchitectService } from "../service/architect.service";

const baseUrl = '/architect';

export class ArchitectController {

    router: Router;
    app: Application;
    authMiddleware: AuthMiddleWare;
    architectService: ArchitectService;

    constructor(app: Application, router: Router) {
        this.app = app;
        this.router = router;
        this.authMiddleware = new AuthMiddleWare();
        this.architectService = new ArchitectService();
    }

    initializeRouting() {
        this.router.get(`${baseUrl}/tasks`, this.authMiddleware.architectAuth, this.architectService.getAllTasksAssignedToArchitect);
        this.router.get(`${baseUrl}/task/:taskId`, this.authMiddleware.architectAuth, this.architectService.getTask);
        this.router.put(`${baseUrl}/task/progress/:taskId/:progress`, this.authMiddleware.architectAuth, this.architectService.updateProgressOfTask);
    }
};
