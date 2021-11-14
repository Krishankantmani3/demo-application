
import { Application, Router } from "express";
import { AuthMiddleWare } from "../middleware/auth.middleware";
import { BuilderService } from "../service/builder.service";

const baseUrl = '/builder';

export class BuilderController{

    router: Router;
    app: Application;
    authMiddleware: AuthMiddleWare;
    builderService: BuilderService;

    constructor(app: Application, router: Router){
        this.app = app;
        this.router = router;
        this.authMiddleware = new AuthMiddleWare();
        this.builderService = new BuilderService();
    }

    initializeRouting(){
        this.router.post(`${baseUrl}/task`,this.authMiddleware.builderAuth, this.builderService.createTask);
        this.router.get(`${baseUrl}/architects`,this.authMiddleware.builderAuth, this.builderService.getArchitectList);
        this.router.get(`${baseUrl}/tasks`, this.authMiddleware.builderAuth, this.builderService.getAllTaskCreatedByBuilder);
    }
};
