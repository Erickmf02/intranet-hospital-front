import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.js";
import { useParams } from "react-router-dom";

function Toast({title, body}){
    const {id} = useParams()

    function show(){
        const toast = toastRef.current;
        if(toast){
            toast.show();
        }
    }

    function hide(){
        const toast = toastRef.current;
        if(toast){
            toast.hide();
        }
    }

    const elementRef = useRef();
    const toastRef = useRef();
    useEffect(()=>{
        const element = elementRef.current;
        if(element){
            const toast = new bootstrap.Toast(element);
            toastRef.current = toast;
            show();
        }
    }, [elementRef, id])
    return(
        <div className="toast" role="alert" aria-live="assertive" aria-atomic="true" ref={elementRef}>
            <div className="toast-header">
                <strong className="me-auto">{title}</strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
                {body}
            </div>
        </div>
    );
}

export default Toast;