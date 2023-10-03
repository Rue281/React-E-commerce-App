import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

export let CategoriesDataContext = createContext(null);
export function CategoriesDataContextProvider(props){

    let baseUrl = "https://ecommerce.routemisr.com";
    let [categoriesList,setCategoriesList] = useState([]);
    useEffect(()=>{
        getCategories();
    },[]);
    async function getCategories(){
        let{data} = await axios.get(`${baseUrl}/api/v1/categories`);
        console.log(data.data);
        setCategoriesList(data.data);
    }


    return <CategoriesDataContext.Provider value={{categoriesList}}>
        {props.children}
    </CategoriesDataContext.Provider>
}