import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Addproduct.css"
function Addproduct() {
    const [name,setname]=useState("")
    const [price,setprice]=useState("")
    const [category,setcategory]=useState("")
    const [company,setcompany]=useState("")
    const [error,seterror]=useState(false)
    const navigate=useNavigate()


    const addproduct=async()=>{

        if(!name || !price || !category || !company){
            seterror(true)
            return false;
        }

        const userid =JSON.parse(localStorage.getItem("user"))._id;
        let result=await fetch("http://localhost:8000/add-product",{
            method:"post",
            body:JSON.stringify({name,price,category,company,userid}),
            headers:{
                "Content-Type":"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`

            }

        });
        result =await result.json()
        navigate("/")

    }



  return (
    <div className='products'>
        <h1>Add Product</h1>
        <input type="text" className='inputbox' value={name} onChange={(e)=>(setname(e.target.value))} placeholder='enter name of the product' />
        {error&& !name && <span className='spa-err'>Enter valid name</span>}
        <input type="text" className='inputbox' value={price} onChange={(e)=>(setprice(e.target.value))} placeholder='enter price of the product' />
        {error && !price && <span className='spa-err'>Enter valid price</span>}


        <input type="text" className='inputbox' value={category} onChange={(e)=>(setcategory(e.target.value))} placeholder='enter category of the product' />
        {error && !category && <span className='spa-err'>Enter valid category</span>}

        <input type="text" className='inputbox' value={company} onChange={(e)=>(setcompany(e.target.value))} placeholder='enter company of the product' />
        {error && !company && <span className='spa-err'>Enter valid company</span>}

        <button onClick={addproduct} className='addbtn'>Add product</button>
    </div>
  )
}

export default Addproduct