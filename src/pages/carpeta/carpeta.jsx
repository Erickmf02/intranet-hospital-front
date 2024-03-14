import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Componentes
import Buscador from "../../components/buscador";
import CartaCarpeta from "./components/cartaCarpeta";
import BotonAddCarpeta from "./components/botonAddCarpeta/botonAddCarpeta";
import RutaCarpeta from "./components/rutaCarpeta";
import BotonCargando from "../../components/botonCargando";

// Contextos
import { ContextoCarpeta, ContextoEsAdmin, ContextoModalAdministradores, ContextoModalEditarCarpeta, ContextoModalEliminarCarpeta } from "./carpetaSelector";

function Carpeta() {
  const navigate = useNavigate();

  const modalEliminarCarpetaRef = useContext(ContextoModalEliminarCarpeta);

  const modalEditarCarpetaRef = useContext(ContextoModalEditarCarpeta)
  const modalAdministradoresRef = useContext(ContextoModalAdministradores);
  // Estados
  const {carpeta, setCarpeta} = useContext(ContextoCarpeta);
  const {esAdmin, setEsAdmin} = useContext(ContextoEsAdmin);
  const [buscador, setBuscador] = useState("");
  // Funciones

  return (
      <div className="container-fluid d-flex flex-grow-1 flex-column px-0">
        <div className="row g-0 flex-grow-1 d-flex flex-column" style={{ backgroundColor: "#F1F1F1" }}>
          <div className="col-12 d-flex flex-column h-100">
            {carpeta.conPortada && (
              <div className="container-fluid px-0 py-2">
                <div className="row g-0 text-center ho_font_poppins " style={{ gap: "12px" }}>
                  <div className="col-12 d-flex flex-column">
                      <h1 className="m-0 p-0">{carpeta.nombre}</h1>
                      <p className="m-0 p-0">{carpeta.descripcion}</p>
                  </div>
                  <div className="col-12"></div>
                </div>
              </div>
            )}
            <div className="container-fluid px-0">
              <div className="row g-0 flex-grow-1" >
                <div className="col-12 d-flex flex-column">
                  <RutaCarpeta carpeta={carpeta}></RutaCarpeta>
                  {esAdmin&& 
                    <div className="container-fluid mb-3 px-2">
                      <div className="row g-2">
                        <div className="col-12 col-md-auto d-flex justify-content-center">
                          <BotonCargando onClick={() => { modalEditarCarpetaRef.current.abrir() }} text={"Editar carpeta"} estilos={"ho_btn-small"}></BotonCargando>
                        </div>
                        <div className="col-12 col-md-auto d-flex justify-content-center">
                          <BotonCargando onClick={() => modalEliminarCarpetaRef.current.abrir(carpeta, () => navigate(`/carpeta/${carpeta.padre._id}`))} text={"Eliminar carpeta"} estilos={"ho_btn-red ho_btn-small"}></BotonCargando>
                        </div>
                        <div className="col-12 col-md-auto d-flex justify-content-center">
                          <BotonCargando onClick={() => modalAdministradoresRef.current.abrir()} text={"Administradores"} estilos={"ho_btn-small"}></BotonCargando>
                        </div>
                      </div>
                    </div>
                  }
                  <div className="container-fluid mb-3">
                    <div className="row">
                      <div className="col-12">
                        <Buscador value={buscador} setValue={setBuscador}></Buscador>
                      </div>
                    </div>
                  </div>
                  <div className="container-fluid px-4 my-5">
                    <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 ho_contenedor_cartas_carpetas">
                      {esAdmin&&
                      <BotonAddCarpeta carpeta={carpeta} setCarpeta={setCarpeta}></BotonAddCarpeta>
                      }
                      {filtrarCarpetas(carpeta.hijos, buscador).map((carpeta) => (
                        <CartaCarpeta key={carpeta._id} carpeta={carpeta}></CartaCarpeta>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Carpeta;

const filtrarCarpetas = (carpetas, filtro) => {
  const filtroSinTildes = quitarTildes(filtro.toLowerCase());
  return carpetas.filter((carpeta) => quitarTildes(carpeta.nombre.toLowerCase()).includes(filtroSinTildes));
};

const quitarTildes = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};