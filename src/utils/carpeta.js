export function esAdministradorDeCarpeta( usuario, carpeta ) {
    try {        
        const { roles, _id } = usuario;

        if (roles.some(rol => rol._id == "000000000000000000000001")) return true;
        
        const { administradores } = carpeta;

        if(administradores.some(usuario => usuario._id == _id)) return true;

        const { padre } = carpeta;
        return padre ? esAdministradorDeCarpeta( usuario, padre) : false;
    } catch (error) {
        console.error(error);
        return false;
    }
}