import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRouter(props) {
    if(localStorage.getItem("token")){
        return props.children
      }
      else{
        //navigate to login page
        return <Navigate to="/login"/>
      }
  
}