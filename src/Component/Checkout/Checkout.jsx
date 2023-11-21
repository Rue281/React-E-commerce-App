import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import * as Yup from 'yup'

export default function Checkout() {
    /*TODO:
        -form validation //Done
        -loading bar before stripe forwarding 
    */

    //let [errorMsg, setErrorMsg]=useState("");
    let [loadingSpinner, setLoadingSpinner]=useState(true);

    let baseUrl = "https://route-ecommerce.onrender.com";
    //let baseUrl = "https://ecommerce.routemisr.com"

    let {cartId} = useParams();

    let validation = Yup.object({

        AddressDetails:Yup.string().required("Address is a required field").matches(/^[a-zA-Z0-9\s,'-]*$/,"enter a valid address"),
        phone:Yup.string().required().matches(/^01(2|1|0|5)[0-9]{8}$/,"enter valid phone number"),
        city:Yup.string().required().matches(/^[Aa-zZ]*$/,"enter valid city")
    });

    let formik = useFormik({
        initialValues:{
            AddressDetails: "",
            phone:"",
            city:""
        },
        onSubmit:(values)=>{
            console.log(values);
            checkout(values,cartId);
        },
        validationSchema:validation
    })

    async function checkout(vals,id){
        let body = {
            shippingAddress:vals
        }
        let headers = {
            token:localStorage.getItem("token")
        }
        console.log(body);
        setLoadingSpinner(false);
        let {data} = await axios.post(`${baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,body,{headers}).catch(err=>console.log(err));
        console.log(data);
        setLoadingSpinner(true);
        if(data.status == "success"){
            window.open(data.session.url,"_self")
        }
    }
  return (
    <div>
        <form onSubmit={formik.handleSubmit}>
            <div className='my-2'>
                <label htmlFor="AddressDetails">Address</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name='AddressDetails' id='AddressDetails' className='form-control'/>
                {formik.touched.AddressDetails && formik.errors.AddressDetails? 
                <p className='text-danger'>{formik.errors.AddressDetails}</p> 
                : ""}
            </div>
            <div className='my-2'>
                <label htmlFor="phone">Phone</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name='phone' id='phone' className='form-control'/>
                {formik.touched.phone && formik.errors.phone? 
                <p className='text-danger'>{formik.errors.phone}</p> 
                : ""}
            </div>
            <div className='my-2'>
                <label htmlFor="city">City</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name='city' id='city' className='form-control'/>
                {formik.touched.city && formik.errors.city? 
                <p className='text-danger'>{formik.errors.city}</p> 
                : ""}
            </div>
            {loadingSpinner ? <button type="submit" disabled={!formik.isValid}  className='btn btn-success'>Pay</button> : 
            <button type="button" className='btn ms-2'> <i className="fa-solid fa-spinner fa-spin"></i></button>} 
        </form>
    </div>
  )
}
