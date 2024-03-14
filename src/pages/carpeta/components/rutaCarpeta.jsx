import React from "react";
import { Link } from "react-router-dom";
function RutaCarpeta({ carpeta }) {

  const rutaCompleta = obtenerRutaCompleta(carpeta);

  function obtenerRutaCompleta(carpeta, ruta = []) {
    if (!carpeta) {
      return ruta;
    }

    const nuevaRuta = [{ nombre: carpeta.nombre, _id: carpeta._id, tipo: carpeta.tipo }, ...ruta];

    if (carpeta.padre) {
      return obtenerRutaCompleta(carpeta.padre, nuevaRuta);
    }
    return nuevaRuta;
  }

  function renderRuta() {
    return rutaCompleta.map((carpeta, index) => (
      <React.Fragment key={carpeta._id}>
        {index === 0 && <span> / </span>}
        {index !== 0 && <span> / </span>}
        <Link to={`/carpeta/${carpeta._id}`} className={`ho_color_white ${index == rutaCompleta.length - 1 ? "fw-semibold" : ""}`}>{carpeta.nombre}</Link>
      </React.Fragment>
    ));
  }

  return (
    <div className="container-fluid">
      <div className="row px-3 mb-3 ho_bg_azul_5 ho_font_poppins ho_color_white ho_fs_16">
        <div className="col-12 p-0">
          {renderRuta()}
        </div>
      </div>
    </div>
  );
}

export default RutaCarpeta;
