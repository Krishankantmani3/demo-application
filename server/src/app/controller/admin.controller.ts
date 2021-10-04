import { Application, Router } from "express";
import { AuthMiddleWare } from "../middleware/auth.middleware";
import { AdminService } from "../service/admin.service";
import { AuthService } from "../service/auth.service";

const baseUrl = '/admin';

export class AdminController{

    router: Router;
    app: Application;
    authMiddleware: AuthMiddleWare;
    adminService: AdminService;
    constructor(app: Application, router: Router){
        this.app = app;
        this.router = router;
        this.authMiddleware = new AuthMiddleWare();
        this.adminService = new AdminService();
    }

    initializeRouting(){    
        this.router.post(`${baseUrl}/task`, this.authMiddleware.adminAuth ,this.adminService.createTask);
    }

    
};
