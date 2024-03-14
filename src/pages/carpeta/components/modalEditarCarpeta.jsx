import { useEffect, useRef, useState, useContext, forwardRef, useImperativeHandle } from "react";
import axios from "axios";
import {URL_API} from "../../../constantes.js";
import { ContextoCarpeta } from "../carpetaSelector.jsx";
import Modal from "../../../components/modal.jsx";
import BotonCargando from "../../../components/botonCargando.jsx";
import Input from "../../../components/Input.jsx";
import { ContextoModalErrorRef, ContextoUsuarioSesion } from "../../../app.jsx";
import { mostrarErrorModal } from "../../../utils/utilsError.js";
import { useNavigate } from "react-router-dom";
const ModalEditarCarpeta = forwardRef(function(props, ref){
    useImperativeHandle(ref, function(){
        return {
            abrir,
            cerrar,
        };
    })
    const navigate = useNavigate()

    const modalErrorRef = useContext(ContextoModalErrorRef);
    const modalRef = useRef();

    // Estados

    const { carpeta, setCarpeta } = useContext(ContextoCarpeta);
    const {usuarioSesion, setUsuarioSesion} = useContext(ContextoUsuarioSesion);

    const [loading, setLoading] = useState(false);
    const [isNombreEditing, setIsNombreEditing] = useState(false);
    const [nombreInput, setNombreInput] = useState({ valor: "", estado: "vacio" });
    const [isDescripcionEditing, setIsDescripcionEditing] = useState(false);
    const [descripcionInput, setDescripcionInput] = useState({ valor: "", estado: "vacio" });
    const [inicialmenteConPortada, setInicialmenteConPortada] = useState(carpeta.conPortada);
    const [conPortada, setConPortada] = useState(carpeta.conPortada);
    
    useEffect(()=>{
        setConPortada(carpeta.conPortada);
        setInicialmenteConPortada(carpeta.conPortada)
        setIsDescripcionEditing(false);
        setIsNombreEditing(false);
    }, [carpeta])
    

    function abrir(){modalRef.current && modalRef.current.abrir()};

    function cerrar(){modalRef.current&&modalRef.current.cerrar()};

    function isValid() {
        const nuevoNombre = nombreInput.valor.trim();
        const nuevaDescripcion = descripcionInput.valor.trim();

        const nombreOriginal = carpeta.nombre;
        const descripcionOriginal = carpeta.descripcion;

        if (!isNombreEditing && !isDescripcionEditing && (inicialmenteConPortada === conPortada)) {
            return false;
        }

        if (isNombreEditing && (!nuevoNombre || nuevoNombre === nombreOriginal)) {
            return false;
        }

        if (isDescripcionEditing && (!nuevaDescripcion || (inicialmenteConPortada && nuevaDescripcion === descripcionOriginal))) {
            return false;
        }

        return true;
    }

    async function sendData(){
        try {
            setLoading(true);
            const peticion = {};
            const nuevoNombre = nombreInput.valor;
            if(isNombreEditing && nuevoNombre){
                peticion.nombre = nuevoNombre;
            }
            const nuevaDescripcion = descripcionInput.valor;
            if(isDescripcionEditing && nuevaDescripcion && conPortada){
                peticion.conPortada = true;
                peticion.descripcion = nuevaDescripcion;
            }
            const cambioEnPortada = inicialmenteConPortada != conPortada;
            if (cambioEnPortada && !conPortada) {
                peticion.conPortada = false;
            }
            console.log(peticion);
            const response = await axios.put(`${URL_API}/carpeta/${carpeta._id}`, peticion,{
                headers: {
                    Authorization: `Bearer ${usuarioSesion.token}`
                }
            });
            const { data } = response;
            setCarpeta(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            cerrar();

            mostrarErrorModal(modalErrorRef, error, navigate);
        }
    }

    function handleChangeConPortada(){
        const nuevoConPortada = !conPortada;
        if(!nuevoConPortada){
            setIsDescripcionEditing(false);
        }
        else if(!inicialmenteConPortada && nuevoConPortada){
            setIsDescripcionEditing(true);
        }
        setConPortada(nuevoConPortada);
    }

    return (
            <Modal ref={modalRef} isStatic={false}>
            <div className="modal-dialog">
                <div className="modal-content" style={{ border: "none" }} >
                    <div className="modal-header ho_bg_azul_3 justify-content-center position-relative">
                        <h5 className="modal-title ho_color_white ho_fs_20 fw-semibold" id="modalCarpetaLabel">
                        Editar carpeta
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
                            <div className="d-flex align-items-center ho_font_poppins ho_fs_20" style={{gap: "12px"}}>
                                {isNombreEditing
                                ?<>
                                    <Input input={nombreInput} setInput={setNombreInput} placeholder={"Nuevo nombre"} inputType={"text"} clasesInput={"ho_fs_20"}></Input>
                                    <svg onClick={()=>(setIsNombreEditing(false))} className="ho_color_azul_3" xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 24 24"><path fill="currentColor" d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"></path></svg>
                                </>
                                :<>
                                    <div className="ho_color_negro_muted">{carpeta.nombre}</div>
                                    <svg onClick={()=>(setIsNombreEditing(true))} className="ho_color_azul_3" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"></path></svg>
                                </>
                                }
                            </div>
                            <div className="d-flex flex-column" style={{gap: "4px"}}>
                                <div className="d-flex align-items-center ho_font_poppins ho_fs_20" style={{gap: "12px"}}>
                                    <div className="ho_fs_16 fw-medium">
                                        Portada
                                    </div>
                                    {conPortada
                                    ?<>
                                        {isDescripcionEditing
                                        ?
                                        <svg onClick={()=>{
                                            if(!inicialmenteConPortada){
                                                setConPortada(false);
                                            }
                                            setIsDescripcionEditing(false)
                                        }} className="ho_color_azul_3" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="currentColor" d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"></path></svg>
                                        :
                                        <svg onClick={()=>(setIsDescripcionEditing(true))} className="ho_color_azul_3" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"></path></svg>
                                        }
                                        <svg onClick={handleChangeConPortada} xmlns="http://www.w3.org/2000/svg" className="ho_color_azul_3" width="24px" height="24px" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path></svg>
                                    </>
                                    :
                                    <svg onClick={handleChangeConPortada} xmlns="http://www.w3.org/2000/svg" className="ho_color_azul_3" width="24px" height="24px" viewBox="0 0 24 24"><path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"></path></svg>
                                    }
                                </div>
                                {conPortada
                                &&
                                <div className="d-flex ho_font_poppins flex-column" style={{gap: "2px"}}>
                                    <div className={`ho_fs_14 ${!isDescripcionEditing&&"ho_color_negro_muted"}`}>
                                        Descripcion
                                    </div>
                                    {isDescripcionEditing
                                    ?
                                    <Input input={descripcionInput} setInput={setDescripcionInput} inputType={"textarea"} placeholder={"Nueva descripcion"} clasesInput={"ho_fs_14"}></Input>
                                    :<div className="ho_color_negro_muted ho_fs_14">
                                        {carpeta.descripcion}
                                    </div>
                                    }
                                </div>
                                }
                            </div>
                        </div>
                        <div className="d-flex justify-content-center" style={{ padding: "4px", height: "min-content", gap: "4px", }}>
                                <BotonCargando text={"Editar"} estilos={`ho_btn-small`} isDisabled={!isValid()} loading={loading} onClick={sendData}></BotonCargando>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
})
    



export default ModalEditarCarpeta;