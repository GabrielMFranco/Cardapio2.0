import lagoaAzul from "../assets/img/CuraçauBlue.png"
import sexOnTheBeach from "../assets/img/SexOnTheBeach.jpeg"
import morango from "../assets/img/DrinkMorango.png"
import marula from "../assets/img/DrinkMarula.png"

export function Cards(){
    const cards = [
        {name: "Lagoa Azul", img: lagoaAzul, ingredients: ["Limão", "Curaçau blue", "Vodka", "Água com gás", "Xarope de açucar"]},
        {name: "Sex on the Beach", img: sexOnTheBeach, ingredients: ["Suco de laranja", "Vodka", "Licor de pêssego", "grenadine"]},
        {name: "Drink de Morango", img: morango, ingredients: ["Morango", "limão", "agua com gás", "Vodka"]},
        {name: "Drink de Marula", img: marula, ingredients: ["teste"]},
    ]

    return(
        <div className="my-20 mx-auto px-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-300">
            {cards.map((item, index) => (
                <div key={index} className="group flex flex-col gap-2 p-5 mx-auto my-5 border border-white/5 shadow-xl hover:border-cyan-500/30 transition-all bg-zinc-800/40 rounded-2xl  backdrop-blur-md max-w-75 min-w-75">
                    <h3 className="self-center text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-[linear-gradient(to_right,rgb(149,114,252),rgb(67,231,173),rgb(226,212,92))] font-['Roboto']">
                        {item.name}
                    </h3>

                    <div className="relative w-full h-90 overflow-hidden rounded-xl self-center shadow-lg shadow-black/50">
                        <img src={item.img} alt="imagem do drink" className="w-full h-full object-cover"/>

                        <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                            <h4 className="text-cyan-400 font-bold mb-2 uppercase text-sm tracking-widest border-b border-cyan-400/30">
                                Ingredientes
                            </h4>

                            <ul className="text-zinc-100 text-sm font-['Roboto'] space-y-1">
                                {item.ingredients.map((ingredient, i) => (
                                    <li key={i} className="list-none">
                                        - {ingredient}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}