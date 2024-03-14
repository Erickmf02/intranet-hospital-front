import { useEffect, useRef, useState, useContext, forwardRef, useImperativeHandle } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.js";
import axios from "axios";
import {URL_API} from "../../../constantes.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContextoCarpeta } from "../carpetaSelector.jsx";
import Modal from "../../../components/modal.jsx";
import BotonCargando from "../../../components/botonCargando.jsx";
import { ContextoModalErrorRef, ContextoUsuarioSesion } from "../../../app.jsx";
import { mostrarErrorModal } from "../../../utils/utilsError.js";
const ModalEliminarCarpeta = forwardRef(function(props, ref){
    useImperativeHandle(ref, function(){
        return {
            abrir,
            cerrar,
        };
    })
    const navigate = useNavigate();

    const {usuarioSesion, setUsuarioSesion} = useContext(ContextoUsuarioSesion);

    const modalErrorRef = useContext(ContextoModalErrorRef);
    const {carpeta, setCarpeta} = useContext(ContextoCarpeta);
    const modalRef = useRef();
    const [deleteFolder, setDeleteFolder] = useState()
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState();
    

    function abrir(carpeta, callback){
        if(modalRef.current){
            setCallback((prev)=>{return callback})
            setDeleteFolder(carpeta);
            modalRef.current.abrir();
        }
    }

    function cerrar(){
        if(modalRef.current){
            modalRef.current.cerrar();
        }
    }

    async function eliminar(){
        try {
            if(!loading && deleteFolder){
                setLoading(true);
                const response = await axios.delete(`${URL_API}/carpeta/${deleteFolder._id}`,{
                    headers: {
                        Authorization: `Bearer ${usuarioSesion.token}`
                    }
                })
                
                const carpetaContenedora = {
                    ...carpeta,
                };

                const nuevosHijos = carpetaContenedora.hijos.filter(
                    hijo => hijo._id !== deleteFolder._id
                );

                const nuevaCarpetaContenedora = {...carpetaContenedora};
                nuevaCarpetaContenedora.hijos = nuevosHijos;
                setCarpeta(nuevaCarpetaContenedora);
                setLoading(false);
                cerrar();
                if(callback){
                    callback();
                }
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            cerrar();
            mostrarErrorModal(modalErrorRef, error, navigate);
        }
    }

    return (
        <Modal ref={modalRef} isStatic={false}>
            <div className="modal-dialog">
                <div className="modal-content" style={{ border: "none" }} >
                    <div className="modal-header ho_bg_rojo_3 justify-content-center position-relative">
                        <h5 className="modal-title ho_color_white ho_fs_20 fw-semibold" id="modalCarpetaLabel">
                        Eliminar carpeta
                        </h5>
                        <div className="ho_carta_carpeta_button_container position-absolute top-0 end-0 m-2">
                        <button className="ho_carta_carpeta_button" onClick={cerrar}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"></path>
                            </svg>
                        </button>
                        </div>
                    </div>
                    {deleteFolder&&
                        <div className="modal-body d-flex flex-column" style={{ padding: "16px 0", gap: "16px" }} >
                        <div className="d-flex flex-column" style={{ gap: "16px", padding: "0 16px", }} >
                            <div className="alert alert-danger">
                                <p><strong></strong>Verifica si la carpeta <Link to={`/carpeta/${deleteFolder._id}`} className="alert-link"><em>{deleteFolder.nombre}</em></Link> tiene <strong>archivos</strong> o <strong>carpetas</strong> a dentro, ¿estas seguro de eliminarla?</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center" style={{ padding: "4px", height: "min-content", gap: "4px", }}>
                                <BotonCargando text={"Eliminar carpeta"} estilos={`ho_btn-red ho_btn-small`} isDisabled={loading || !deleteFolder} loading={loading} onClick={eliminar}></BotonCargando>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </Modal>
    );
})
    



export default ModalEliminarCarpeta;