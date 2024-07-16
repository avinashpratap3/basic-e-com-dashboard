import React, { useEffect, useState } from 'react'
import "./Products.css"
import {Link} from "react-router-dom"

function Products() {
    const [products,setproducts]=useState([]);

    

    const getproducts=async()=>{
        let result=await fetch("http://localhost:8000/products",{
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
          }
        });
        result=await result.json();
        setproducts(result);

    }
    useEffect(()=>{
      getproducts();

  },[])
    const deleteproduct=async(id)=>{
      let afterdelete=await fetch(`http://localhost:8000/products/${id}`,{
        method:"Delete",
        headers:{
          authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
      });
      afterdelete=await afterdelete.json()
      if(afterdelete){
        getproducts();

      }
      

    }
    const searchHandle=async (e)=>{
      let key = e.target.value;
      if(key){
        let result =await fetch(`http://localhost:8000/search/${key}`,{
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
          }
        });
      result=await result.json();
      if(result){
        setproducts(result)
      }
      }else{
        getproducts()
      }
    }

  return (
    <div className='product-list'>
      <h3>Product List</h3>
      <input onChange={searchHandle} type="text" placeholder='search product' className='search-box'/>
      <ul>
        <li>
          S.No
        </li>
        <li>
          Name
        </li>
        <li>
        Price
        </li>
        <li>
          Category
        </li>
        <li>
          Company
        </li>
        <li>
          Operation
        </li>
        </ul>
      {
      products.length >0 ? products.map((item,index)=>
        <ul key={item._id}>
        <li>
          {index+1}
        </li>
        <li>
          {item.name}
        </li>
        <li>
        {item.price}
        </li>
        <li>
          {item.category}
        </li>
        <li>
          {item.company}
        </li>
        <li>
          <button onClick={()=>deleteproduct(item._id)}>Delete</button>
          <Link to={`/update/${item._id}`}>Update</Link>
        </li>
        </ul>
      ):
      <h1>No result found</h1>
      }
        

      
      
    

    

    </div>
    
  )
}

export default Products