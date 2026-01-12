import { Header } from "../components/Header";
import { Filers } from "../components/Filters";
import { Cards } from "../components/Cards";

export function Menu(){
    return(
        <div>
            <Header/>

            <Filers/>

            <Cards/>
        </div>
    )
}