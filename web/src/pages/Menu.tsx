import { Header } from "../components/Header";
import { Filters } from "../components/Filters";
import { Cards } from "../components/Cards";

export function Menu(){
    return(
        <div>
            <Header/>

            <Filters/>

            <Cards/>
        </div>
    )
}