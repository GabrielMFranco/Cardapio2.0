import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

import logoOD from "../../public/logoOD.png";

export function SignIn(){
    const [user, setUser ] = useState("");
    const [password, setPassword ] = useState("");
    const [isLoading, setIsLoading ] = useState(false);

    function onSubmit(e: React.FormEvent){
        e.preventDefault()
        alert("ok")
    }

    return(
        <div className="
        w-screen
        h-screen
        bg-[#050505] bg-[radial-gradient(circle_at_top_left,var(--color-neon-blue)_0%,transparent_20%),radial-gradient(circle_at_bottom_right,var(--color-neon-purple)_0%,transparent_25%)]
        flex
        justify-center
        ">
            <div className="flex flex-col items-center gap-4">
                <img src={logoOD} alt="logo obli drinks" className="w-100 h-100 mix-blend-screen rounded-full"/>
                <form onSubmit={onSubmit} className="flex flex-col w-full max-w-[300px] items-center py-8 bg-zinc-800/30 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
                    <Input
                        legend="Usuário"
                        required
                        placeholder="cliente"
                        onChange={(e) => setUser(e.target.value)}
                    />

                    <Input
                        type="password"
                        legend="Senha" 
                        required 
                        placeholder="******"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button type="submit" isLoading={isLoading}>
                        Entrar
                    </Button>
                </form>
            </div>
        </div>
    )
}