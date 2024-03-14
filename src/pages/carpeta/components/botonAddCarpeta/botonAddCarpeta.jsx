import { useRef } from "react";
import "./botonAddCarpeta.css";
import ModalCrearCarpeta from "./components/modalCrearCarpeta";


function BotonAddCarpeta({ carpeta, setCarpeta }) {
  const modalRef = useRef();

  return (
    <div className="col">
      <div className="ho_boton_add_carpeta_container">
        <button className="ho_boton_add_carpeta" onClick={()=>{modalRef.current.abrir()}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"></path>
          </svg>
        </button>
      </div>
      <ModalCrearCarpeta ref={modalRef}></ModalCrearCarpeta>
    </div>
  );
}

export default BotonAddCarpeta;
