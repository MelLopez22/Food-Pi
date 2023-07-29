import './App.css';
import {Routes, Route, useLocation} from 'react-router-dom'
import Homepage from './components/HomePage/HomePage'
import Detail from './components/Details/Details';
import LandingPage from './components/Landingpage/LandingPage';


function App() {
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
