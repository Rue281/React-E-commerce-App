import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import $ from 'jquery'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '../ProductDetails/ProductDetails.css'
import { CartContext } from '../../Context/CartContext';


export default function ProductDetails() {
  //to recieve id from url
  let {id} = useParams();
  console.log(id);
  let navigate = useNavigate();

  let baseUrl = "https://ecommerce.routemisr.com";
  /*let [ProductDetails,setProductDetails] = useState({});*/
  let {itemCount} = useContext(CartContext)

  let [ProductDetails,setProductDetails] = useState();

  useEffect(()=> {
    getProductDetails()
  },[]);

  async function getProductDetails(){
    let {data} = await axios.get(`${baseUrl}/api/v1/products/${id}`);
    console.log(data.data);
    setProductDetails(data.data);
    //console.log(ProductDetails);
    $(".loading").fadeOut(2000)
  }

  //add item to cart API
  async function addItemToCart(id){
    // itemCount++;
    let body = {
      productId : id
    }
    console.log(itemCount);

    let {data} = await axios.post(`${baseUrl}/api/v1/cart`,body,{headers:{token:localStorage.getItem("token")}});
    console.log(data);
    
    if(data.status == "success"){
      //navigate to cartDetails
      navigate('/CartDetails')
    }
  }
  
  return (
    <>
      <div style={{display: 'flex'}} className="loading position-fixed top-0 bottom-0 start-0 end-0 align-items-center justify-content-center">
      <i className="fa-solid fa-spinner fa-spin fa-4x"></i>
      </div>
      {ProductDetails? <div className='row py-5 gap-5'>
        <div className="col-md-4">
          {/* create spinner before data is loaded */}
          <OwlCarousel className='owl-theme' loop items={1}>
        {ProductDetails.images.map((el,i)=>{
            return <div key={i}>
                <img src={el} alt="" />
            </div>
        })}
        </OwlCarousel>

        </div>
        <div className="col-md-6 px-md-5">
          <h2>{ProductDetails?.title}</h2>
          <p className='text-muted'>{ProductDetails.description}</p>
          <span className='text-category'>{ProductDetails.category?.name}</span>
          <div className="d-flex justify-content-between mt-2">
              <p>{ProductDetails.price}EGP</p>
              <div>
              <i className='fa-solid fa-star text-warning'></i>{ProductDetails.ratingsAverage}
              </div>
          </div>
          <button className='btn  w-100 btn-info px-4' onClick={()=>{addItemToCart(ProductDetails._id)}}>+add to cart</button>
          

        </div>
      </div> : ""}
      
    </>
  )
}
