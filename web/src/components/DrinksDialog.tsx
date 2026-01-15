import * as Dialog from "@radix-ui/react-dialog";
import { X } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';
import { Upload } from "./Upload";
import { useState } from "react";
import { Filters } from "./Filters";

export function DrinkDialog({ children }: { children: React.ReactNode }){
    const [name, setName] = useState("")
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [ingredients, setIngredients] = useState<string[]>([])
    const [currentIngredient, setCurrentIngredient] = useState("");

    function imageFileChange(e: React.ChangeEvent<HTMLInputElement>){
        const file = e.target.files?.[0]
        if(file){
            setImageFile(file)
        }
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
                        <form action="" className="flex flex-col gap-5 ">
                            <Input
                                name="name"
                                legend="Nome" 
                                required 
                                placeholder="Nome do seu drink"
                                onChange={nameChange}
                            />

                            <div className="flex flex-col gap-1 border border-white/5 rounded-xl p-2"> 
                                <Input
                                    name="ingredients"
                                    legend="Ingredientes" 
                                    required 
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
                                onChange={imageFileChange}
                             />

                            <div className="flex flex-wrap">
                                <p className="text-zinc-400 text-sm font-semibold ml-1">
                                    Categorias:
                                </p>

                                <Filters isMini={true}/>
                            </div>

                            <div className="flex justify-center">
                                <Button type="submit">
                                    Finalizar
                                </Button>
                            </div>
                        </form>

                        <div className="group flex flex-col gap-2 p-5 mx-auto my-5 border border-white/5 shadow-xl hover:border-cyan-500/30 transition-all bg-zinc-800/40 rounded-2xl backdrop-blur-md max-w-75 min-w-75">
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