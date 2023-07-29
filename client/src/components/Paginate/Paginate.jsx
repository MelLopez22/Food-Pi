// import { useDispatch } from "react-redux";
import styles from './Paginate.module.css'

import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage } from "../../Redux/actions";


const Paginate = ({ cantidadPages }) => {
  const { numPage } = useSelector((state) => state);
  const dispatch = useDispatch();

  function next() {
    dispatch(nextPage());
  }
  function prev() {
    dispatch(prevPage());
  }

  return (
    console.log(cantidadPages),
    <div className={styles.paginateButtons}>
      <div className={styles['paginate-buttons-container']}>
        {numPage > 1 ? (
          <div className={styles['paginate-button']}>
            <button onClick={prev}>Anterior</button>
            <p>{numPage - 1}</p>
          </div>
        ) : null}
        <h3>{numPage}</h3>
        {numPage <= cantidadPages ? (
          <div className={styles['paginate-button']}>
            <p>{numPage + 1}</p>
            <button onClick={next}>Siguiente</button>
          </div>
        ) : null}{" "}
      </div>
    </div>
  );
  
};

export default Paginate;
