import { useEffect, useRef, useState, useContext, forwardRef, useImperativeHandle } from "react";
import axios from "axios";
import {URL_API} from "../../../constantes.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContextoCarpeta } from "../carpetaSelector.jsx";
import Modal from "../../../components/modal.jsx";
import BotonCargando from "../../../components/botonCargando.jsx";
import { ContextoModalErrorRef, ContextoUsuarioSesion } from "../../../app.jsx";
import { mostrarErrorModal } from "../../../utils/utilsError.js";
const ModalEliminarArchivo = forwardRef(function(props, ref){
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
    const [archivoEliminar, setArchivoEliminar] = useState()
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState();
    

    function abrir(archivo, callback){
        if(modalRef.current){
            setCallback((prev)=>{return callback})
            setArchivoEliminar(archivo);
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
            if(!loading && archivoEliminar){
                setLoading(true);
                const response = await axios.delete(`${URL_API}/carpeta/archivo/${archivoEliminar._id}`,{
                    headers: {
                        Authorization: `Bearer ${usuarioSesion.token}`
                    }
                })
                const { data } = response;
                
                const nuevoArchivos = carpeta.archivos.filter(
                    archivo => archivo._id !== data._id
                );

                setCarpeta({...carpeta, archivos: nuevoArchivos});
                cerrar();
                if(callback){
                    callback();
                }
            }
        } catch (error) {
            console.log(error);
            cerrar();
            mostrarErrorModal(modalErrorRef, error, navigate);
        }finally{
            setLoading(false);
        }
    }

    return (
        <Modal ref={modalRef} isStatic={false}>
            <div className="modal-dialog">
                <div className="modal-content" style={{ border: "none" }} >
                    <div className="modal-header ho_bg_rojo_3 justify-content-center position-relative">
                        <h5 className="modal-title ho_color_white ho_fs_20 fw-semibold" id="modalEliminarArchivo">
                        Eliminar archivo
                        </h5>
                        <div className="ho_carta_carpeta_button_container position-absolute top-0 end-0 m-2">
                        <button className="ho_carta_carpeta_button" onClick={cerrar}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"></path>
                            </svg>
                        </button>
                        </div>
                    </div>
                    {archivoEliminar&&
                        <div className="modal-body d-flex flex-column" style={{ padding: "16px 0", gap: "16px" }} >
                        <div className="d-flex flex-column" style={{ gap: "16px", padding: "0 16px", }} >
                            <div className="alert alert-danger">
                                <p>¿Estas seguro de que quieres eliminar el archivo <Link to={`${URL_API}/carpeta/archivo/contenido/${archivoEliminar._id}?token=${usuarioSesion.token}`} className="alert-link" target="_blank"><em>{archivoEliminar.nombre}</em></Link>?</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center" style={{ padding: "4px", height: "min-content", gap: "4px", }}>
                                <BotonCargando text={"Eliminar archivo"} estilos={`ho_btn-red ho_btn-small`} isDisabled={loading || !archivoEliminar} loading={loading} onClick={eliminar}></BotonCargando>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </Modal>
    );
})
    



export default ModalEliminarArchivo;