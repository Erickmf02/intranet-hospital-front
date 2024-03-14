import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Modal from "./modal.jsx";
import BotonCargando from "./botonCargando.jsx";

const ModalError = forwardRef(function(props, ref){
    useImperativeHandle(ref, function(){
        return {
            abrir,
            cerrar,
        };
    })
    const modalRef = useRef();

    const [error, setError] = useState();
    const [sugerencia, setSugerencia] = useState();
    const [onCloseCallback, setOnCloseCallback] = useState();

    function abrir(error, sugerencia, onClose){
        if(modalRef.current){
            setError(error);
            setSugerencia(sugerencia);
            if(onClose){
                setOnCloseCallback(()=>onClose);
            }
            modalRef.current.abrir();
        }
    }

    function cerrar(){
        if(modalRef.current){
            if (onCloseCallback) {
                onCloseCallback();
            }
            modalRef.current.cerrar();
        }
    }

    function onCloseEnd(){
        setError();
        setSugerencia();
        setOnCloseCallback();
    }
    return (
        <Modal ref={modalRef} afterModalClosed={onCloseEnd} isStatic={false} >
            <div className="modal-dialog">
                <div className="modal-content" style={{ border: "none" }} >
                    <div className="modal-header ho_bg_azul_5 justify-content-center position-relative">
                        <h5 className="modal-title ho_color_white ho_fs_20 fw-semibold" id="modalCarpetaLabel">
                            ¡ERROR!
                        </h5>
                        <div className="ho_carta_carpeta_button_container position-absolute top-0 end-0 m-2">
                        <button className="ho_carta_carpeta_button" onClick={()=>{cerrar()}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"></path>
                            </svg>
                        </button>
                        </div>
                    </div>
                    <div className="modal-body d-flex flex-column" style={{ padding: "16px 0", gap: "16px" }} >
                        <div className="d-flex flex-column text-center" style={{ gap: "12px", padding: "0 12px", }} >
                            <div className="ho_font_poppins ho_fs_16">
                                {error}
                            </div>
                            <div className="ho_color_azul_3 fw-semibold ho_font_poppins ho_fs_16">
                                {sugerencia}
                            </div>
                        </div>
                        <div className="d-flex justify-content-center" style={{ padding: "4px", height: "min-content", gap: "4px", }}>
                            <BotonCargando estilos={"ho_btn-small"} text={"Aceptar"} onClick={()=>cerrar()}></BotonCargando>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
});

export default ModalError;