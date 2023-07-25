import { Link } from "react-router-dom";

export default function LandingPage (){
  return (
    <div>LandingPage, imagen, links a github y linkedin
      <Link to='/homepage'>
         <button>HACIA HOMEPAGE</button>
      </Link>
     
    </div>
  )
}
