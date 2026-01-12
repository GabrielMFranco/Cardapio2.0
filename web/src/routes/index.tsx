import { BrowserRouter } from "react-router";

import { AuthRoutes } from "./authRoutes";
import { useAuth } from "../hooks/useAuth";

import { Loading } from "../components/Loading";
import { MenuRoutes } from "./MenuRoutes";

export function Routes(){
    const { signin, isLoading } = useAuth()

    if(isLoading){
        return <Loading/>
    }

    return(
        <BrowserRouter>
            {signin?.user
            ? <MenuRoutes />
            : <AuthRoutes />
            }
        </BrowserRouter>
    )
}