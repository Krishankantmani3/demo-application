import { Application, Router } from "express";
import { AuthMiddleWare } from "../middleware/auth.middleware";
import { ArchitectService } from "../service/architect.service";

const baseUrl = '/architect';

export class ArchitectController{

    router: Router;
    app: Application;
    authMiddleware: AuthMiddleWare;
    architectService: ArchitectService;

    constructor(app: Application, router: Router){
        this.app = app;
        this.router = router;
        this.authMiddleware = new AuthMiddleWare();
        this.architectService = new ArchitectService();
        
    }

    initializeRouting(){
        // this.router.post(`${baseUrl}/task`,this.authMiddleware.architectAuth,);
        this.router.get(`${baseUrl}/tasks`,this.authMiddleware.architectAuth, this.architectService.getAllTasks);
    }
};
