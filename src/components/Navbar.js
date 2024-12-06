import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import data from '../data';
import { Link } from 'react-router-dom'

import { motion } from 'framer-motion';
import logo from '../Assets/logo_cc .png'

const Navbar = () => {

    const [services, setServices] = useState(data)
    const { id } = useParams();

    const service = services.find((s) => s.id === parseInt(id));
    console.log(services)
     
  return (
    <motion.nav className="navbar navbar-expand-lg navbar-dark bg-dark"
    
        // initial={{ y:"100%" }}
        // animate={{ y:"0%"}}
        // exit={{ opacity: 1 }}
        // transition={{
        //   duration: 0.5,
        //   ease: "easeOut",
        // }}
    >
     
  <div className="container-fluid">
    
    <Link className="navbar-brand" to={`/`}>
   
    <div id="loader-wrapper">
      <img src={ logo} />
          {/* <div id="loader-logo"></div>
          <div id="loader"></div>
          <div className="loader-section section-left"></div>
          <div className="loader-section section-right"></div>
          <div className="logo">Code Crafters</div> */}
        </div>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        {/* <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={`/`}>Home</Link>
        </li> */}
        {/* <li className="nav-item">
          <Link className="nav-link" to={`/service/${id}`}>Code Explain</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={`/service/${id}`}>Code Review</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={`/service/${id}`}>Code Conversion</Link>
        </li> */}
      </ul>
    </div>
  </div>
</motion.nav>
  )
}

export default Navbar