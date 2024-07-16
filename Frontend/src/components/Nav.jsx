import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Nav.css'

const Nav=()=>{
    const auth=localStorage.getItem("user");
    const navigate =useNavigate();

    const logout=()=>{
        localStorage.clear();
        navigate("/signup")
    }
    return (
        <div className="nav">
            <img className="logo" src="https://dynamic.design.com/asset/logo/09801b1a-b7f1-4140-9c24-687ca2254a87/logo-search-grid-2x?logoTemplateVersion=2&v=638222260716470000&text=Sona+pvt+lmt" alt="logo" />
           {auth ?  <ul>
                <li>
                    <Link to="/">Home</Link>
                    </li>
                    <li>
                    <Link to="/add">Add Product</Link>

                    </li>
                    {/* <li>
                    <Link to="/update">Update Product</Link>

                    </li> */}
                   
                    <li>
                    <Link to="/profile">Profile</Link>

                    </li>
                    
                         <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
                       
                    
                    
                    
                    
                
            </ul>:
            <>
            <ul className="nav"id="nav-right">
            <li><Link to="/signup">SignUp</Link></li>
            <li><Link to="/login">Login</Link></li>
            

            </ul>
            
            </>
            }
        </div>
    )
}

export default Nav;