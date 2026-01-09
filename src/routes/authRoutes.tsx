import { Routes, Route } from "react-router"
import { SignIn } from "../pages/SignIn"
import { NotFound } from "../pages/NotFound"
import { Menu } from "../pages/Menu"

export function AuthRoutes(){
    return(
        <Routes>
            <Route path="/" element={<SignIn/>}/>
            <Route path="/menu" element={<Menu/>}/>

            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}