import { Application, Router } from "express";
import { AuthMiddleWare } from "../middleware/auth.middleware";
import { AuthService } from "../service/auth.service";
import { UserService } from "../service/user.service";

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
        this.router.get('/auth', this.authMiddleware.auth);
        this.router.get('/test', this.authService.test);
    }
};
