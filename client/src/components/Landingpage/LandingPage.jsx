import { Link } from "react-router-dom";
import "./LandingPage.css"; 
import linkedin from "../../../src/img/logos/linkedin.png";
import github from "../../../src/img/logos/github.png";
import '../../styles.css'

export default function LandingPage() {
  return (
    <div className="landing-page">
   

      <div className="landing-elements-container">

        
        <h1>Food</h1>

        <div className="social-links">
          <a
            href="https://github.com/MelLopez22"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} alt="GitHub" />
          </a>
          {/* AGREGAR LINK DE LINKEDIN */}
          <a
            href="https://www.linkedin.com/in/flaviamelissalopez/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedin} alt="LinkedIn" />
          </a>
        </div>

        <Link to='/homepage'>
          <button className="btn">INGRESAR</button>
        </Link>

      


      </div>
    </div>
  );
}

