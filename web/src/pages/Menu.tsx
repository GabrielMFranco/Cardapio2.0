import { Header } from "../components/Header";
import { Filters } from "../components/Filters";
import { Cards } from "../components/Cards";
import { useEffect, useState } from "react";
import { api } from "../services/api";

export function Menu(){
    const [ cards, setCards ] = useState([])
    const [selectedCategories, _setSelectedCategories] = useState<string[]>([]);

    async function fetchDrinks(category: string[] = []) {
        try {
            const response = await api.get("/menu", {
                params: {
                    categories: category.length > 0 ? JSON.stringify(category) : undefined
                }
            });

            const formattedDrinks = response.data.map((drink: any) => ({
                ...drink,
                ingredients: typeof drink.ingredients === "string"
                    ? JSON.parse(drink.ingredients)
                    : drink.ingredients,
                img: `${api.defaults.baseURL}/uploads/${drink.img}`
            }));

            setCards(formattedDrinks);
        } catch (error) {
            console.error("Erro ao carregar drinks:", error);
        }
    }

    useEffect(() => {
        fetchDrinks();
    }, []);

    return(
        <div>
            <Header/>

            <Filters selected={selectedCategories} onFilterChange={(ids) => fetchDrinks(ids)}/>

            <Cards data={cards} onRefresh={() => fetchDrinks()}/>
        </div>
    )
}