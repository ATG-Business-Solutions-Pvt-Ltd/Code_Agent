
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
      <div className='row flexrow'>
       
       <div className='col-md-12 flex'>
     <Navbar/>
  <motion.h1 className='text-center hero'
    //  initial={{ opacity:0, y:"100%" }}
    //  animate={{opacity:1,  y:"0%"}}
    //  exit={{ opacity: 1 }}
    //  transition={{
    //    delay: 0.6,
    //    duration: 0.5,
    //  }}
  >AI-Powered Business Tools</motion.h1>
        <section className="application-container">
          <Services services={services} />
        </section>

        {/* <ServiceDetails/> */}
        <Footer/>
       </div>

 
      </div>
    )}
  </motion.div>
  )
}

export default Landing