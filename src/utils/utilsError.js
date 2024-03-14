/**
 * Muestra un mensaje de error en un modal.
 * @param {React.RefObject} modalRef - La referencia al modal de error.
 * @param {Error} error - El error recibido para mostrar el mensaje adecuado.
 * @param {Function} [callback] - Función opcional a ejecutar después de mostrar el modal de error.
 * @returns {void}
 */
export function mostrarErrorModal(modalRef, error, navigate, callback) {
    let errorMessage = "Error desconocido";
    let suggestionMessage = "Por favor, refresque la página";

    const response = error.response;

    if (response) {
        const { status, data } = response;
        //no autorizado
        if (status === 401) {
            navigate('/login');
            return;
        } else if (data) {
            const { error, sugerencia } = data;

            if (error && sugerencia) {
                errorMessage = error;
                suggestionMessage = sugerencia;
            }
        }
    }
    
    if (callback) {
        modalRef.current.abrir(errorMessage, suggestionMessage, callback);
    } else {
        modalRef.current.abrir(errorMessage, suggestionMessage);
    }
}
