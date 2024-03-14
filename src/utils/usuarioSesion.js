export function guardarUsuarioSesion(usuario) {
    try {
        localStorage.setItem("usuarioSesion", JSON.stringify(usuario));
    } catch (error) {
        console.log(error);
    }
}

export function obtenerUsuarioSesion() {
    try {
        const usuarioSesionString = localStorage.getItem("usuarioSesion");
        const usuarioSesion = JSON.parse(usuarioSesionString);
        return usuarioSesion;
    } catch (error) {
        console.log(error);
    }
}

export function eliminarUsuarioSesion() {
    try {
        localStorage.removeItem("usuarioSesion");
    } catch (error) {
        console.log(error);
    }
}