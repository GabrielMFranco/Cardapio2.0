import logoHeader from "../../public/logoHeader.png"
import iconSair from "../assets/icon/sair.png"

export function Header(){
    function exitAccount(){
        
    }

    return(
        <header className="w-full h-auto flex flex-col gap-4">
            <img src={iconSair} alt="icone de sair" className="w-8 h-8 flex ml-auto mr-3 mt-3 hover:opacity-70 transition-all hover:scale-110 ease-linear" onClick={exitAccount}/>

            <img src={logoHeader} alt="logo do header" className="w-120 self-center"/>
        </header>
    )
}