import { useActionState } from "react";
import { AxiosError } from "axios";
import { z, ZodError } from "zod";

import { Button } from "../components/Button";
import { Input } from "../components/Input";

import logoOD from "../../public/logoOD.png";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";

const signInScheme = z.object({
    user: z.string().trim().min(1, {message: "Informe o usuário"}),
    password: z.string().trim().min(1, {message: "Informe a senha"})
})

export function SignIn(){
    const [state, formAction, isLoading] = useActionState(onAction, null)

    const auth = useAuth()

    async function onAction(_: any, formData: FormData){
        try {
            const data = signInScheme.parse({
                user: formData.get("user"),
                password: formData.get("password"),
            })

            const response = await api.post("/signin", data)

            auth.save(response.data)
        } catch (error) {
            console.log(error)

            if(error instanceof ZodError) {
                return { message: error.issues[0].message }
            }

            if(error instanceof AxiosError) {
                return {message: error.response?.data.message || "Erro no servidor"}
            }

            return { message: "Não foi possivel entrar"}
        }
    }

    return(
        <div className="
        w-screen
        h-screen
        flex
        justify-center
        ">
            <div className="flex flex-col items-center justify-center gap-4 w-full max-h-full" >
                <img src={logoOD} alt="logo obli drinks" className="w-40 h-40 md:w-80 md:h-80 mix-blend-screen rounded-full object-contain shrink-0"/>
                <form action={formAction} className="flex flex-col w-full max-w-75 items-center py-8 bg-zinc-800/30 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
                    <Input
                        name="user"
                        legend="Usuário"
                        required
                        placeholder="cliente"
                    />

                    <Input
                        name="password"
                        type="password"
                        legend="Senha" 
                        required 
                        placeholder="******"
                    />

                    <p className="text-sm text-red-600 text-center my-4 font-medium">
                        {state?.message}
                    </p>
                    
                    <Button type="submit" isLoading={isLoading}>
                        Entrar
                    </Button>
                </form>
            </div>
        </div>
    )
}