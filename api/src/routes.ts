import { Router } from "express";
import { UsersControllers } from "./controllers/UsersController";

const routes = Router();
const usersControllers = new UsersControllers()

routes.get('/users', usersControllers.index)
routes.post('/users', usersControllers.create)

export default routes;