import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useParams } from "react-router-dom";
import bootstrap from "bootstrap/dist/js/bootstrap.js";

/**
 * Componente Modal reutilizable para la creación de modales.
 *
 * @component
 * @example
 * // Ejemplo de uso
 * const modalRef = useRef();
 * <Modal ref={modalRef} afterModalClosed={() => console.log('Modal cerrado')}>
 *   Contenido del modal...
 * </Modal>
 * modalRef.current.abrir(); // Abre el modal
 * modalRef.current.cerrar(); // Cierra el modal
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido del modal.
 * @param {function} props.afterModalClosed - Función que se ejecuta después de que el modal se ha cerrado completamente.
 * @param {boolean} props.isStatic - Indica si el fondo del modal debe ser estático (no se cierra haciendo clic fuera del modal).
 * @returns {JSX.Element} - El componente Modal.
 */
const Modal = forwardRef(function ({children, afterModalClosed, isStatic}, ref) {
    const {id} = useParams();
    useImperativeHandle(ref, function () {
        return {
            abrir,
            cerrar
        };
    });

    const modalElementRef = useRef();
    const modalRef = useRef();

    useEffect(function() {
        try {
            const modalElement = modalElementRef.current;
            if (modalElement) {
                const modal = new bootstrap.Modal(modalElement);
                modalRef.current = modal;
                modalElement.addEventListener('hidden.bs.modal', handleAfterModalClosed)

                return function(){
                    cerrar();
                    modalElement.removeEventListener('hidden.bs.modal', handleAfterModalClosed);
                }
            }
        } catch (error) {
            console.log(error);
        }
    },[modalElementRef, id]);

    function abrir() {
        try {
            const modal = modalRef.current;
            modal.show();
        } catch (error) {
            console.log(error);
        }
    }

    function cerrar() {
        try {
            const modal = modalRef.current;
            modal.hide();
        } catch (error) {
            console.log(error);
        }
    }

    const handleAfterModalClosed = (event)=>{
        try {
            if(afterModalClosed){
                afterModalClosed();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return <div className={`modal fade`} {...(isStatic ? { 'data-bs-backdrop': 'static' } : {})} tabIndex="-1" aria-labelledby="modalCarpetaLabel" aria-hidden="true" ref={modalElementRef}>
        {children}
    </div>;
});

export default Modal;
