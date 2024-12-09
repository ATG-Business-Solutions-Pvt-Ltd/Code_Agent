import { BrowserRouter as Router, Routes, Route,useLocation } from 'react-router-dom';
import Landing from "./Landing";
import ServiceDetails from './components/ServiceDetails';
import { AnimatePresence, motion } from 'framer-motion';
import PageWrapper from './components/PageWrapper';


function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<PageWrapper>
        <div className='bar'></div>
        <Landing /></PageWrapper>} />
      <Route path="/service/:id" element={<PageWrapper><ServiceDetails /></PageWrapper>} />
    </Routes>
  </AnimatePresence>
  );
}




function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}


export default App;
