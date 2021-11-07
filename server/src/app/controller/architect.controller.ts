import { Application, Router } from "express";
import { AuthMiddleWare } from "../middleware/auth.middleware";

const baseUrl = '/architect';

export class ArchitectController{

    router: Router;
    app: Application;
    authMiddleware: AuthMiddleWare;
    constructor(app: Application, router: Router){
        this.app = app;
        this.router = router;
        this.authMiddleware = new AuthMiddleWare();
        
    }

    initializeRouting(){
        // this.router.post(`${baseUrl}/task`,this.authMiddleware.architectAuth,);
        this.router.get(`${baseUrl}/tasks`,this.authMiddleware.architectAuth,);
    }
};
