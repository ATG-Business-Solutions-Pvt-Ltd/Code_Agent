
import { React, useEffect, useState } from 'react';
// import './styles.css';
import './aeries_theme.css';
import Services from './components/Services';
import Loading from './components/Loading';
import data from './data';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { motion } from 'framer-motion';
import ServiceDetails from './components/ServiceDetails';

const Landing = () => {


 
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState([]);
    
    const [selectedServiceId, setSelectedServiceId] = useState(null); // Track selected service ID

    const handleServiceSelect = (id) => {
      setSelectedServiceId(id); // Update the selected service ID
    };

  // const location = useLocation()
    useEffect(()=> {
      setServices(data)
      setLoading(false)
      // setTimeout(()=>{
      
      //   setServices(data)
      //   setLoading(false)
  
      // }, 1000)
    }, [])


  return (
   <motion.div className="container-fluid landingPage" 
   
  //  initial={{ y:"100%" }}
  //  animate={{ y:"0%"}}
  //  exit={{ opacity: 1 }}
  //  transition={{
  //    duration: 0.75,
  //    ease: "easeOut",
  //  }}
   
   >
    {loading ? (
      <Loading services={services}/> 
    ) : (
      <div className='row flexrow '>
       
       <div className='col-md-12 flex'>
       <div className='hero_section'>
       <Navbar/>

 <motion.h1 className='text-center hero'
    //  initial={{ opacity:0, y:"100%" }}
    //  animate={{opacity:1,  y:"0%"}}
    //  exit={{ opacity: 1 }}
    //  transition={{
    //    delay: 0.6,
    //    duration: 0.5,
    //  }}
  >AI-Powered Business Tools
  <span>...at Your Fingertips</span>
  </motion.h1>
  <h3 className='text-center try_btn'>
    <span className='before'></span>
    Try Our Services
    <span className='after'></span>
    </h3>
        <section className="application-container cards">
          <Services services={services}  selectedService={selectedServiceId}
                  onSelectService={handleServiceSelect} />
        </section>

       
        {selectedServiceId && (
                <section className="service-details-container mt-4">
                  <ServiceDetails serviceId={selectedServiceId} />
                </section>
              )}

 <Footer/>
       </div>
 
 
       </div>

 
      </div>
    )}
  </motion.div>
  )
}

export default Landing