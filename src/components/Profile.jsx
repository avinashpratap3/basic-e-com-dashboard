import React from 'react'
import "./Profile.css"

function Profile() {
    const auth=localStorage.getItem("user");
  return (
    <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    
<div className="card">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXZ3IntbJ5izhGtL3CiU1sw8hDM4sh3Bxumw&s" alt="John" style={{width:"100%"}}/>
  <h1>({JSON.parse(auth).name})</h1>
  <p className="title">({JSON.parse(auth).email})</p>
  <p>Seller</p>
 
  <a href="https://github.com/avinashpratap3"><i className="fa fa-github"></i></a>
  <a href="https://www.linkedin.com/in/avinash-pratap-singh-75419a222?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"><i className="fa fa-linkedin"></i></a>
  <a href="https://www.instagram.com/avinash.pratap.singh_?igsh=a3Q5N2Rkd3h3dmsw&utm_source=qr"><i className="fa fa-instagram"></i></a>
  <p><button>Contact</button></p>
</div>
    </div>
  )
}

export default Profile