import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import * as Yup from 'yup'
import loginBanner from '../../assets/login-banner.jpg'
import '../Login/Login.css'
import '../Login/LoginResponsive.css'

export default function Login({saveUserData}) {

  let [errorMsg, setErrorMsg]=useState("");
  let [loadingSpinner, setLoadingSpinner]=useState(true);

  //let baseUrl = "https://route-ecommerce.onrender.com";
  // let baseUrl = "https://route-ecommerce-app.vercel.app"
  let baseUrl = "https://ecommerce.routemisr.com"


  //programming navigation
  let navigate = useNavigate()

  let validation = Yup.object({
    email:Yup.string().required().email("enter valid email"),
    password:Yup.string().required().matches(/^[A-Z][a-z0-9!@#$%^&*()_-]{6,16}$/,"enter valid password")
  })


  let formik = useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    onSubmit:(values)=>{
      console.log(values);
      sendLoginData(values);
    },
    validationSchema:validation
  })

  //send userObj to API (Registration)
  async function sendLoginData(values){
    // let response
    setLoadingSpinner(false);
    let {data} = await axios.post(`${baseUrl}/api/v1/auth/signin`,values).catch(error =>{setLoadingSpinner(true);
      console.log(error);
    // console.log(error.response.data.message);
    // setErrorMsg(error.response.data.message)
  });
    console.log(data);
    setLoadingSpinner(true);
    if(data.message === "success"){
      
      //save user's data
      saveUserData(data.user);
      //save token
      localStorage.setItem("token",data.token);
      //navigate to Home
      navigate("/home")
    }
  }


  return (
    <div className='row'>
      <div className="col-lg-6 banner">
        {/* <img src={loginBanner} className='img-fluid' alt="woman model" /> */}
      </div>
      <div className="col-lg-6 login-form pt-lg-5 px-lg-5">
        <h1>Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className='my-3'>
            <label htmlFor="email">email</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name='email'id='email' className='form-control mt-2 bg-transparent'/>
            {formik.touched.email && formik.errors.email? 
            <p className='text-danger'>{formik.errors.email}</p> 
            : ""}
          </div>
          <div className='my-3'>
            <label htmlFor="password">password</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name='password'id='password' className='form-control mt-2 bg-transparent'/>
            {formik.touched.password && formik.errors.password? 
            <p className='text-danger'>{formik.errors.password}</p> 
            : ""}
          </div>
          <div className='my-3 text-end'>
          <Link to="/forgetPassword" className='pe-3'>Forget Password ?</Link>
          </div>
          {errorMsg !== ""? <div className="alert alert-danger">{errorMsg}</div> : ""}
          
          {loadingSpinner ? <button type="submit" disabled={!formik.isValid} className='btn my-3 px-4'>Login</button> :<button type="button" className='btn ms-2'>
          <i className="fa-solid fa-spinner fa-spin"></i>
          </button>}
        </form>
      </div>
    </div>
  )
}
