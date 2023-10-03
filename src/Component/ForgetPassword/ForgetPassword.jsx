import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function ForgetPassword() {
    let navigate = useNavigate();
    let[verifyCode,setVerifyCode] = useState(true);
    let[errorMsg,setErrorMsg] = useState("");

    let baseUrl = "https://route-ecommerce.onrender.com";


    let validationSchema = Yup.object({
        email:Yup.string().required().email("enter a valid email")
    });

    let Form1 = useFormik({
        initialValues:{
            email:""
        },
        onSubmit: (values)=>{
            console.log(values);
            sendEmailMessage(values)
        },
        validationSchema
    });
    //send code to email
    async function sendEmailMessage(dataObj){
        let {data} = await axios.post(`${baseUrl}/api/v1/auth/forgotPasswords`,dataObj);
        if(data.statusMsg === "success"){
            //show 2nd form
            setVerifyCode(false);
        }
        console.log(data);
    }

    ///for 2nd form
    // let validationSchema = Yup.object({
    //     email:Yup.string().required().email("enter a valid email")
    // });

    let Form2 = useFormik({
        initialValues:{
            resetCode:""
        },
        onSubmit: (values)=>{
            console.log(values);
            verifyResetCode(values)
        },
        //validationSchema
    });

    //send email code
    async function verifyResetCode(dataObj){
        let {data} = await axios.post(`${baseUrl}/api/v1/auth/verifyResetCode`,dataObj).catch(error => {
            console.log(error.response.data.message)
            setErrorMsg(error.response.data.message)
        });
        // if(data.statusMsg === "success"){
        //     //show 2nd form
        //     //setVerifyCode(false);
        // }
        console.log(data);
        if(data.status === "Success"){
            //navigate to resetpassword component
            navigate("/resetPassword");
        }
    }


  return (
    <div>
        {verifyCode ? <form onSubmit={Form1.handleSubmit}>
            <div className="">
                <label htmlFor="Email">Email</label>
                <input onChange={Form1.handleChange} type="Email" name='email' id='Email' className='form-control bg-transparent text-white'/>
                <button className='btn btn-info mt-4'>Send Code ?</button>
            </div>
        </form> : 
        <form onSubmit={Form2.handleSubmit}>
        <div className="">
            <label htmlFor="resetCode">Reset code</label>
            <input onChange={Form2.handleChange} type="text" name='resetCode' id='resetCode' className='form-control bg-transparent text-white'/>
            {errorMsg ? <div className="alert alert-danger mt-4">
                {errorMsg}
            </div>: ""}
            
            <button className='btn btn-info mt-4'>Verify Code</button>
        </div>
    </form>
    }
        

        
    </div>
  )
}
