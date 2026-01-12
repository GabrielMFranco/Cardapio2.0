import { Request, Response } from "express";
import { hash } from "bcrypt";
import { prisma } from "../database/prisma";
import { AppError } from "../utils/AppError";

export class UsersController{
    async create(req: Request, res: Response){
        const adminPassword = await hash("admin123", 8);
        const customerPassword = await hash("cliente123", 8);

        await prisma.user.upsert({
            where: { user: "admin" },
            update: {},
            create: {
                user: "admin",
                password: adminPassword,
                role: "ADMIN",
            },
        });

        await prisma.user.upsert({
            where: { user: "cliente"},
            update: {},
            create:{
                user:"cliente",
                password: customerPassword,
                role: "CUSTOMER",
            },
        })

        return res.status(201).json({ message: "Usuários de setup criados com sucesso!" });
    }
}