import React from 'react'
import { Link } from 'react-router-dom';

import icon from "../Assets/logo_icon.png"




const Service = ({ id, name, desc, selectedService, onSelectService }) => {
  return (
    <>
    <div className="application custom-card ">
      <form action="#">
      {/* <img src="./images/589042351.jpg" alt=""/> */}
      <div className='text-center'> <img className='img-fluid logo_icon' src={icon} /></div>
  <p>
  <input
            type="radio"
            id={`service-${id}`}
            name="radio-group"
            checked={selectedService === id}
            onChange={() => onSelectService(id)}
          />
          <label htmlFor={`service-${id}`}>{name}</label>
  </p>
 
   
    {/* <h1>{name}</h1> */}
</form>

      
 


</div>

    </>
  )
}

export default Service