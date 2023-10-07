import React, { useContext, useEffect, useState } from 'react'
import emptyCartImg from '../../assets/emptyCart-removebg-preview.png'
// import emptyCartImg from '../../assets/background-removebg-preview.png'
import '../Wishlist/Wishlist.css'
import '../Wishlist/WishlistResponsive.css'

import { Link, useParams } from 'react-router-dom';
import { WishlistContext } from '../../Context/WishlistContext';

export default function Wishlist() {
    //to recieve id from url
  // let {id} = useParams();
  // console.log(id);
  let {getUserWishlist,favouriteProductsList,parsedData,removeProductFromWishlist} = useContext(WishlistContext);
  useEffect(()=>{
    getUserWishlist();
    console.log(favouriteProductsList)
  },[favouriteProductsList]);


  
    
  return (
    // <div className="container-fluid d-flex vh-100">
    <div className='wishlist row justify-content-center'>
      {favouriteProductsList?.length>0 ? 

      <div className="col-12 table-container d-flex flex-column justify-content-center ">
        <h1 className='ms-5'>Wishlist</h1>
        <table style={{verticalAlign:'middle'}} className='table table-hover  my-3 text-center m-auto mt-5'>
          {/* <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead> */}
          <tbody>
            {favouriteProductsList.map((el,i)=>{
              return <tr key={i}>
              <td>
                <i className='fa-solid fa-xmark fa-xl text-danger cursor' onClick={(e)=>{removeProductFromWishlist(e.target,el.id)}}></i>
              </td>
              <td>
                <img src={el.imageCover} className='w-75' height={100} alt=''/>
              </td>
              <td>
                <h5 className='title'>{el.title}</h5>
                <h5><span className='brand'>Brand : </span>{el.brand.name}</h5>
                <h5><span className='category'>Category : </span>{el.category.name}</h5>
              </td>

              <td>{el.price}EGP</td>
              <td>
              <Link to={"/productDetails/"+el.id}>
              <button className='btn btn-info px-4 w-100'>Explore Now!</button>
            </Link>
              </td>
            </tr>
            })}
          </tbody>
        </table>
      </div>
        :
        <div className="col-12 d-flex justify-content-center mt-5 vh-100">
            <div>
            <img className='emptyCart' src={emptyCartImg} alt=""/>
            <h2 className='text-center'>Your Wishlist Is Empty Now</h2>
            </div>
            
        </div>

        
       
        }
        
    </div>
    // </div>
  )
}



