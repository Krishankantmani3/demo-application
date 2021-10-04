import { Application, Router } from "express";
import * as dotenv from 'dotenv';
import { AuthMiddleWare } from "../middleware/auth.middleware";
import { AuthService } from "../service/auth.service";
import { UserService } from "../service/user.service";

dotenv.config();

export class Auth{

    router: Router;
    app: Application;
    authMiddleware: AuthMiddleWare;
    authService: AuthService;
    userService: UserService;

    constructor(app: Application, router: Router){
        this.app = app;
        this.router = router;
        this.authMiddleware = new AuthMiddleWare();
        this.authService = new AuthService();
        this.userService = new UserService();
    }

    initializeRouting(){
        
        this.router.post('/login', this.authService.login);

        this.router.post('/logout', this.authService.logout);
        
        this.router.post('/register', this.authService.register);

        this.router.get('/auth/role/:role', this.authMiddleware.roleAuth, this.authService.authorized);
        
        this.router.get('/test', this.authService.test);
    }

    
};
