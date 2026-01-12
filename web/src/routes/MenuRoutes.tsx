import { Routes, Route } from "react-router";
import { Menu } from "../pages/Menu";
import { NotFound } from "../pages/NotFound";

export function MenuRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Menu/>}/>

            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}