import express, { Application, Router } from "express";
import { AdminController } from "../controller/admin.controller";
import { ArchitectController } from "../controller/architect.controller";
import { Auth } from "../controller/auth.controller";
import { BuilderController } from "../controller/builder.controller";



export class Approutes {
  router: Router;
  auth: Auth;
  admin: AdminController;
  architect: ArchitectController;
  builder: BuilderController;

  constructor(app: Application) {
    this.router = express.Router();
    this.auth = new Auth(app, this.router);
    this.admin = new AdminController(app, this.router);
    this.architect = new ArchitectController(app, this.router);
    this.builder = new BuilderController(app, this.router);
    app.use('/api', this.router);
  }

  initializeAllRouting() {
    this.auth.initializeRouting();
    this.admin.initializeRouting();
    this.architect.initializeRouting();
    this.builder.initializeRouting();
  }
}