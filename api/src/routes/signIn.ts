import { Router } from "express";
import { SignInController } from "../controllers/signInController";

export const signInRoutes = Router()
const signInController = new SignInController()

signInRoutes.post("/", signInController.create)

