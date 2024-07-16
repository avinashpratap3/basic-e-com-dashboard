import React, { useEffect, useState } from 'react'
import "./Login.css"
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const navigate =useNavigate();
  useEffect(()=>{
    const auth=localStorage.getItem("user");
    if(auth){
      navigate("/")
    }
  },[])


  const handlelogin=async ()=>{
    let result=await fetch("http://localhost:8000/login",{
      method:"post",
      body:JSON.stringify({email,password}),
      headers:{
          "Content-Type": "application/json"
      }
  });
  result =await result.json();
  if(result.auth){
    localStorage.setItem("user",JSON.stringify(result.user));
    localStorage.setItem("token",JSON.stringify(result.auth));

    navigate("/")
    

  }else{
    alert("please enter correct detail")
  }
}
  return (
    <div>
      <input className='inputbox' type="text" placeholder='enter email' value={email} onChange={(e)=>(setemail(e.target.value))} />
      <input className='inputbox' type="password" placeholder='enter password' value={password} onChange={(e)=>(setpassword(e.target.value))}/>
      <button className='loginbtn' onClick={handlelogin} type='button'>Login</button>

    </div>
  )
}

export default Login