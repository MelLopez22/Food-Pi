// import styles from './Card.module.css'

export default function Card ({name, image, diets}) {
return (
    <div>
      <p>{name}</p>
      <img src={image} alt={name} />
      {
        diets?.map((el)=>
        {
          return <div key={el.id}>
            <p>{el}</p>
          </div>
        }
          
        )
      }

    </div>
)}