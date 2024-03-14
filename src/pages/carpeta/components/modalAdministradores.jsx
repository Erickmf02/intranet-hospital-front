import "./modalAdministradores.css"

import Modal from "../../../components/modal";
import BotonCargando from "../../../components/botonCargando";
import Buscador from "../../../components/buscador";
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import axios from "axios";
import { URL_API } from "../../../constantes";
import { useNavigate } from "react-router-dom";
import { ContextoModalErrorRef, ContextoUsuarioSesion } from "../../../app";
import { mostrarErrorModal } from "../../../utils/utilsError";
import { ContextoCarpeta } from "../carpetaSelector";
import { obtenerRutBonito } from "../../../utils/usuario";

const ModalAdministradores = forwardRef(function(props, ref){
    const modalRef = useRef();
    // Funciones de control del modal
    useImperativeHandle(ref, () => ({
        abrir,
        cerrar
    }));

    function abrir() {
        modalRef.current.abrir();
    }

    function cerrar() {
        modalRef.current.cerrar();
    }

    const navigate = useNavigate();
    const modalErrorRef = useContext(ContextoModalErrorRef);
    
    // Componente
    const {carpeta, setCarpeta} = useContext(ContextoCarpeta)
    const { usuarioSesion, setUsuarioSesion } = useContext(ContextoUsuarioSesion);
    const [loading, setLoading] = useState(false);
    const [usuariosIniciales, setUsuariosIniciales] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [administradores, setAdministradores] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [buscador, setBuscador] = useState("");

    useEffect(() => {
        obtenerDatos();
    }, []);

    useEffect(() => {
        const administradores = carpeta.administradores;

        const administradoresIds = administradores.map(administrador => administrador._id);
        const usuariosNoAdministradores = usuariosIniciales.filter(usuario => !administradoresIds.includes(usuario._id));
        
        setUsuarios(usuariosNoAdministradores);
        setAdministradores(administradores);
    }, [carpeta]);

    const filtrarUsuarios = (usuarios, filtro) => {
        const filtroSinTildes = quitarTildes(filtro.toLowerCase());
        return usuarios.filter((usuario) => quitarTildes(usuario.nombre.toLowerCase()).includes(filtroSinTildes));
    };

    async function obtenerDatos() {
        try {
            const response = await axios.get(`${URL_API}/usuario`, {
                headers: { Authorization: `Bearer ${usuarioSesion.token}` }
            });
            const { data } = response;

            const administradoresIds = carpeta.administradores.map(administrador => administrador._id);
            const usuariosNoAdministradores = data.filter(usuario => !administradoresIds.includes(usuario._id));
            
            setUsuariosIniciales(data);
            setUsuarios(usuariosNoAdministradores);
        } catch (error) {
            console.log(error);
        }
    }

    async function enviarFormulario() {
        try {
            setLoading(true);
            const peticion = { ...carpeta };

            if(administradores.some(admin => admin._id === selectedUser._id)) {
                peticion.administradores = administradores.filter(usuario => usuario._id !== selectedUser._id);
            } else {
                peticion.administradores = [selectedUser._id, ...administradores.map(admin => admin._id)];
            }

            const response = await axios.put(`${URL_API}/carpeta/${carpeta._id}`, peticion, {
                headers: { Authorization: `Bearer ${usuarioSesion.token}` }
            });
            const { data } = response;
            setSelectedUser(null);
            setCarpeta(data);
        } catch (error) {
            console.log(error);
            cerrar();
            mostrarErrorModal(modalErrorRef, error, navigate);
        } finally {
            setLoading(false);
        }
    }
    return (
        <Modal ref={modalRef}>
            <div className="modal-dialog">
                <div className="modal-content ho_font_poppins" style={{border: "none", overflow: "hidden", backgroundColor: "#F0F1F6"}}>
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12">
                                    <div className="d-flex justify-content-center p-2 ho_bg_azul_5 ho_color_white fw-semibold ho_fs_20 position-relative">
                                        Administradores
                                        <div className="ho_carta_carpeta_button_container position-absolute top-50 end-0 translate-middle-y">
                                            <button className="ho_carta_carpeta_button" onClick={cerrar}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="d-flex p-2 flex-column" style={{gap: "24px"}}>
                                        <div className="d-flex flex-column w-100" style={{gap: "10px"}}>
                                            <div className="d-flex justify-content-center ho_fs_20 fw-semibold">Usuarios</div>
                                            <Buscador value={buscador} setValue={setBuscador}></Buscador>
                                            <div className="ho_contenedor_usuarios rounded">
                                                {filtrarUsuarios(usuarios, buscador).map(usuario=>(
                                                    <div className={`ho_usuario_item ${usuario===selectedUser&&"ho_usuario_item-selected"}`} key={usuario._id} onClick={()=> setSelectedUser(usuario)}>
                                                        <div className="ho_fs_16"><strong>Nombre:</strong>{` ${usuario.nombre}`}</div>
                                                        <div className="ho_fs_14"><strong>{`Rut: ${obtenerRutBonito(usuario.rut)}`}</strong></div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 d-flex justify-content-center">
                                                <BotonCargando text={!selectedUser?"seleccione": administradores.includes(selectedUser)?"Quitar de administradores" :"Agregar a administradores" } estilos={"ho_btn-small"} loading={loading} onClick={enviarFormulario} isDisabled={!selectedUser}>
                                                    {selectedUser
                                                    &&<>
                                                        {administradores.includes(selectedUser)
                                                        ?<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M8 .5L.5 8H5v8h6V8h4.5z"></path></svg>
                                                        :<svg style={{ transform: 'rotate(180deg)' }} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M8 .5L.5 8H5v8h6V8h4.5z"></path></svg>
                                                        }
                                                    </>
                                                    }
                                                </BotonCargando>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column w-100">
                                            <div className="d-flex justify-content-center ho_fs_20 fw-semibold">Administradores</div>
                                            <div className="ho_contenedor_admins rounded">
                                            {administradores.map(usuario=>{
                                                const esUsuarioSesion = usuario._id == usuarioSesion._id;
                                                const isSelected = usuario===selectedUser;

                                                return (
                                                    <div className={`ho_usuario_item ${isSelected&&"ho_usuario_item-selected"} ${esUsuarioSesion&&"opacity-50 no_e" }`} key={usuario._id} onClick={()=> setSelectedUser(usuario)}>
                                                        <div className="ho_fs_16"><strong>Nombre:</strong>{` ${usuario.nombre}`}</div>
                                                        <div className="ho_fs_14"><strong>{`Rut: ${obtenerRutBonito(usuario.rut)}`}</strong></div>
                                                    </div>
                                                );
                                            })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
});

const quitarTildes = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export default ModalAdministradores;