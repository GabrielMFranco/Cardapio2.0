import lagoaAzul from "../assets/img/CuraçauBlue.png";
import sexOnTheBeach from "../assets/img/SexOnTheBeach.jpeg";
import morango from "../assets/img/DrinkMorango.png";
import marula from "../assets/img/DrinkMarula.png";
import { Plus, Trash2 } from 'lucide-react';

import { useAuth } from "../hooks/useAuth";
import { DrinkDialog } from "./DrinksDialog";

export function Cards(){
    const cards = [
        {name: "Lagoa Azul", img: lagoaAzul, ingredients: ["Limão", "Curaçau blue", "Vodka", "Água com gás", "Xarope de açucar"]},
        {name: "Sex on the Beach", img: sexOnTheBeach, ingredients: ["Suco de laranja", "Vodka", "Licor de pêssego", "grenadine"]},
        {name: "Drink de Morango", img: morango, ingredients: ["Morango", "limão", "agua com gás", "Vodka"]},
        {name: "Drink de Marula", img: marula, ingredients: ["teste"]},
    ]

    const auth = useAuth()
    const userRole = auth.signin?.user.role

    return(
        <div className="my-20 mx-auto px-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-300">
            {cards.map((item, index) => (
                <div key={index} className="group flex flex-col gap-2 p-5 mx-auto my-5 border border-white/5 shadow-xl hover:border-cyan-500/30 transition-all bg-zinc-800/40 rounded-2xl backdrop-blur-md max-w-75 min-w-75">
                    <h3 className="drink-title-custom">
                        {item.name}
                    </h3>

                    <div className="relative w-full h-90 overflow-hidden rounded-xl self-center shadow-lg shadow-black/50">
                        <img src={item.img} alt="imagem do drink" className="w-full h-full object-cover"/>

                        <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                            <h4 className="drink-title-ingredient">
                                Ingredientes
                            </h4>

                            <ul className="drink-ingredient-ul">
                                {item.ingredients.map((ingredient, i) => (
                                    <li key={i}>
                                        {ingredient}
                                    </li>
                                ))}
                            </ul>
                            
                            {userRole == "ADMIN" && (    
                                <button className="mt-7 group/trash">
                                    <Trash2 className="text-zinc-500 transition-colors duration-300 group-hover/trash:text-red-500"/>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {userRole == "ADMIN" && (
                <DrinkDialog>
                    <button 
                        className="flex flex-col items-center justify-center mx-auto my-5 h-120 w-full max-w-75 min-w-75 bg-zinc-800/20 backdrop-blur-md border-2 border-dashed border-white/20 rounded-2xl hover:border-cyan-500/50 hover:bg-zinc-800/40 transition-all group gap-5"

                    >
                        <div className="font-bold h-10 w-10">
                            <Plus size={48} className="text-white/30 group-hover:text-cyan-400"/>
                        </div>
                        <p className="font-bold text-white/30 group-hover:text-cyan-400 mt-2 uppercase tracking-widest text-xs">
                            Novo Drink
                        </p>
                    </button>
                </DrinkDialog>
            )}
        </div>
    )
}