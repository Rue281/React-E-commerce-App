import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';


export let WishlistContext = createContext(null);

export function WishlistContextProvider(props){


    let [favouriteList, setFavouriteList] = useState([]);
    let [isFavourite, setIsFavourite] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    let [parsedData, setParsedData] = useState([])


    let baseUrl = "https://ecommerce.routemisr.com";

    useEffect(()=>{
        getUserWishlist()
    },[]);

    useEffect(() => {
        //localStorage.setItem('myfavouriteList', JSON.stringify(favouriteList))
      }, [favouriteList,parsedData])

    function getInitialState() {
        const favouriteList = localStorage.getItem('myfavouriteList')
        //console.log(Array.isArray(favouriteList));
        console.log(typeof(favouriteList));
        return favouriteList ? JSON.parse(favouriteList) : []
      }

    

    //get logged-user wishlist
    async function getUserWishlist(){
        let {data} = await axios.get(`${baseUrl}/api/v1/wishlist`,{headers:{token:localStorage.getItem("token")}});
        //console.log(data.data);

        //data.data?.map(el=>{console.log(el._id)});

        
        
        //let savedfavorite= JSON.parse(localStorage.getItem("myfavouriteList"));
        
        //console.log(favouriteList);
        //console.log(data.data);
        //console.log(savedfavorite);
        //setFavouriteList(savedfavorite);
        setFavouriteList(data.data);
        localStorage.setItem("myfavouriteList",JSON.stringify(favouriteList));
        setParsedData(JSON.parse(localStorage.getItem("myfavouriteList")));
        //let savedfavorite= JSON.parse(localStorage.getItem("myfavouriteList"));
        //console.log(Array.isArray(parsedData));
        // console.log(Array.isArray(favouriteList));
        //console.log(savedfavorite);
    }

    //add product to wishlist
    async function AddToWishlist(el,id){
        let body ={
            productId : id
        }
    
         let{data} = await axios.post(`${baseUrl}/api/v1/wishlist`,body,{headers:{token:localStorage.getItem("token")}});
         
                console.log("sucssedeeeed");
                el.classList.remove("fa-regular");
                el.classList.add("fa-beat");
                el.classList.add("Remonda");  // fa-solid
                el.classList.add("fa-solid");
                el.style.animationIterationCount = '1';
                console.log(`id is: ${id}`);
                console.log(data.data);

                //el.setIsFavourite(true);
        
                //setFavouriteList(data.data);
                //localStorage.setItem("myfavouriteList", JSON.stringify(favouriteList));
                //el.setAttribute('fav', 'true');

        //console.log(`favouriteList in adding: ${favouriteList}`);        
    }

    //remove product from wishlist
    async function removeProductFromWishlist(el,id){
         
            let{data} = await axios.delete(`${baseUrl}/api/v1/wishlist/${id}`,{headers:{token:localStorage.getItem("token")}});
            console.log(data);
                    
                // el.classList.remove("fa-solid");
                // el.classList.add("fa-regular");
                // el.classList.remove("fa-beat");
                // el.style.cssText = 'animation-iteration-count:0';

            //setFavouriteList(data.data);
            //localStorage.setItem("myfavouriteList",JSON.stringify(favouriteList));

            
            console.log(`favouriteList in removing: ${favouriteList}`);
            //el.setAttribute('fav', 'false');
            

            
            
             
    }

    
    

    return <WishlistContext.Provider value={{getUserWishlist,favouriteList, AddToWishlist,removeProductFromWishlist,isFavourite,setFavouriteList,parsedData}}>
        {props.children}
        </WishlistContext.Provider>
}

