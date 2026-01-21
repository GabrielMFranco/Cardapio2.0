import * as Dialog from "@radix-ui/react-dialog";
import { X } from 'lucide-react';
import { useActionState, useState } from "react";
import { api } from "../services/api";

import { Input } from './Input';
import { Button } from './Button';
import { Upload } from "./Upload";
import { Filters } from "./Filters";

import { AxiosError } from "axios";
import z, { ZodError } from "zod";

const drinkSchema = z.object({
    name: z.string().min(3,"O nome deve ter pelo menos 3 letras"),
    ingredients: z.array(z.string()).min(1, "Adicione pelo menos um ingrediente"),
    img: z.instanceof(File, { message: "A imagem é obrigatória" }),
    categories: z.array(z.string()).min(1, "Selecione pelo menos uma categoria"),
})

export function DrinkDialog({ children }: { children: React.ReactNode }){
    const [name, setName] = useState("")
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [ingredients, setIngredients] = useState<string[]>([])
    const [currentIngredient, setCurrentIngredient] = useState("")
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const [ state, formAction, isLoading ] = useActionState(onAction, null)
    
    function imageFileChange(e: React.ChangeEvent<HTMLInputElement>){
        const file = e.target.files?.[0]
        if(!file){
            return
        }

        setImageFile(file)
    }
    
    function nameChange(e: React.ChangeEvent<HTMLInputElement>){
        setName(e.target.value)
    }

    function addIngredient(){
        if (currentIngredient.trim() !== ""){
            setIngredients([...ingredients, currentIngredient.trim()]);
            setCurrentIngredient("");
        }
    }

    function removeIngredient(){
        if(!currentIngredient.trim()){
            if(ingredients.length === 0){
                alert("lista vazia")
                return
            }
            setIngredients((prev)=> prev.slice(0,-1))
            return
        }

        const indexToRemove = ingredients.findIndex(
            (ing) => ing.toLowerCase() === currentIngredient.toLowerCase().trim()
        );
        if (indexToRemove !== -1) {
            const newIngredients = [...ingredients];
            newIngredients.splice(indexToRemove, 1);
            setIngredients(newIngredients);
            setCurrentIngredient("");
        } else {
           alert("Ingrediente não encontrado na lista.");
        }

    }

    async function onAction(_: any, _formData: FormData){
        try {
            drinkSchema.parse({
                name,
                ingredients,
                img: imageFile,
                categories: selectedCategories,
            })

            const data = new FormData()

            data.append("name", name)
            data.append("ingredients", JSON.stringify(ingredients));
            data.append("categories", JSON.stringify(selectedCategories));
            if(imageFile){
                data.append("img",imageFile)
            }

            await api.post("/menu", data)

            alert("Drink criado com sucesso!");

            window.location.reload();
        } catch (error) {
            console.log(error)

            if(error instanceof AxiosError){
                return { message: error.response?.data.message || "Erro no servidor" }
            }

            if(error instanceof ZodError){
                setImageFile(null);
                return { message: error.issues[0].message }
            }
        }
    }
    return(
        <Dialog.Root>
            <Dialog.Trigger asChild>
                {children} 
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"/>
                <Dialog.Content 
                    onPointerDownOutside={(e) => e.preventDefault()}
                    className="w-[90vw] max-w-200 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 p-8 rounded-3xl z-50"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div className="w-6" />
                        
                        <Dialog.Title className="text-white flex justify-between">
                            Novo Drink
                        </Dialog.Title>

                        <Dialog.Close className="text-zinc-500 hover:text-red-600 transition-colors outline-none">
                            <X size={24} />
                        </Dialog.Close>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[85vh] overflow-y-auto overflow-x-hidden px-2">
                        <form action={formAction} className="flex flex-col gap-5 ">
                            <Input
                                name="name"
                                legend="Nome"
                                value={name}
                                required 
                                placeholder="Nome do seu drink"
                                onChange={nameChange}
                            />

                            <div className="flex flex-col gap-1 border border-white/5 rounded-xl p-2"> 
                                <Input
                                    name="ingredients"
                                    legend="Ingredientes"
                                    placeholder="Ex: Suco de limão"
                                    value={currentIngredient}
                                    onChange={(e) => setCurrentIngredient(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
                                />

                                <div className="flex gap-2 justify-center">
                                    <Button
                                        type="button"
                                        onClick={addIngredient}
                                        className="h-12 px-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl transition-colors font-bold w-30 self-center"
                                    >
                                        Add
                                    </Button>

                                    <Button
                                        type="button"
                                        onClick={removeIngredient}
                                        className="h-12 px-4 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors font-bold w-30 self-center"
                                    >
                                        Remover
                                    </Button>
                                </div>
                            </div>

                            <Upload
                                legend="Imagem do Drink"
                                required
                                filename={imageFile && imageFile.name}
                                onChange={imageFileChange}
                             />

                            <div className="flex flex-col">
                                <p className="text-zinc-400 text-sm font-semibold ml-1">
                                    Categorias:
                                </p>

                                <Filters
                                    isMini={true}
                                    onFilterChange={setSelectedCategories}
                                />
                            </div>

                            <p className="text-sm text-red-600 text-center my-4 font-medium">
                                {state?.message}
                            </p>

                            <div className="flex justify-center">
                                <Button type="submit" disabled={isLoading}>
                                    Finalizar
                                </Button>
                            </div>
                        </form>

                        <div className="group flex flex-col gap-2 p-5 mx-auto my-5 border border-white/5 shadow-xl hover:border-cyan-500/30 transition-all bg-zinc-800/40 rounded-2xl backdrop-blur-md max-w-75 min-w-75 self-center">
                            <h3 className="drink-title-custom">
                                {name || "Nome do Drink"}
                            </h3>

                            <div className="group relative w-full h-90 overflow-hidden rounded-xl self-center shadow-lg shadow-black/50 bg-zinc-800">

                                {imageFile
                                ? (
                                    <img
                                        src={URL.createObjectURL(imageFile)}
                                        alt="Preview da imagem"
                                        className="w-full h-full object-cover transition-all duration-500 blur-md group-hover:blur-none opacity-40 group-hover:opacity-100"
                                    />
                                )
                                :(
                                    <div className="w-full h-full flex items-center justify-center bg-zinc-950/50 border-2 border-dashed border-white/10 rounded-xl"/>
                                )}

                                <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm flex flex-col items-center justify-center p-4 transition-opacity duration-300 opacity-100 group-hover:opacity-0 pointer-events-none">
                                    
                                    <h4 className="drink-title-ingredient">
                                        Ingredientes
                                    </h4>

                                    <ul className="drink-ingredient-ul">
                                        {ingredients.length > 0 ? (
                                            ingredients.map((ingredient, i) => (
                                                <li key={i}>
                                                    {ingredient}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-zinc-500 italic">Composição vazia...</li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}