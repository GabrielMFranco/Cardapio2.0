import lemonPNG from "../assets/img/lemon.png"
import orangePNG from "../assets/img/orange.png"
import abacaxiPNG from "../assets/img/abacaxi.png"
import morangoPNG from "../assets/img/morango.png"
import zeroAlcoolPNG from "../assets/img/sem-menores.png"
import otherPNG from "../assets/img/others.png"

export function Filers(){
    const categories = [
        { id: 'limao', img: lemonPNG, label: 'Limão' },
        { id: 'laranja', img: orangePNG, label: 'Laranja' },
        { id: 'abacaxi', img: abacaxiPNG, label: 'Abacaxi' },
        { id: 'morango', img: morangoPNG, label: 'Morango' },
        { id: 'zeroAlcool', img: zeroAlcoolPNG, label: 'Sem alcool' },
        { id: 'outros', img: otherPNG, label: 'Outros' },
    ];

    return (
        <div className="flex flex-wrap items-center justify-center mt-10 gap-3">
            {categories.map((item) => (
                <button 
                    key={item.id}
                    className="flex flex-col items-center gap-2 group transition-all"
                    onClick={() => console.log(`Filtrando por: ${item.id}`)}
                >
                    <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-zinc-800/20 backdrop-blur-md border border-white/5 group-hover:border-cyan-500/50 group-hover:scale-110 transition-all duration-300 shadow-lg">
                        <img 
                            src={item.img} 
                            alt={item.label} 
                            className="w-10 h-10 object-contain"
                        />
                    </div>
                    <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest group-hover:text-cyan-400">
                        {item.label}
                    </span>
                </button>
            ))}
        </div>
    )
}