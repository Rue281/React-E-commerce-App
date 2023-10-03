import React, { useEffect, useState } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import Layout from './Component/Layout/Layout'
import Home from './Component/Home/Home.tsx'
import Login from './Component/Login/Login'
import Register from './Component/Register/Register'
import Profile from './Component/Profile/Profile.jsx'
import NotFound from './Component/NotFound/NotFound'
import ProtectedRouter from './Component/ProtectedRouter/ProtectedRouter';
import ForgetPassword from './Component/ForgetPassword/ForgetPassword';
import ResetPassword from './Component/ForgetPassword/ResetPassword';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import Categories from './Component/Categories/Categories';
import { CategoriesDataContextProvider } from './Context/CategoriesDataStore';
import { CartContextProvider } from './Context/CartContext';
import CartDetails from './Component/CartDetails/CartDetails';
import Checkout from './Component/Checkout/Checkout';
import Brands from './Component/Brands/Brands';
import Wishlist from './Component/Wishlist/Wishlist';
import { WishlistContextProvider } from './Context/WishlistContext';




export default function App() {
  //to send data from register & login to profile component
  let[userData,setUserData] = useState(null);

  useEffect(()=>{
    if(localStorage.getItem("token")){
      let decodedData = jwt_decode(localStorage.getItem("token"));
      setUserData(decodedData);
      console.log(decodedData);
    }
  },[]);

  function saveUserData(data){
    console.log(data);
    setUserData(data);
  }
  function logOut(){
    localStorage.removeItem("token");
    setUserData(null); 
    return <Navigate to="/login"/>

  }

  //guard routing
  // function ProtectedRouter(props){
  //   if(localStorage.getItem("token")){
  //     return props.children
  //   }
  //   else{
  //     //navigate to login page
  //     return <Navigate to="/login"/>
  //   }
  // }

  //guard routing
  //for registration only
  function ProtectedRouting2(props){
    if(localStorage.getItem("token")!=null){
      return <Navigate to="/home"/>
    }
    else{
      return props.children 
    }
  }

  let routes = createBrowserRouter([
    {path:"/",element:<Layout userData = {userData} logOut={logOut}/> ,children:[
      {path:"home", element:<ProtectedRouter><Home/></ProtectedRouter>},
      {path:"productDetails/:id", element:<ProtectedRouter><ProductDetails/></ProtectedRouter>},
      {path:"brands", element:<ProtectedRouter><Brands/></ProtectedRouter>},
      {path:"categories", element:<ProtectedRouter><Categories/></ProtectedRouter>},
      {path:"wishlist", element:<ProtectedRouter><Wishlist/></ProtectedRouter>},
      {path:"CartDetails", element:<ProtectedRouter><CartDetails/></ProtectedRouter>},
      {path:"checkout/:cartId", element:<ProtectedRouter><Checkout/></ProtectedRouter>},
      {path:"login", element:<Login saveUserData={saveUserData}/>},
      {path:"profile", element:<ProtectedRouter><Profile userData = {userData}/></ProtectedRouter>},
      {path:"forgetPassword", element:<ForgetPassword/>},
      {path:"resetPassword", element:<ResetPassword/>},
      {index:true, element:<ProtectedRouting2><Register/></ProtectedRouting2>},
      // {index:true, element:<Register saveUserData={saveUserData}/>},
      {path:"*", element:<NotFound/>}
    ]}
  ]);

  return (
    <WishlistContextProvider>
    <CartContextProvider>
    <CategoriesDataContextProvider>
    <RouterProvider router={routes}/>
    </CategoriesDataContextProvider>
    </CartContextProvider>
    </WishlistContextProvider>
  )
}
