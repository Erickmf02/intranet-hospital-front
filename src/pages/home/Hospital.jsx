import React, { useState } from "react";
import "./Hospital.css";
import Navbar from "../../components/navbar";
import organigramajpg from "./img/organigrama.jpg";
import planojpg from "./img/plano.jpg";

function Hospital() {
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleZoomIn = () => {
    setZoomLevel(zoomLevel+10);
  };

  const handleZoomOut = () => {
    setZoomLevel(zoomLevel-10);
  };

  return (
    <div className="mi_contenedor_descripcion">
      <Navbar />
      <h1 className="titulo_misionvision">¿Quiénes somos?</h1>
      <div className="mision_vision">
        <div className="mision">
          <h3>Misión</h3>
          <p>Ser un hospital integral reconocido por la comunidad, brindando un trato digno y equitativo, con pertinencia intercultural y atención de especialidades, fomentando la resolutividad de acuerdo a las necesidades de nuestra población y los objetivos sanitarios</p>
        </div>

        <div className="vision">
          <h3>Visión</h3>
          <p>Somos un hospital amigo de la familia y de la comunidad que brinda atención integral en salud a través del respeto y compromiso de un equipo multidisciplinario fomentando la promoción, prevención, recuperación y rehabilitación con inclusión intercultural, en beneficio de la satisfacción de nuestros usuarios</p>
        </div>
      </div>

      <div>
        <img className="mi_organigrama" src={organigramajpg} alt="Organigrama" />
      </div>

      <div className="contenedor_historia">
        <div className="mi_tarjeta_info">
          <p>El hospital de la familia y la comunidad de Mulchén fue creado en el año 1969, con el objetivo de dar atención a la gran demanda generada en esa época, en la comuna de Mulchén. Su primer Director fue el Sr. Germán Urbinas.</p>
        </div>
        <div className="mi_tarjeta_info">
          <p>El hospital de la familia y la comunidad de Mulchén es un hospital de baja complejidad ubicado en la comuna de Mulchén con aproximadamente 30 mil habitantes, dependiente de la Dirección del Servicio de Salud Bio Bio.</p>
        </div>
      </div>

      <h3>¿A qué sector pertenezco?</h3>

      <div className="mi_mapa_container mx-auto" >
        <div className="zoom_buttons">
          <button className="boton_zoom" onClick={handleZoomIn}>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36"><path fill="currentColor" d="M31 15H21V5a3 3 0 1 0-6 0v10H5a3 3 0 1 0 0 6h10v10a3 3 0 1 0 6 0V21h10a3 3 0 1 0 0-6"/></svg>
          </button>

          <button className="boton_zoom" onClick={handleZoomOut}>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M18 12.998H6a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2"/></svg></button>
        </div> 
        <div className="mi_contenedor_img_mapa">
            <img
              className="mi_mapa"
              src={planojpg}
              alt="Mapa"
              style={{ height: zoomLevel+"%", width: zoomLevel+"%" }}
              onClick={handleZoomIn}
              onContextMenu={(e) => {
                e.preventDefault();
                handleZoomOut();
              }}
            />
            
        </div>
      </div>
        

    </div>
    
  );
}

export default Hospital;
