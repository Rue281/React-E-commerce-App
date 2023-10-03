import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function Register({saveUserData}) {

  let [errorMsg, setErrorMsg]=useState("");
  let [loadingSpinner, setLoadingSpinner]=useState(true);

  //let baseUrl = "https://route-ecommerce.onrender.com";
  let baseUrl = "https://route-ecommerce-app.vercel.app"

  //programming navigation
  let navigate = useNavigate()

  let validation = Yup.object({
    name:Yup.string().required().min(2,"min chars is 2").max(7,"max chars is 10"),
    email:Yup.string().required().email("enter valid email"),
    phone:Yup.string().required().matches(/^01(2|1|0|5)[0-9]{8}$/,"enter valid phone number"),
    password:Yup.string().required().matches(/^[A-Z][a-z0-9!@#$%^&*()_-]{6,16}$/,"enter valid password"),
    rePassword:Yup.string().oneOf([Yup.ref("password")],"password is not matched")
  })


  let formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },
    onSubmit:(values)=>{
      console.log(values);
      sendRegisterData(values);
    },
    validationSchema:validation
  })

  //send userObj to API (Registration)
  async function sendRegisterData(values){
    // let response
    setLoadingSpinner(false);
    let {data} = await axios.post(`${baseUrl}/api/v1/auth/signup`,values).catch(error =>{setLoadingSpinner(true);
      console.log(error);
    console.log(error.response.data.errors.msg);
    setErrorMsg(error.response.data.errors.msg)});
    console.log(data);
    if(data.message === "success"){
      setLoadingSpinner(true);
      //save user's data
      saveUserData(data.user);
      //save token
      localStorage.setItem("token",data.token);
      //navigate to Login
      navigate("/login")
    }
  }


  return (
    <div>
      <h1>Registration Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className='my-3'>
          <label htmlFor="name">name</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name='name'id='name' className='form-control mt-2 bg-transparent text-white'/>
          {formik.touched.name && formik.errors.name? 
           <p className='text-danger'>{formik.errors.name}</p> 
          : ""}
          
        </div>
        <div className='my-3'>
          <label htmlFor="email">email</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name='email'id='email' className='form-control mt-2 bg-transparent text-white'/>
          {formik.touched.email && formik.errors.email? 
           <p className='text-danger'>{formik.errors.email}</p> 
          : ""}
        </div>
        <div className='my-3'>
          <label htmlFor="password">password</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name='password'id='password' className='form-control mt-2 bg-transparent text-white'/>
          {formik.touched.password && formik.errors.password? 
           <p className='text-danger'>{formik.errors.password}</p> 
          : ""}
        </div>
        <div className='my-3'>
          <label htmlFor="rePassword">repassword</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name='rePassword'id='rePassword' className='form-control mt-2 bg-transparent text-white'/>
          {formik.touched.rePassword && formik.errors.rePassword? 
           <p className='text-danger'>{formik.errors.rePassword}</p> 
          : ""}
        </div>
        <div className='my-3'>
          <label htmlFor="phone">phone</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name='phone'id='phone' className='form-control mt-2 bg-transparent text-white'/>
          {formik.touched.phone && formik.errors.phone? 
           <p className='text-danger'>{formik.errors.phone}</p> 
          : ""}
        </div>
        {errorMsg !== ""? <div className="alert alert-danger">{errorMsg}</div> : ""}
        
        {loadingSpinner ? <button type="submit" disabled={!formik.isValid} className='btn btn-info'>Register</button> :<button type="button" className='btn btn-info ms-2'>
        <i className="fa-solid fa-spinner fa-spin"></i>
        </button>}
        
        
        
      </form>
    </div>
  )
}
