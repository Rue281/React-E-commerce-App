import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext(null);

export function CartContextProvider(props){
    let baseUrl = "https://route-ecommerce.onrender.com";

    let [cartData,setCartData] = useState();
    const [itemCount, setItemCount] = useState(1);

    useEffect(()=>{
        getAllCartData()
    },[]);
    useEffect(()=>{
        //setItemCount(itemCount)
    },[itemCount]);

    async function getAllCartData(){
        let headers = {token: localStorage.getItem("token")}
        let {data} = await axios.get(`${baseUrl}/api/v1/cart`,{headers});
        console.log(data);
        setCartData(data);
    }

    //remove specific item from shopping cart
    async function removeItem(id){
        let headers = {token: localStorage.getItem("token")}
        let {data} = await axios.delete(`${baseUrl}/api/v1/cart/${id}`,{headers});
        setCartData(data);
    }

    //update item quantity in shopping cart
    async function updateQuantity(id,count){
        let headers = {token: localStorage.getItem("token")};
        let body = {count:count};
        let {data} = await axios.put(`${baseUrl}/api/v1/cart/${id}`,body,{headers});
        console.log(data.data.products);

        setItemCount(count);

        setCartData(data);
        console.log("count in updateQuantity: "+ body.count);
        console.log("itemCount in updateQuantity: "+ itemCount);

    }
    //decrease item quantity
    function decreaseQuantity(id,count){
        count = Math.max(count - 1, 0);
        setItemCount(count);
        //console.log("item count before updateQuantity"+count);
        updateQuantity(id,count);
        //console.log("itemCount after updateQuantity"+itemCount);
    }
    //increase item quantity
    function increaseQuantity(id,count){
        console.log("count before adding: "+ count);
        count = count +1;
        console.log("count after adding: "+ count);
        setItemCount(count);
        updateQuantity(id,count);
        console.log("item count after updateQuantity"+itemCount);
    }
    return <CartContext.Provider value={{cartData,getAllCartData,removeItem,updateQuantity,decreaseQuantity,increaseQuantity,itemCount}}>
        {props.children}
    </CartContext.Provider>
}