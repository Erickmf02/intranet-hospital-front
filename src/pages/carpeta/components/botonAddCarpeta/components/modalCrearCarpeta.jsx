import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { URL_API } from "../../../../../constantes.js";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

import Modal from "../../../../../components/modal.jsx";
import Input from "../../../../../components/Input.jsx"
import BotonCargando from "../../../../../components/botonCargando.jsx"
import Checkbox from "../../../../../components/checkbox.jsx";
import ListaRadio from "../../../../../components/listaRadio.jsx";

import { ContextoCarpeta } from "../../../carpetaSelector.jsx";
import { ContextoModalErrorRef, ContextoUsuarioSesion } from "../../../../../app.jsx";
import { mostrarErrorModal } from "../../../../../utils/utilsError.js";


const ModalCrearCarpeta = forwardRef(function(props, ref){
    useImperativeHandle(ref, function(){
        return {
            abrir,
            cerrar,
        };
    })
    const {usuarioSesion, setUsuarioSesion} = useContext(ContextoUsuarioSesion);
    const navigate = useNavigate()
    const {id} = useParams()
    const modalErrorRef = useContext(ContextoModalErrorRef)
    const {carpeta, setCarpeta} = useContext(ContextoCarpeta);
    const modalRef = useRef();

    const [loading, setLoading] = useState(false);
    const [nombreInput, setNombreInput] = useState({
        valor: "",
        estado: "vacio"
    })
    const [tipo, setTipo] = useState("");
    const [conPortada, setConPortada] = useState(false);
    const [descripcionInput, setDescripcionInput] = useState({
        valor: "",
        estado: "vacio"
    })
    const [carpetaCreada, setCarpetaCreada] = useState();
    function formularioValido() {
        const nombre = nombreInput.valor;
        if(!nombre || !tipo){
            return false;
        }
        if(conPortada){
            const descripcion = descripcionInput.valor;
            if(!descripcion){
                return false;
            }
        }
        return true;
    }

    async function enviarFormulario() {
        try {
            setLoading(true);
            const nombre = nombreInput.valor.trim();
        
            const carpetaContenedora = {
                ...carpeta,
            };

            let nuevoNombre = nombre;
            let contador = 1;
        
            const nombresExistentes = carpetaContenedora.hijos.map((hijo) => hijo.nombre);
        
            while (nombresExistentes.includes(nuevoNombre)) {
                nuevoNombre = `${nombre} (${contador})`;
                contador++;
            }
        
            const nuevaCarpeta = {
                nombre: nuevoNombre,
                tipo: tipo,
                padre: carpeta._id,
            };
        
            if (conPortada) {
                nuevaCarpeta.conPortada = true;
                nuevaCarpeta.descripcion = descripcionInput.valor;
            }
        
            const response = await axios.post(`${URL_API}/carpeta`, nuevaCarpeta, {
                headers: {
                    Authorization: `Bearer ${usuarioSesion.token}`
                }
            });
        
            carpetaContenedora.hijos.unshift(response.data);
            setCarpetaCreada(response.data);
            setCarpeta(carpetaContenedora);
            setLoading(false);
        } catch (e) {
            console.log(e)
            cerrar();

            setNombreInput({ valor: "",estado: "vacio" })
            setTipo("");
            setConPortada(false);
            setDescripcionInput({ valor: "",estado: "vacio" })
            
            setLoading(false);

            mostrarErrorModal(modalErrorRef, e, navigate );
        }
    }

    useEffect(()=>{
        setNombreInput({
            valor: "",
            estado: "vacio"
        })
        setTipo("");
        setConPortada(false);
        setDescripcionInput({
            valor: "",
            estado: "vacio"
        })
    },[id])

    function abrir(){
        if(modalRef.current){
            modalRef.current.abrir();
        }
    }

    function cerrar(){
        if(modalRef.current){
            modalRef.current.cerrar();
        }
    }

    return (
            <Modal ref={modalRef} isStatic={false} afterModalClosed={()=>setCarpetaCreada(null)}>
            <div className="modal-dialog">
                <div className="modal-content" style={{ border: "none" }} >
                    <div className="modal-header ho_bg_azul_3 justify-content-center position-relative">
                        <h5 className="modal-title ho_color_white ho_fs_20 fw-semibold" id="modalCarpetaLabel">
                        Crear carpeta
                        </h5>
                        <div className="ho_carta_carpeta_button_container position-absolute top-0 end-0 m-2">
                        <button className="ho_carta_carpeta_button" onClick={cerrar}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"></path>
                            </svg>
                        </button>
                        </div>
                    </div>
                    <div className="modal-body d-flex flex-column" style={{ padding: "16px 0", gap: "16px" }} >
                        <div className="d-flex flex-column" style={{ gap: "16px", padding: "0 16px", }} >
                            <Input input={nombreInput} setInput={setNombreInput} inputType={"text"} placeholder={"Nombre carpeta."} clasesInput={"ho_fs_20"} isDisabled={loading}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h6l2 2h8q.825 0 1.413.588T22 8v10q0 .825-.587 1.413T20 20z"></path>
                                </svg>
                            </Input>
                            <div className="d-flex flex-column" style={{ gap: "8px", }} >
                                <div className="ho_font_poppins ho_fs_16 fw-medium">Tipo carpeta</div>
                                <div className="w-100 d-flex flex-column" style={{gap: "2px"}}>
                                    <ListaRadio value={tipo} setValue={setTipo} list={[{key: "carpetas", help: "lol", texto: "Carpeta contenedora de carpetas."}, {key: "archivos", help: "lol", texto: "Carpeta contenedora de archivos."}]}></ListaRadio>
                                </div>
                            </div>
                            <div className="d-flex flex-column" style={{ gap: "8px", }}>
                                <div className="ho_font_poppins ho_fs_16 fw-medium">Portada</div>
                                <div style={{gap: "2px"}}>
                                    <Checkbox value={conPortada} setValue={setConPortada} texto={"¿Desea agregar portada?"} help={"lol"}></Checkbox>
                                </div>
                                {conPortada &&
                                <Input input={descripcionInput} setInput={setDescripcionInput} inputType={"textarea"} placeholder={"Descripcion."} clasesInput={"ho_fs_16"} label={"Descripcion"} isDisabled={loading}>
                                </Input>
                                }
                            </div>
                            {carpetaCreada&&
                            <div className="alert alert-info">
                                <strong>Informacion:</strong> La carpeta <Link to={`/carpeta/${carpetaCreada._id}`} className="alert-link"><em>{carpetaCreada.nombre}</em></Link> ha sido creada correctamente.
                            </div>  
                            }
                        </div>
                        <div className="d-flex justify-content-center" style={{ padding: "4px", height: "min-content", gap: "4px", }}>
                                <BotonCargando text={"Crear carpeta"} isDisabled={!formularioValido()} loading={loading} onClick={enviarFormulario}></BotonCargando>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
});

export default ModalCrearCarpeta;