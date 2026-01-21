import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { DiskStorage } from "../providers/diskStorage";

export class MenuController{
    async create(req: Request, res: Response){
        const {name, ingredients, categories} = req.body
        const img = req.file

        if(!img?.filename){
            return res.status(400).json({ message: "Arquivo de imagem não enviado." });
        }
        
        try {
            const diskStorage = new DiskStorage();

            await diskStorage.saveFile(img.filename);

            const drink = await prisma.drink.create({
                data:{
                    name,
                    img: img.filename,
                    ingredients: typeof ingredients === 'string' ? ingredients : JSON.stringify(ingredients),
                    categories: typeof categories === 'string' ? categories : JSON.stringify(categories)
                }
            })

            return res.status(201).json(drink);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro ao criar drink no banco." });
        }
        
    }

    async index(req: Request, res: Response){
        const { categories } = req.query

        let where = {}

        if(categories){
            const selectedArray = JSON.parse(String(categories))

            if(selectedArray.length > 0){
                where = {
                    OR: selectedArray.map((cat: string) =>({
                        categories: {
                            contains: cat
                        }
                    }))
                }
            }
        }

        const drinks = await prisma.drink.findMany({ where })
        return res.json(drinks);
    }

    async delete(req: Request, res: Response){
        const {id} = req.params

        try {
            const drink = await prisma.drink.findUnique({where: {id}})

            if(!drink){
                return res.status(404).json({ message: "Drink não encontrado." });
            }

            const diskStorage = new DiskStorage()
            if(drink.img){
                await diskStorage.deleteFile(drink.img, "upload");
            }

            await prisma.drink.delete({where: {id}})

            return res.json()
        } catch (error) {
            return res.status(500).json({ message: "Erro ao deletar o drink." });
        }
    }
    
    async updated(req: Request, res: Response){
        const { id } = req.params
        const { name, ingredients, categories } = req.body
        const img = req.file

        try {
            const drink = await prisma.drink.findUnique({where: {id}})

            if(!drink){
                return res.status(404).json({ message: "Drink não encontrado." })
            }

            let imageFilename = drink.img

            if (img?.filename) {
                const diskStorage = new DiskStorage()

                if (drink.img) {
                    await diskStorage.deleteFile(drink.img, "upload")
                }

                await diskStorage.saveFile(img.filename)
                imageFilename = img.filename
            }

            const updatedDrink = await prisma.drink.update({
                where: {id},
                data: {
                    name,
                    img: imageFilename,
                    ingredients:
                        typeof ingredients === "string"
                            ? ingredients
                            : JSON.stringify(ingredients),
                    categories:
                        typeof categories === "string"
                        ? categories
                        : JSON.stringify(categories)
                }
            })

            return res.json(updatedDrink)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Erro ao editar o drink." })
        }
    }
}