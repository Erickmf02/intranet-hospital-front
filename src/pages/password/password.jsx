import Navbar from "../../components/navbar";
import Input from "../../components/Input";
import { useContext, useEffect, useState } from "react";
import BotonCargando from "../../components/botonCargando";
import { useLocation, useNavigate } from "react-router-dom";
import { esAdmin, obtenerRutBonito } from "../../utils/usuario";
import axios from "axios";
import { URL_API } from "../../constantes";
import { ContextoModalErrorRef, ContextoUsuarioSesion } from "../../app";
import { mostrarErrorModal } from "../../utils/utilsError";

function Password(){
    const navigate = useNavigate();
    const location = useLocation();

    const queryString = location.search;
    const queryParams = new URLSearchParams(queryString);

    const id = queryParams.get('id');
    const nombre = queryParams.get('nombre');
    const rut = queryParams.get('rut');

    const modalErrorRef = useContext(ContextoModalErrorRef);

    const {usuarioSesion} = useContext(ContextoUsuarioSesion);

    useEffect(() => {
        if(usuarioSesion == false){
            navigate("/login", { replace: true });
        }else if(usuarioSesion){
            if(!esAdmin(usuarioSesion)){
                navigate("/", { replace: true });
            }
        }
    }, [usuarioSesion]);

    const [loading, setLoading] = useState(false);
    const [passwordInput, setPasswordInput] = useState({
        valor: "",
        estado: "vacio"
    })
    const [passwordActualizada, setPasswordActualizada] = useState(false);

    function validarPassword() {
        const longitudMinima = 6;
        const longitudMaxima = 30;
    
        const longitud = passwordInput.valor.length;
    
        const valido = longitud >= longitudMinima && longitud <= longitudMaxima;
        return valido;
    }


    async function sendData(){
        try {
            setLoading(true);
            setPasswordActualizada(false);
            const response = await axios.put(`${URL_API}/usuario/password/${id}`,{ password: passwordInput.valor },{headers: {Authorization: `Bearer ${usuarioSesion.token}`}});
            const {data} = response;
            setPasswordActualizada(true);
            navigate(`/lista?nombre-password=${data.nombre}&rut-password=${data.rut}`)
        } catch (error) {
            mostrarErrorModal(modalErrorRef, error, navigate)
            setPasswordActualizada(false);
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className="d-flex flex-column h-100">
            <Navbar></Navbar>
            <div className="row g-0 flex-grow-1 position-relative justify-content-center">
                <div className="position-absolute top-0 start-0 end-0 bottom-0" style={{backgroundImage: "url(src/pages/home/img/background.png)", filter: "blur(10px)", zIndex: "-1000"}}></div>
                <div className="col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3 d-flex align-items-center justify-content-center z-1">
                    <div className="rounded shadow overflow-hidden ho_font_poppins ho_bg_white">
                        <div className="container-fluid px-0">
                            <div className="row g-0">
                                <div className="col-12">
                                    <div className="d-flex align-items-center justify-content-center p-3 ho_bg_azul_3 ho_color_white ho_fs_24 fw-semibold">
                                        Cambiar contraseña
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="d-flex flex-column px-4 py-4">
                                        <div className="row">
                                            <div className="col-12 mb-4">
                                                <div className="d-flex align-items-center justify-content-center text-center">
                                                    <div>
                                                        Cambiaras la contraseña de<strong> {nombre} </strong>de rut:<strong> {obtenerRutBonito(rut)}.</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 mb-4">
                                                <Input input={passwordInput} setInput={setPasswordInput} clasesInput={"ho_fs_16"} placeholder={"Cambiar contraseña."} inputType={"password"}></Input>
                                            </div>
                                            {passwordActualizada&&
                                            <div className="col-12 mb-4">
                                                <div className="alert alert-info">
                                                    ¡Se ha cambiado la contraseña de <strong>{nombre}</strong> correctamente!
                                                </div>
                                            </div>
                                            }
                                            <div className="col-12 d-flex align-items-center justify-content-center">
                                                <BotonCargando loading={loading} text={"Cambiar contraseña"} onClick={sendData} estilos={"ho_btn-small"} isDisabled={!validarPassword()}></BotonCargando>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <p>&copy; Villagra #455 Hospital Mulchen</p>
            </footer>
        </div>
    );
}

export default Password;