export function NotFound(){
    return(
        <div className="w-screen h-screen flex justify-center items-center bg-zinc-800">
            <div className="flex flex-col">
                <h1 className="text-gray-100 font-semibold text-2xl mb-10">Ops!, Essa página não existe. 😢</h1>
                <a href="/" className="font-semibold text-center text-cyan-600 hover:text-cyan-800 transition ease-linear">Voltar para o inicio</a>
            </div>
        </div>
    )
}