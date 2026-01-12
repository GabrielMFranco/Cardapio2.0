import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export class MenuController{
    async create(req: Request, res: Response){
        
    }

    async index(req: Request, res: Response){
        const drinks = await prisma.drink.findMany()
    }
}