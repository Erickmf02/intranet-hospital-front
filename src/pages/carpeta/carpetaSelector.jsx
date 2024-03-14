import { createContext, useEffect, useState, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Componentes
import Navbar from "../../components/navbar";
import Carpeta from "./carpeta";
// Constantes y utilidades
import { URL_API } from "../../constantes";
import { mostrarErrorModal } from "../../utils/utilsError";
import { esAdministradorDeCarpeta } from "../../utils/carpeta";

// Contextos
import { ContextoModalErrorRef, ContextoUsuarioSesion } from "../../app";
import ModalAdministradores from "./components/modalAdministradores";
import ModalEditarCarpeta from "./components/modalEditarCarpeta";
import ModalEliminarCarpeta from "./components/modalEliminarCarpeta";
import CarpetaArchivos from "./carpetaArchivos";

export const ContextoCarpeta = createContext();
export const ContextoEsAdmin = createContext();
export const ContextoModalEliminarCarpeta = createContext();
export const ContextoModalAdministradores = createContext();
export const ContextoModalEditarCarpeta = createContext();


function CarpetaSelector() {
  // Params y referencias
  const { id } = useParams();
  const navigate = useNavigate();
  
  const modalErrorRef = useContext(ContextoModalErrorRef);
  const modalEditarCarpetaRef = useRef();
  const modalEliminarCarpetaRef = useRef();
  const modalAdministradoresRef = useRef();

  // Estados
  const [cargando, setCargando] = useState(true);

  const {usuarioSesion, setUsuarioSesion} = useContext(ContextoUsuarioSesion);
  
  const [carpeta, setCarpeta] = useState();
  const [esAdmin, setEsAdmin] = useState(false);
  
  // Efectos
  useEffect(()=>{
    if(usuarioSesion == false){
      navigate("/login", { replace: true });
    }else if(usuarioSesion){
      obtenerDatos();
    }
  }, [usuarioSesion, id])
  
  // Funciones
  async function obtenerDatos() {
    try {
      const response = await axios.get(`${URL_API}/carpeta?id=${id}`, { headers: { Authorization: `Bearer ${usuarioSesion.token}` } });
      const { data } = response;
      const carpeta = data;

      setEsAdmin(esAdministradorDeCarpeta(usuarioSesion, carpeta))
      setCarpeta(carpeta);
      setCargando(false);

    } catch (e) {
      console.log(e);
      mostrarErrorModal(modalErrorRef, e, navigate);
    }
  }

  

  return (
        <div className="container-fluid px-0 d-flex flex-column h-100">
          <Navbar></Navbar>
          
          {cargando ? 
            <div className="flex-grow-1">cargando...</div>
          :
          <>
            <ContextoCarpeta.Provider value={{carpeta, setCarpeta}}>
              <ContextoEsAdmin.Provider value={{esAdmin, setEsAdmin}}>

                <ModalEditarCarpeta ref={modalEditarCarpetaRef}></ModalEditarCarpeta>
                <ModalEliminarCarpeta ref={modalEliminarCarpetaRef}></ModalEliminarCarpeta>
                <ModalAdministradores ref={modalAdministradoresRef}></ModalAdministradores>

                <ContextoModalEditarCarpeta.Provider value={modalEditarCarpetaRef}>
                  <ContextoModalEliminarCarpeta.Provider value={modalEliminarCarpetaRef}>
                    <ContextoModalAdministradores.Provider value={modalAdministradoresRef}>

                      {carpeta.tipo == "carpetas" &&
                        <Carpeta></Carpeta>
                      }
                      {carpeta.tipo == "archivos" &&
                        <CarpetaArchivos></CarpetaArchivos>
                      }

                    </ContextoModalAdministradores.Provider>
                  </ContextoModalEliminarCarpeta.Provider>
                </ContextoModalEditarCarpeta.Provider>
                
              </ContextoEsAdmin.Provider>
            </ContextoCarpeta.Provider>
          </>
          }
          <footer>
            <p>&copy; Villagra #455 Hospital Mulchen</p>
          </footer>
        </div>
  );
}

export default CarpetaSelector;