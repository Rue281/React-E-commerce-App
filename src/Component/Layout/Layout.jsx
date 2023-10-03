import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default function Layout({userData,logOut}) {
  return (
    <div>
      
      <div className="container-fluid d-flex flex-column vh-100">
        <Navbar userData ={userData} logOut={logOut}/>
        <Outlet/>
      </div>
    </div>
  )
}
