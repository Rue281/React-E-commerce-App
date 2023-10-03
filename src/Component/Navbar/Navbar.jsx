import React, { useContext } from 'react'
import {Link, NavLink} from 'react-router-dom'
import {CartContext} from '../../Context/CartContext'
import '../Navbar/Navbar.css'

export default function Navbar({userData,logOut}) {
  let {cartData,removeItem,updateQuantity} = useContext(CartContext);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container">
      <Link className="navbar-brand fw-bolder" to="/">Noxe</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {userData ?
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          
          <li className="nav-item">
            <NavLink className={({isActive})=> isActive == true ? "nav-link active": "nav-link"} to="home">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({isActive})=> isActive == true ? "nav-link active": "nav-link"} to="categories">Categories</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({isActive})=> isActive == true ? "nav-link active": "nav-link"} to="brands">Brands</NavLink>
          </li>
          
        </ul> : ""}
          
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        
        {userData ? 
        <>
          <li className="nav-item py-2">
          <i className="fa-brands fa-facebook mx-2 cursor"></i>
          <i className="fa-brands fa-twitter mx-2 cursor"></i>
          <i className="fa-brands fa-spotify mx-2 cursor"></i>
          <i className="fa-brands fa-linkedin mx-2 cursor"></i>
          </li>
          <li className="nav-item">
            <NavLink className={({isActive})=> isActive == true ? "nav-link active": "nav-link"} to="profile">Profile</NavLink>
          </li>
          <li className='py-2'>
            <NavLink to={"wishlist/"}>
            <i className="fa-regular fa-heart fa-xl mx-2 cursor"></i></NavLink>
          </li>
          <li className="nav-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
            <span className='nav-link cursor' to="CartDetails">
              <span className="position-relative">
                <i className='fa-solid fa-shopping-cart'></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                  {cartData?.numOfCartItems}
                </span>
              </span>
            </span>
          </li>

          <li className="nav-item">
            <span className='nav-link text-white cursor' onClick={logOut}>Logout</span>
          </li>
          </> : 
          <>
          <li className="nav-item">
            <NavLink className={({isActive})=> isActive == true ? "nav-link active": "nav-link"} to="login">Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({isActive})=> isActive == true ? "nav-link active": "nav-link"} to="/">Register</NavLink>
          </li>
          </>
          }
          
        </ul>
      </div>
    </div>
      </nav>

  <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div className="offcanvas-header">
      <h5 className="offcanvas-title" id="offcanvasRightLabel">Cart Details</h5>
      <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div className="offcanvas-body">
      {cartData? 
        cartData.data.products.map((el,i)=>{
          return <div key={i} className='border-dash py-2'>
          <div className="d-flex justify-content-between align-items-center">
            <img src={el.product.imageCover} className='w-25'height={100} alt="" />
            <div>
            <button className='btn btn-sm rounded cursor btn-decrease' onClick={()=>{updateQuantity(el.product._id,el.count-=1)}}>-</button>
            <span className='mx-4 quantity-count'>{el.count}</span>
            <button className='btn btn-success btn-sm rounded cursor'onClick={()=>{updateQuantity(el.product._id,el.count+=1)}} >+</button>
            </div>
            <div>
              <i className='fa-solid fa-trash text-danger cursor'onClick={()=>{removeItem(el.product._id)}}></i>
            </div>
            </div>
            <h5>{el.product.title}</h5>
          
        </div>
        })
      :""}
    </div>
    <div className='offcanvas-bottom'>
    <Link to="/home" className='btn w-100'>Add More Items</Link>
      <Link to={"/checkout/"+ cartData?.data?._id} className='btn w-100 mt-3'>Checkout</Link>
      
    </div>
  </div>
</>
  )
}
