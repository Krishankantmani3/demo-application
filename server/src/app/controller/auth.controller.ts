import { Application, Router } from "express";
import { AuthMiddleWare } from "../middleware/auth.middleware";
import { AuthService } from "../service/auth.service";
import express from "express";

export class Auth {

    router: express.Router;
    app: Application;
    authMiddleware: AuthMiddleWare;
    authService: AuthService;

    constructor(app: Application, router: Router) {
        this.app = app;
        this.router = router;
        this.authMiddleware = new AuthMiddleWare();
        this.authService = new AuthService();
    }

    initializeRouting() {
        this.router.post('/login', this.authService.login);
        this.router.post('/logout', this.authService.logout);
        this.router.post('/register', this.authService.register);
        this.router.get('/auth', this.authMiddleware.auth);
        this.router.get('/verify-email', this.authService.test);
        this.router.get('/test', this.authService.test);
    }
};
