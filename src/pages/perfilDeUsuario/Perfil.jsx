import React, { useContext, useEffect, useRef, useState } from "react";
import "./perfil.css";
import Navbar from "../../components/navbar";   
import { cleanRut, validateRut } from 'rutlib';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ModalError from "../../components/modalError";

import Input from "../../components/Input";
import BotonCargando from "../../components/botonCargando";
import { URL_API } from "../../constantes";
import { ContextoModalErrorRef, ContextoUsuarioSesion } from "../../app.jsx";
import { esAdmin } from "../../utils/usuario.js";
import { mostrarErrorModal } from "../../utils/utilsError.js";


function Perfil() {
  const navigate = useNavigate();

  const {usuarioSesion, setUsuarioSesion} = useContext(ContextoUsuarioSesion);
  
  const modalErrorRef = useContext(ContextoModalErrorRef)

  const [loading, setLoading] = useState(false);
  const [rolesUsuario, setRolesUsuario ] = useState([]);
  const [usuario, setUsuario] = useState();

  useEffect(() => {
    if(usuarioSesion == false){
      navigate("/login", { replace: true });
    }else if(usuarioSesion){
        if(!esAdmin(usuarioSesion)){
          navigate("/", { replace: true })
        }
    }
  }, [usuarioSesion]);


  const handleAdminCheckboxChange = () => {
    const haveAdmin = rolesUsuario.includes('000000000000000000000001');

    if (haveAdmin) {
      setRolesUsuario(rolesUsuario.filter(rol => rol !== '000000000000000000000001'));
    } else {
      setRolesUsuario([...rolesUsuario, '000000000000000000000001']);
    }
  };

  const [nombre,setNombre]=useState({
  valor: "",
  estado: "vacio"
  });
  const [rut,setRut]=useState({
    valor: "",
    estado: "vacio",
  });
  const [contraseña,setContraseña]=useState({
    valor: "",
    estado: "vacio"
  });

  function validarRut(){
    try {
        const rutLimpio = cleanRut(rut.valor);
        const valido = validateRut(rutLimpio);
        return valido;
    } catch (error) {
        return false;
    }
  }

  function validarNombre(){
    try {
        if(nombre.valor.length<2){
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
  }

  function validarPassword() {
    try {
        const longitudMinima = 6;
        const longitudMaxima = 30;
    
        const longitud = contraseña.valor.length;
        console.log(longitud)
    
        const valido = longitud >= longitudMinima && longitud <= longitudMaxima;
        return valido;
    } catch (error) {
        console.log(error)
    }
}
  async function enviarFormulario(){
    try {

      setLoading(true);
      const response = await axios.post(`${URL_API}/usuario`, {
        nombre: nombre.valor,
        rut: cleanRut(rut.valor),
        password: contraseña.valor,
        roles: rolesUsuario
      },{
        headers: {
          Authorization: `Bearer ${usuarioSesion.token}`
        }
      });
      const {data} = response;

      setUsuario(data);
      setLoading(false);
      setNombre({
        valor: "",
        estado: "vacio"
      });
      setRut({
        valor: "",
        estado: "vacio",
      });
      setContraseña({
        valor: "",
        estado: "vacio"
      });
    } catch (e) {
      console.log(e)
      mostrarErrorModal(modalErrorRef, e, navigate);
      setLoading(false)
    }
  }  

  return (
    <div className="mi_contenedor_padre_P">
      <Navbar></Navbar> 
      { (usuarioSesion && esAdmin(usuarioSesion)) &&
      <>
        <div className="mi_linea"></div>
          <div className="mi_contenedor_secundario">
            <div className="mi_contenedor_perfil">
              <h2 style={{marginTop:'10%'}}>Crear perfil de usuario</h2>

                <form className="mi_formulario d-flex flex-column justify-content-center align-items-center" id="registrationForm" encType="multipart/form-data" onSubmit={(e)=> e.preventDefault()}>

                <div className="mb-3 w-100">
                  <Input input={nombre} setInput={setNombre} placeholder={'Nombre'} inputType={'text'} validateInput={validarNombre}> 
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"></path></svg>
                  </Input>
                </div>

                <div className="mb-3 w-100">
                  <Input input={rut} setInput={setRut} placeholder={'RUT'} inputType={'text'} validateInput={validarRut}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024"><path fill="currentColor" d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32m-40 632H136V232h752zM610.3 476h123.4c1.3 0 2.3-3.6 2.3-8v-48c0-4.4-1-8-2.3-8H610.3c-1.3 0-2.3 3.6-2.3 8v48c0 4.4 1 8 2.3 8m4.8 144h185.7c3.9 0 7.1-3.6 7.1-8v-48c0-4.4-3.2-8-7.1-8H615.1c-3.9 0-7.1 3.6-7.1 8v48c0 4.4 3.2 8 7.1 8M224 673h43.9c4.2 0 7.6-3.3 7.9-7.5c3.8-50.5 46-90.5 97.2-90.5s93.4 40 97.2 90.5c.3 4.2 3.7 7.5 7.9 7.5H522a8 8 0 0 0 8-8.4c-2.8-53.3-32-99.7-74.6-126.1a111.8 111.8 0 0 0 29.1-75.5c0-61.9-49.9-112-111.4-112s-111.4 50.1-111.4 112c0 29.1 11 55.5 29.1 75.5a158.09 158.09 0 0 0-74.6 126.1c-.4 4.6 3.2 8.4 7.8 8.4m149-262c28.5 0 51.7 23.3 51.7 52s-23.2 52-51.7 52s-51.7-23.3-51.7-52s23.2-52 51.7-52"></path></svg>
                  </Input>
                </div>
                <div className="mb-4 w-100">
                  <Input input={contraseña} setInput={setContraseña} placeholder={'Contraseña'} inputType={'password'} validateInput={validarPassword}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"></path></svg>
                  </Input>
                </div>
                <div className="d-flex w-100">
                  <div className="mb-3">
                    <label>
                      <input
                        type="checkbox"
                        onChange={handleAdminCheckboxChange}
                      />
                      ¿Es administrador?
                    </label>
                  </div>
                </div>
                {usuario
                &&<div className="alert alert-info">
                  <strong>Informacion:</strong> El usuario <Link to={`/usuario/${usuario._id}`} className="alert-link"><em>{usuario.nombre}</em></Link> ha sido creado correctamente.
                </div> 
                }

                
                <BotonCargando text={"Agregar usuario"} isDisabled={rut.estado!="valido"||nombre.estado!="valido"||contraseña.estado!="valido"} onClick={enviarFormulario} loading={loading}></BotonCargando>
              
            </form>       
          
        </div>
        <div className="mi_roles">
        </div>
        </div>
      </>
      }
    </div>
  );
}

export default Perfil;
