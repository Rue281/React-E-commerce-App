import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
    let navigate = useNavigate();
    let baseUrl = "https://route-ecommerce.onrender.com";


    let validation = Yup.object({
        email:Yup.string().required().email("enter valid email"),
        newPassword:Yup.string().required().matches(/^[A-Z][a-z0-9!@#$%^&*()_-]{6,16}$/,"enter valid password")
      })
    
    
      let formik = useFormik({
        initialValues:{
          email:"",
          newPassword:"",
        },
        onSubmit:(values)=>{
          console.log(values);
          resetPassword(values);
        },
        validationSchema:validation
      });

      //reset password
      async function resetPassword(dataObj){
        let {data} = await axios.put(`${baseUrl}/api/v1/auth/resetPassword`,dataObj);
        console.log(data);
        //if token is retrieved....navigate to login component
        if(data.token){
            navigate("/login");
        }
      }
  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className='my-3'>
          <label htmlFor="email">email</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name='email'id='email' className='form-control mt-2 bg-transparent text-white'/>
          {formik.touched.email && formik.errors.email? 
           <p className='text-danger'>{formik.errors.email}</p> 
          : ""}
        </div>
        <div className='my-3'>
          <label htmlFor="newPassword">password</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name='newPassword'id='newPassword' className='form-control mt-2 bg-transparent text-white'/>
          {formik.touched.newPassword && formik.errors.newPassword? 
           <p className='text-danger'>{formik.errors.newPassword}</p> 
          : ""}
        </div>
        {/* <Link to="/forgetPassword" className='pe-5'>Forget Password ?</Link>
        {errorMsg !== ""? <div className="alert alert-danger">{errorMsg}</div> : ""}
        
        {loadingSpinner ? <button type="submit" disabled={!formik.isValid} className='btn btn-info'>Login</button> :<button type="button" className='btn btn-info ms-2'>
        <i className="fa-solid fa-spinner fa-spin"></i>
        </button>} */}
        <button type="submit" disabled={!formik.isValid} className='btn btn-info'>Login</button> :<button type="button" className='btn btn-info ms-2'>
        <i className="fa-solid fa-spinner fa-spin"></i>
        </button>
      </form>
    </div>
  )
}
