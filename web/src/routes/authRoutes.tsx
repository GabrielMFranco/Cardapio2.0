import { Routes, Route } from "react-router"
import { SignIn } from "../pages/SignIn"
import { NotFound } from "../pages/NotFound"

export function AuthRoutes(){
    return(
        <Routes>
            <Route path="/" element={<SignIn/>}/>

            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}