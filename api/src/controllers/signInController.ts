import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../database/prisma" 
import { AppError } from "../utils/AppError";
import { compare } from "bcrypt";
import { authConfig } from "../config/auth";
import { sign } from "jsonwebtoken";

export class SignInController{
    async create(req: Request, res: Response){
        const bodySchema = z.object({
            user: z.string().min(5),
            password: z.string().min(5),
        })

        const { user, password } = bodySchema.parse(req.body)

        const userExists = await prisma.user.findFirst({
            where: { user }
        })

        if(!userExists){
            throw new AppError("Usuário ou senha inválido", 401)
        }

        const passwordMatched = await compare(password, userExists.password)

        if(!passwordMatched){
            throw new AppError("Usuário ou senha inválido", 401)
        }

        const { secret, expiresIn } = authConfig.jwt

        const token = sign(
            { role: userExists.role },
            secret,
            {subject: String(userExists.id),
            expiresIn: expiresIn as any,}
        )

        const { password: _, ...userWithoutPassword } = userExists

        res.json({token, user: userWithoutPassword})
    }
}