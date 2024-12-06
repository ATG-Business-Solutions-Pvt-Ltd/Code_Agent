import React from 'react'
import { Link } from 'react-router-dom';
const Service = ({id,name, desc}) => {
  return (
    <div className="application custom-card">
    <img src="./images/589042351.jpg" alt=""/>
    <h1>{name}</h1>
   <p>
   {desc}
   </p>
   
    <div className="d-flex w-100">

<Link to={`/service/${id}`} className="btn view-btn">View</Link>

</div>


</div>
  )
}

export default Service