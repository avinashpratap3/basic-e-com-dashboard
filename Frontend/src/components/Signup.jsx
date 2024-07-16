import React, { useState,useEffect } from 'react'
import "./Signup.css"
import {useNavigate} from "react-router-dom"


function Signup() {
    const [name,setname]=useState("")
    const [password,setpassword]=useState("")
    const [email,setemail]=useState("")
    const navigate=useNavigate();
    

    useEffect(()=>{
        
        const auth=localStorage.getItem("user");
        if(auth){
            navigate("/")
        }

    })


    const collectdata=async ()=>{
        let result=await fetch("http://localhost:8000/signup",{
            method:"post",
            body:JSON.stringify({name,email,password}),
            headers:{
                "Content-Type": "application/json"
            }
        })
        result=await result.json();
        localStorage.setItem("user",JSON.stringify(result));
        if(result){
            navigate("/")
        }

        
    }


  return (
    <div className='register'>
        <h1>Register</h1>
        <input className='inputbox' type="text" placeholder='enter name' value={name} onChange={(e)=>(setname(e.target.value))} />
        <input className='inputbox' type="text" placeholder='enter email' value={email} onChange={(e)=>(setemail(e.target.value))}/>
        <input className='inputbox' type="password"  placeholder='enter password' value={password} onChange={(e)=>(setpassword(e.target.value))}/>
        <button onClick={collectdata} className='signup-btn'>SignUp</button>


    </div>
  )
}

export default Signup