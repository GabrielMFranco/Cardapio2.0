import { Router } from "express";
import { usersRoutes } from "./userCreate";
import { signInRoutes } from "./SignIn";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { menuRoutes } from "./menu";


export const routes = Router()

routes.use("/userscreate", usersRoutes)
routes.use("/signin", signInRoutes)

routes.use(ensureAuthenticated)
routes.use("/menu", menuRoutes)