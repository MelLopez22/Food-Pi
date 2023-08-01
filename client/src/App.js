import './App.css';
import {Routes, Route, useLocation} from 'react-router-dom'
import Homepage from './components/HomePage/HomePage'
import Detail from './components/Details/Details';
import LandingPage from './components/Landingpage/LandingPage';
import { useEffect } from 'react';


function App() {
  const location = useLocation()
  useEffect(() => {
    if (location.pathname === '/') {
      document.body.classList.add('black-background');
    } else {
      document.body.classList.remove('black-background');
    }
  }, [location]);
  return (
    <>
    
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
   
    </>
  );
}

export default App;
