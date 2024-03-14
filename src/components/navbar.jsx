import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";
import logoHospital from "../pages/login/img/IMG_8840.png";
import { ContextoUsuarioSesion } from "../app";
import axios from "axios";
import { URL_API } from "../constantes";
import { eliminarToken, obtenerToken } from "../utils/token";
import { eliminarUsuarioSesion, guardarUsuarioSesion, obtenerUsuarioSesion } from "../utils/usuarioSesion";
import * as usuarioUtils from "../utils/usuario" ;
import bootstrap from "bootstrap/dist/js/bootstrap.js";

function Navbar({history}) {
  const navigate = useNavigate();
  const location = useLocation();

  const {usuarioSesion, setUsuarioSesion} = useContext(ContextoUsuarioSesion);
  const [esAdmininstrador, setEsAdmintrador] = useState(false);

  const offcanvasRef = useRef();
  const bsOffcanvas = useRef();

  useEffect(()=>{
    if(offcanvasRef.current){
      bsOffcanvas.current = new bootstrap.Offcanvas(offcanvasRef.current);
      return ()=>{
        bsOffcanvas.current.hide();
      }
    }
  },[offcanvasRef])
  useEffect(()=>{
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const token = obtenerToken();
  
      if (!token) {
        eliminarToken();
        eliminarUsuarioSesion();
        setUsuarioSesion(false);
        return;
      }
  
      const usuario = obtenerUsuarioSesion();
      let esAdmin;

      if (usuario) {
        esAdmin = usuarioUtils.esAdmin(usuario);
        setEsAdmintrador(esAdmin);

        setUsuarioSesion({ ...usuario, token })
      } else {
        const response = await axios.get(`${URL_API}/usuario/token`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = response;
        esAdmin = usuarioUtils.esAdmin(data);
        setEsAdmintrador(esAdmin);

        guardarUsuarioSesion(data);
        setUsuarioSesion({ ...data, token })
      }
    } catch (error) {
      eliminarToken();
      eliminarUsuarioSesion();
      setUsuarioSesion(false);
    }
  }

  function cerrarSesion(){
    eliminarToken();
    eliminarUsuarioSesion();
    setUsuarioSesion(false);
    navigate("/login")
  }
  
  return (
    <header className="navbar navbar-expand-md ho_navbar position-sticky top-0">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img className="ho_navbar_logo_hospital" src={logoHospital} alt="Logo del hospital de Mulchén." />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbar_offcanvas" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end align-self-stretch align-items-stretch"  tabIndex="-1" id="navbar_offcanvas" ref={offcanvasRef}>
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">
              Intranet hospital Mulchén.
            </h5>
            <button className="btn-close" type="button" data-bs-dismiss="offcanvas" aria-label="close"></button>
          </div>
          <nav className="offcanvas-body d-flex justify-content-end w-100 h-100 text-center justify-content-center justify-content-md-end">
            <ul className="navbar-nav w-100 justify-content-start justify-content-md-end aling-items-center">
              <li className="nav-item ho_nav-item d-flex align-items-center justify-content-center">
                <Link to={"/"} className="nav-link flex-grow-1">
                  Inicio
                </Link>
              </li>
              {usuarioSesion&&
              <li className="nav-item ho_nav-item d-flex align-items-center justify-content-center">
                <Link to={"/carpeta/100000000000000000000002"} className="nav-link flex-grow-1">
                  Calidad
                </Link>
              </li>
              }
              {esAdmininstrador&&
              <>
                <li className="nav-item ho_nav-item d-flex align-items-center justify-content-center">
                  <Link to={"/lista"} className="nav-link flex-grow-1">
                    Lista
                  </Link>
                </li>
                <li className="nav-item ho_nav-item d-flex align-items-center justify-content-center">
                  <Link to={"/crear-usuario"} className="nav-link flex-grow-1">
                    Crear usuario
                  </Link>
                </li>
              </>
              }
              <li className="nav-item ho_nav-item d-flex align-items-center justify-content-center">
                <Link {...usuarioSesion?{to: `/usuario/${usuarioSesion._id}`}:{to: `/login`}} className="nav-link flex-grow-1" >
                  {usuarioSesion
                    ?<>Usuario</>
                    :<>Iniciar sesion</>
                  }
                </Link>
              </li>
              {usuarioSesion&&
              <li className="nav-item ho_nav-item d-flex align-items-center justify-content-center">
                <Link className="nav-link flex-grow-1" onClick={cerrarSesion}>
                  Cerrar sesion
                </Link>
              </li>
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
