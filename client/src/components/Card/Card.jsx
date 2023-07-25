import './Card.css';


const Card = ({ name, image, diets }) => {
  return (
    <div className="card">
      <img className="card-image" src={image} alt={name} />
      <div className="card-content">
        <h3 className="card-name">{name}</h3>
        <ul className="card-diets">
          {diets.map((diet) => (
            <li key={diet}>{diet}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;






