import { useState } from "react"

import lemonPNG from "../assets/img/lemon.png"
import orangePNG from "../assets/img/orange.png"
import abacaxiPNG from "../assets/img/abacaxi.png"
import morangoPNG from "../assets/img/morango.png"
import zeroAlcoolPNG from "../assets/img/sem-menores.png"
import otherPNG from "../assets/img/others.png"

interface FiltersProps {
  isMini?: boolean;
}

export function Filters({isMini = false}: FiltersProps){
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const categories = [
        { id: 'limao', img: lemonPNG, label: 'Limão' },
        { id: 'laranja', img: orangePNG, label: 'Laranja' },
        { id: 'abacaxi', img: abacaxiPNG, label: 'Abacaxi' },
        { id: 'morango', img: morangoPNG, label: 'Morango' },
        { id: 'zeroAlcool', img: zeroAlcoolPNG, label: 'Sem alcool' },
        { id: 'outros', img: otherPNG, label: 'Outros' },
    ];

    const toggleFilter = (id: string) => {
        setSelectedCategories((prev) =>
            prev.includes(id) 
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    return (
        <div className={`flex flex-wrap items-center justify-center  gap-5 ${isMini ? 'mt-2' : 'mt-10'}`}>
            {categories.map((item) => {
                const isSelected = selectedCategories.includes(item.id);

                return (
                    <button 
                        key={item.id}
                        type="button"
                        className={`flex flex-col items-center group transition-all ${isMini ? 'gap-0' : 'gap-2 mt-10'}`}
                        onClick={() => toggleFilter(item.id)}
                    >
                        <div className={`
                            ${isMini ? 'w-10 h-10' : 'w-16 h-16'} flex items-center justify-center rounded-2xl backdrop-blur-md transition-all duration-300 shadow-lg
                            ${isSelected 
                                ? "border-2 border-green-500 bg-green-500/10 scale-110 shadow-green-500/20" 
                                : "border border-white/5 bg-zinc-800/20 group-hover:border-cyan-500/50"
                            }
                        `}>
                            <img 
                                src={item.img} 
                                alt={item.label} 
                                className={`${isMini ? 'w-6 h-6' : 'w-10 h-10'}object-contain transition-all ${isSelected ? "brightness-110" : "grayscale-[0.5] group-hover:grayscale-0"}`}
                            />
                        </div>
                        {!isMini && (
                            <span className={`
                                text-[10px] uppercase font-bold tracking-widest transition-colors
                                ${isSelected ? "text-green-400" : "text-zinc-500 group-hover:text-cyan-400"}
                            `}>
                                {item.label}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}