import { Link } from "react-router-dom";
import "./LandingPage.css"; // Asegúrate de importar tu archivo de estilos CSS
import linkedin from "../../../src/img/logos/linkedin.png";
import github from "../../../src/img/logos/github.png";
// import fondo from '../../img/fondo.jpg'

export default function LandingPage() {
  return (
    <div className="landing-page">
    <div className="image-background">
      {/* <img src={fondo} alt="fondo" /> */}
    </div>

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

        <Link to="/homepage">
          <button className="enter-button">INGRESAR</button>
        </Link>


      </div>
    </div>
  );
}

