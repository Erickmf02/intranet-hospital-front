import { forwardRef, useContext, useImperativeHandle, useRef, useState } from "react";
import Modal from "../../../components/modal";
import axios from "axios";
import { URL_API } from "../../../constantes";
import { Link, useNavigate } from "react-router-dom";
import BotonCargando from "../../../components/botonCargando";
import { ContextoModalErrorRef, ContextoUsuarioSesion } from "../../../app";
import { obtenerRutBonito } from "../../../utils/usuario";
import { mostrarErrorModal } from "../../../utils/utilsError";

const ModalEliminarUsuario = forwardRef(function({usuarios, setUsuarios}, ref){
    useImperativeHandle(ref, function(){
        return{
            abrir,
            cerrar
        }
    })
    const navigate = useNavigate();
    const modalErrorRef = useContext(ContextoModalErrorRef);
    const modalRef = useRef();
    function abrir(usuario){
        try {
            const modal = modalRef.current;
            if(modal){
                setUsuario(usuario);
                modal.abrir();
            }
        } catch (e) {
            console.log(e)
        }
    }
    function cerrar(){
        try {
            const modal = modalRef.current;
            if(modal){
                modal.cerrar();
            }
        } catch (e) {
            console.log(e);
        }
    }

    const {usuarioSesion, setUsuarioSesion} = useContext(ContextoUsuarioSesion);
    const [loading, setLoading] = useState(false);
    const [usuario, setUsuario] = useState();

    async function eliminar(){
        try {
            setLoading(true);
            const response = await axios.delete(`${URL_API}/usuario/${usuario._id}`, {
                headers: {
                    Authorization: `Bearer ${usuarioSesion.token}`
                }
            });
            const usuarioEliminado = response.data;
            const nuevosUsuarios = usuarios.filter(u => u._id != usuarioEliminado._id);
            setUsuarios(nuevosUsuarios);
            
        } catch (e) {
            mostrarErrorModal(modalErrorRef, e, navigate);
        }finally{
            setLoading(false);
            cerrar()
        }
    }

    return(
        <Modal ref={modalRef}>
            <div className="modal-dialog">
                <div className="modal-content" style={{ border: "none" }} >
                    <div className="modal-header ho_bg_rojo_3 justify-content-center position-relative">
                        <h5 className="modal-title ho_color_white ho_fs_20 fw-semibold" id="modalCarpetaLabel">
                        Eliminar usuario
                        </h5>
                        <div className="ho_carta_carpeta_button_container position-absolute top-0 end-0 m-2">
                        <button className="ho_carta_carpeta_button" onClick={cerrar}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"></path>
                            </svg>
                        </button>
                        </div>
                    </div>
                    {usuario&&
                        <div className="modal-body d-flex flex-column" style={{ padding: "16px 0", gap: "16px" }} >
                        <div className="d-flex flex-column" style={{ gap: "16px", padding: "0 16px", }} >
                            <div className="alert alert-danger">
                                <p><strong></strong>¿Estas seguro de que quieres eliminar el usuario <Link to={`/usuario/${usuario._id}`} className="alert-link"><em>{usuario.nombre}</em></Link>{` de rut: ${obtenerRutBonito(usuario.rut)}?`}</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center" style={{ padding: "4px", height: "min-content", gap: "4px", }}>
                                <BotonCargando text={"Eliminar usuario"} estilos={`ho_btn-red ho_btn-small`} isDisabled={loading} loading={loading} onClick={eliminar}></BotonCargando>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </Modal>
    );
});

export default ModalEliminarUsuario;