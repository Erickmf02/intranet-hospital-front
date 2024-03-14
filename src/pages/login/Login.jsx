import React, { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css"
import logoHospital from "./img/IMG_8840.png"
import imagenHospital from "./img/Captura de pantalla (23).png";
import { cleanRut, validateRut } from 'rutlib';
import { useState } from "react";
import Input from "../../components/Input";
import BotonCargando from "../../components/botonCargando";
import axios from "axios"
import {IP, PUERTO_API} from "../../constantes.js";
import ModalError from "../../components/modalError.jsx";
import { guardarToken, obtenerToken } from "../../utils/token.js";
import { mostrarErrorModal } from "../../utils/utilsError.js";
import { ContextoModalErrorRef } from "../../app.jsx";

function Login() {

    const navigate = useNavigate();
    const [rut, setRut] = useState({ valor: "", estado: "vacio" });
    const [password, setPassword] = useState({ valor: "", estado: "vacio" });
    const [btnCargando, setBtnCargando] = useState(false);
    const modalErrorRef = useContext(ContextoModalErrorRef);

    function validarRut(){
        try {
            const rutLimpio = cleanRut(rut.valor);
            const valido = validateRut(rutLimpio);
            return valido;
        } catch (error) {
            return false;
        }
    }

    function validarPassword() {
        try {
            const longitudMinima = 6;
            const longitudMaxima = 30;
        
            const longitud = password.valor.length;
        
            const valido = longitud >= longitudMinima && longitud <= longitudMaxima;
            return valido;
        } catch (error) {
            console.log(error)
        }
    }

    async function enviarFormulario(){
        try {
            const habilitado = rut.estado === "valido" && password.estado === "valido";
            if(!habilitado){
                if (rut.estado !== "valido") setRut({ ...rut, estado: "invalido" });
                if (password.estado !== "valido") setPassword({ ...password, estado: "invalido" });
            }else{
                setBtnCargando(true)
                

                const response = await axios.post(`http://${IP}:${PUERTO_API}/usuario/sesion`, {
                    rut: cleanRut(rut.valor).toLocaleLowerCase(),
                    password: password.valor,
                });
                if (response.status >= 200 && response.status < 300) {
                    const { token } = response.data;
                    guardarToken(token);
                    console.log(obtenerToken(token));
                    navigate("/");
                }
                setBtnCargando(false)
            }
            
        } catch (e) {
            mostrarErrorModal(modalErrorRef, e, navigate)
            setBtnCargando(false)
        }
    }

    return(
        <div className="container-fluid h-100">
            <div className="row h-100">
                <div className="col-12 col-md-4 d-flex flex-column py-4">
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 d-flex justify-content-center">
                                    <Link to={"/"}>
                                        <img className="ho_logo_hospital" src={logoHospital} alt="Logo del hospital mulchen" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row flex-grow-1 align-items-center">
                        <div className="col-12 position-relative p-lg-5" style={{top: "-6%"}}>
                            <div className="row">
                                <form action="" onSubmit={(evento)=>{evento.preventDefault()}}>
                                    <div className="col-12 mb-4">
                                        <h2 className="text-center m-0 ho_font_poppins fs-1">Iniciar sesión</h2>
                                        <p className="text-center m-0 ho_font_poppins">Inicia sesion para acceder a recursos de la intranet.</p>
                                    </div>
                                    <div className="col-12 mb-4">
                                        <Input placeholder={"Ingrese su rut."} input={rut} setInput={setRut} inputType={"text"} validateInput={validarRut} errorHelp={rut.valor===""?"Rellene el rut antes de ingresar.":"El rut ingresado es invalido."} isDisabled={btnCargando}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"></path></svg>
                                        </Input>
                                    </div>
                                    <div className="col-12 mb-4">
                                        <Input placeholder={"Ingrese su contraseña."} input={password} setInput={setPassword} inputType={"password"} validateInput={validarPassword} errorHelp={password.valor===""?"Rellene la contraseña antes de ingresar.":"La contraseña debe tener de entre 6 a 20 caracteres."} isDisabled={btnCargando}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"></path></svg>
                                        </Input>
                                    </div>
                                    <div className="col-12 d-flex justify-content-center">
                                        <BotonCargando onClick={enviarFormulario} text={"Ingresar"} loading={btnCargando} isDisabled={rut.estado!=="valido" || password.estado!=="valido"} executeOnClickOnDisabled={true}></BotonCargando>
                                    </div>
                                    <div className="col-12 mt-4">
                                        <div className="row g-3 justify-content-center">
                                            <div className="col-auto">
                                                <a href="https://www.instagram.com/hospitalmulchen/" target="_blank" className="ho_bubble">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"></path></svg>
                                                </a>
                                            </div>
                                            <div className="col-auto">
                                                <a href="https://www.facebook.com/HospitalMulchen/" target="_blank" className="ho_bubble">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"></path></svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-8 d-none d-md-block p-0 position-relative">
                    <div id="carouselExampleSlidesOnly" className="carousel slide h-100 w-100" data-bs-ride="carousel">
                        <div className="carousel-inner h-100 w-100">
                            <div className="carousel-item active h-100 w-100" data-bs-interval="5000">
                                <img src={imagenHospital} className="d-block w-100 h-100 object-fit-cover" alt="..." />
                            </div>
                            <div className="carousel-item h-100 w-100" data-bs-interval="5000">
                                <img src={imagenHospital} className="d-block w-100 h-100 object-fit-cover" alt="..." />
                            </div>
                            <div className="carousel-item h-100 w-100" data-bs-interval="5000">
                                <img src={imagenHospital} className="d-block w-100 h-100 object-fit-cover" alt="..." />
                            </div>
                        </div>
                    </div>
                    <div className="ho_overlay d-flex justify-content-center align-items-center">
                        <h1 className="ho_font_poppins ho_color_white">Intranet hospital Mulchén</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;