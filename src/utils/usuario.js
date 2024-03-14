export function esAdmin(usuario){
    try {
        const { roles } = usuario;
        return roles.some(rol => rol._id == "000000000000000000000001");
    } catch (error) {
        return false;
    }
}

export function obtenerRutBonito(rut) {
    rut = rut.toString();

    let formateado = '';
    let contador = 0;
    
    for (let i = rut.length - 2; i >= 0; i--) {
        formateado = rut.charAt(i) + formateado;
        contador++;
        if (contador % 3 === 0 && i !== 0) {
            formateado = '.' + formateado;
        }
    }
    
    return formateado + '-' + rut.slice(-1);
}