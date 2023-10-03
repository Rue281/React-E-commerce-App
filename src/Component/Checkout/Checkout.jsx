import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { useParams } from 'react-router-dom';

export default function Checkout() {
    /*TODO:
        -form validation
        -loading bar before stripe forwarding 
    */

    let baseUrl = "https://route-ecommerce.onrender.com";
    let {cartId} = useParams();


    let formik = useFormik({
        initialValues:{
            details: "",
            phone:"",
            city:""
        },
        onSubmit:(values)=>{
            console.log(values);
            checkout(values,cartId);
        }
    })

    async function checkout(vals,id){
        let body = {
            shippingAddress:vals
        }
        let headers = {
            token:localStorage.getItem("token")
        }
        console.log(body)
        let {data} = await axios.post(`${baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,body,{headers}).catch(err=>console.log(err));
        console.log(data);
        if(data.status == "success"){
            window.open(data.session.url,"_self")
        }
    }
  return (
    <div>
        <form onSubmit={formik.handleSubmit}>
            <div className='my-2'>
                <label htmlFor="details">Details</label>
                <input onChange={formik.handleChange} type="text" name='details' id='details' className='form-control'/>
            </div>
            <div className='my-2'>
                <label htmlFor="phone">Phone</label>
                <input onChange={formik.handleChange} type="text" name='phone' id='phone' className='form-control'/>
            </div>
            <div className='my-2'>
                <label htmlFor="city">City</label>
                <input onChange={formik.handleChange} type="text" name='city' id='city' className='form-control'/>
            </div>
            <button className='btn btn-success'>Pay</button>
        </form>
    </div>
  )
}
