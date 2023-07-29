import { Link } from 'react-router-dom';
import './Card.css';


const Card = ({ name, image, diets, id }) => {
  return (
    <Link to={`/detail/${id}`}>
    <div className="card">
     <img className="card-image" src={image} alt={name} />
      
      <div className="card-content">
        <h3 className="card-name">{name}</h3>
        <ul className="card-diets">
          {diets.map((diet, index) => (
            <li key={index}>{diet}</li>
          ))}
        </ul>
      </div>
    </div>
    </Link>

  );
};

export default Card;






