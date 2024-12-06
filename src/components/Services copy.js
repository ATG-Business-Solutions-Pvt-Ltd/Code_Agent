import React from 'react'
import Service from './Service'


const Services = ({ services }) => {



  return (
    <>
      {/* <h1>Our Services</h1> */}
      
      {services.map((service) => {
//         return   <Link to={`/service/${service.id}`}>
//  <Service key={service.id} {...service} />
//         </Link>  
return  <Service key={service.id} {...service} />

       
      })}
      
    </>
  )
}

export default Services