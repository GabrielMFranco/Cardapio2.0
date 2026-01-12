import { useState, useEffect } from "react";
import { createContext, ReactNode } from "react";

type AuthContext = {
    isLoading: boolean
    signin: null | UserAPIResponse
    save: (data: UserAPIResponse) => void
    remove: () => void
}

const LOCAL_STORAGE_KEY = "@drinks" 

export const AuthContext = createContext({} as AuthContext)

export function AuthProvider({children}: { children: ReactNode}){
    const [ signin, setSignin ] = useState<null | UserAPIResponse>(null)
    const [isLoading, setIsLoading] = useState(true)

    function save(data: UserAPIResponse){
        localStorage.setItem(`${LOCAL_STORAGE_KEY}:user`, JSON.stringify(data.user))
        localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token)

        setSignin(data)
    }

    function remove(){
        setSignin(null)

        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`)
        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`)

        window.location.assign("/")
    }

    function loadUser(){
        const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`)
        const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`)

        if(token && user){
            setSignin({
                token,
                user: JSON.parse(user)
            })
        }

        setIsLoading(false)
    }

    useEffect(() => {
        loadUser()
    }, [])

    return(
        <AuthContext.Provider value={{ signin, save, isLoading, remove }}>
            {children}
        </AuthContext.Provider>
    )
}