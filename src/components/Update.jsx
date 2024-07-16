import React, { useEffect, useState } from 'react'
import "./Update.css"
import { useParams,useNavigate } from 'react-router-dom';

function Update() {
    const [name,setname] =useState("");
    const [price,setprice] =useState("");
    const [category,setcategory] =useState("");
    const [company,setcompany] =useState("");
    const params=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
       getproductdetails();
    },[])
    const getproductdetails=async ()=>{
        let result= await fetch(`http://localhost:8000/update/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
              }
        });
        result=await result.json();
        setname(result.name)
        setprice(result.price)
        setcategory(result.category)
        setcompany(result.company)




    }
   

    const UpdateProduct=async()=>{
        let result= await fetch(`http://localhost:8000/products/${params.id}`,{
            method:"Put",
            body: JSON.stringify({name,price,category,company}),
            headers:{
                "Content-Type":"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`

            }
        });
        result=result.json()
        navigate('/')


    }



  return (
    <div className='update-pro'>
        <h1>Update Product</h1>
        <input type="text" placeholder='Enter product name' className='inputbox' value={name} onChange={(e)=>{setname(e.target.value)}}/>
        <input type="text" placeholder='Enter product price' className='inputbox' value={price} onChange={(e)=>{setprice(e.target.value)}}/>
        <input type="text" placeholder='Enter product category' className='inputbox' value={category} onChange={(e)=>{setcategory(e.target.value)}}/>
        <input type="text" placeholder='Enter product company' className='inputbox' value={company} onChange={(e)=>{setcompany(e.target.value)}}/>
        <button onClick={UpdateProduct} className='appbtn'>Update</button>



    </div>
  )
}

export default Update