import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../../components/navbar";
import backgroundjpg from "./../home/img/background.png";
import './lista.css';
import axios from "axios";
import { URL_API } from "../../constantes";
import ListaItem from "./components/listaItem";
import ModalEliminarUsuario from "./components/modalEliminarUsuario";
import Buscador from "../../components/buscador";
import { useLocation, useNavigate } from "react-router-dom";
import { ContextoUsuarioSesion } from "../../app"; // Importar el contexto de sesión del usuario
import { esAdmin, obtenerRutBonito } from "../../utils/usuario";
import ModalError from "../../components/modalError";
import { mostrarErrorModal } from "../../utils/utilsError";

function Lista() {
    const navigate = useNavigate();
    const location = useLocation();

    const queryString = location.search;
    const queryParams = new URLSearchParams(queryString);

    const nombrePassword = queryParams.get('nombre-password');
    const rutPassword = queryParams.get("rut-password")

    const { usuarioSesion } = useContext(ContextoUsuarioSesion); // Obtener el contexto de sesión del usuario
    const modalEliminarUsuarioRef = useRef();
    const [loading, setLoading] = useState(true);
    const [usuarios, setUsuarios] = useState([]);
    const [buscador, setBuscador] = useState("");

    const modalErrorRef = useRef();

    useEffect(() => {
        if(usuarioSesion == false){
            navigate("/login", { replace: true });
        }else if(usuarioSesion){
            if(esAdmin(usuarioSesion)){
                getData()
            }else{
                navigate("/", { replace: true });
            }
        }
    }, [usuarioSesion]);

    async function getData() {
        try {
            const response = await axios.get(`${URL_API}/usuario`, {
                headers: {
                    Authorization: `Bearer ${usuarioSesion.token}`
                }
            });
            const { data } = response;
            setUsuarios(data);
            setLoading(false);
        } catch (e) {
            console.log(e);
            mostrarErrorModal(modalErrorRef, e, navigate);
            setLoading(false);
        }
    }

    const filtrarUsuarios = (usuarios, filtro) => {
        const filtroSinTildes = quitarTildes(filtro.toLowerCase());
        return usuarios.filter((usuario) => quitarTildes(usuario.nombre.toLowerCase()).includes(filtroSinTildes));
    };

    return (
        <div className="d-flex flex-column h-100">
            <Navbar />
            <ModalError ref={modalErrorRef}></ModalError>
            {!loading
                ? <div className="container-fluid px-0 flex-grow-1">
                    <ModalEliminarUsuario ref={modalEliminarUsuarioRef} usuarios={usuarios} setUsuarios={setUsuarios}></ModalEliminarUsuario>
                    <div className="row g-0 position-relative h-100 justify-content-center">
                        <img className="mi_imagen_fondo position-absolute h-100" src={backgroundjpg} alt="background img" />
                        <div className="col-12 col-md-10 d-flex align-items-center">
                            <div className="w-100 ho_bg_white p-4 shadow my-0 my-md-3">
                                <h2 className="text-center">Listado de funcionarios</h2>
                                {(nombrePassword && rutPassword)&& 
                                    <div className="container-fluid px-0">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="alert alert-info">
                                                    <strong>Informacion:</strong> la <strong><em>constraseña</em></strong> del usuario <strong>{nombrePassword}</strong> de rut: <strong>{obtenerRutBonito(rutPassword)}</strong> ha sido cambiada correctamente. 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className="mi_search_container">
                                    <div className="mb-4 px-4">
                                        <Buscador value={buscador} setValue={setBuscador}></Buscador>
                                    </div>
                                </div>
                                <ul className="list-group list-group-flush" >
                                    {filtrarUsuarios(usuarios, buscador).map(usuario => (
                                        <ListaItem key={usuario._id} usuario={usuario} setUsuarios={setUsuarios} usuarios={usuarios} modalEliminar={modalEliminarUsuarioRef}></ListaItem>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                : <> Cargando...</>
            }
            <footer>
                <p>&copy; Villagra #455 Hospital Mulchen</p>
            </footer>
        </div>
    );
}

const quitarTildes = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export default Lista;
