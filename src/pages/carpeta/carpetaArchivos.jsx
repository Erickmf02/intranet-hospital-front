import Buscador from "../../components/buscador";
import RutaCarpeta from "./components/rutaCarpeta";
import { createContext, useContext, useRef, useState } from "react";
import BotonCargando from "../../components/botonCargando";
import "./carpetaArchivos.css"
import { ContextoCarpeta, ContextoEsAdmin, ContextoModalAdministradores, ContextoModalEditarCarpeta, ContextoModalEliminarCarpeta } from "./carpetaSelector";
import BotonCrearArchivo from "./components/botonCrearArchivo";
import { ContextoUsuarioSesion } from "../../app";
import ArchivoItem from "./components/archivoItem";
import ModalEliminarArchivo from "./components/modalEliminarArchivo";


export const ContextoModalEliminarArchivoRef = createContext();
function CarpetaArchivos({}){
  const {usuarioSesion, setUsuarioSesion} = useContext(ContextoUsuarioSesion);
  const modalEliminarArchivoRef = useRef();

  const modalAdministradoresRef = useContext(ContextoModalAdministradores);
  const modalEliminarCarpetaRef = useContext(ContextoModalEliminarCarpeta);
  const modalEditarCarpetaRef = useContext(ContextoModalEditarCarpeta);

  const {carpeta, setCarpeta} = useContext(ContextoCarpeta)
  const {esAdmin, setEsAdmin} = useContext(ContextoEsAdmin);
  const [buscador, setBuscador] = useState("");

  

  return (
    <div className="container-fluid px-0 d-flex flex-grow-1">
      <div className="row g-0 flex-column flex-grow-1" style={{ backgroundColor: "#F1F1F1" }}>
        <div className="col-12 d-flex flex-column h-100">
        {carpeta.conPortada && (
          <div className="container-fluid">
            <div className="row text-center ho_font_poppins position-relative" style={{ gap: "12px", background: 'linear-gradient(to bottom, #259FBE, #ffffff)', transition: "background 0.5s ease", padding: "50px 0" }}>
              <div className="col-12 d-flex flex-column">
                <div className="row">
                  <h1 className="m-0 p-0">{carpeta.nombre}</h1>
                </div>
                <div className="row">
                  <p className="m-0 p-0">{carpeta.descripcion}</p>
                </div>
              </div>
              <div className="col-12"></div>
            </div>
          </div>
          
        )}
          <div className="container-fluid px-0">
            <div className="row g-0 flex-grow-1" >
              <div className="col-12 d-flex flex-column">
                <RutaCarpeta carpeta={carpeta}></RutaCarpeta>
                {esAdmin && (
                  <div className="container-fluid mb-3">
                    <div className="row g-0">
                      <div className="col-12 p-0 d-flex">
                        <div className="container-fluid px-0">
                          <div className="row g-2 w-100">
                            <ModalEliminarArchivo ref={modalEliminarArchivoRef}></ModalEliminarArchivo>
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
                      </div>
                    </div>
                  </div>
                )}
                <div className="container-fluid mb-3">
                  <div className="row">
                    <div className="col-12">
                      <Buscador value={buscador} setValue={setBuscador}></Buscador>
                    </div>
                  </div>
                </div>
                {esAdmin&&
                <div className="container-fluid mb-3">
                  <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                      <BotonCrearArchivo></BotonCrearArchivo>
                    </div>
                  </div>
                </div>
                }
                <div className="container-fluid gx-0">
                  <div className="row g-0 flex-grow-1 ">
                    <div className="col-12">
                      <div className="ho_grid overflow-visible my-5">
                        <ContextoModalEliminarArchivoRef.Provider value={modalEliminarArchivoRef}>
                          {carpeta.archivos.map(archivo => (
                            <ArchivoItem archivo={archivo} key={archivo._id}></ArchivoItem>
                          ))}
                        </ContextoModalEliminarArchivoRef.Provider>
                      </div>
                    </div>
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

export default CarpetaArchivos;