import { useContext, useEffect, useState } from "react";
import Input from "../../../components/Input";
import BotonCargando from "../../../components/botonCargando";
import axios from "axios";
import { URL_API } from "../../../constantes";
import { Link } from "react-router-dom";
import { ContextoUsuarioSesion } from "../../../app";

function ListaItem({usuario, usuarios, setUsuarios, modalEliminar}){
    const {usuarioSesion, setUsuarioSesion} = useContext(ContextoUsuarioSesion);
    const { nombre, _id, rut } = usuario;
    const [loading, setLoading] = useState(false);
    const [editando, setEditando] = useState(false);
    const [nuevoNombreInput, setNuevoNombreInput] = useState({
        valor: "",
        estado: "vacio"
    });

    async function editarUsuario(){
        try {
            setLoading(true);
            const response = await axios.put(`${URL_API}/usuario/${_id}`, {
                nombre: nuevoNombreInput.valor
            },{
                headers: {
                    Authorization: `Bearer ${usuarioSesion.token}`
                }
            })
            const nuevosUsuarios = [...usuarios];

            const usuarioActualizado = response.data;
            const index = nuevosUsuarios.findIndex(usuario => usuario._id === usuarioActualizado._id);
            if (index !== -1) {
                nuevosUsuarios[index] = usuarioActualizado;
                setUsuarios(nuevosUsuarios);
            }
            setNuevoNombreInput({
                valor: "",
                estado: "vacio"
            });
            setEditando(false);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }
    function validarEditar(){
        const nombre = nuevoNombreInput.valor;
        return nombre.length>0
    }

    return (
        <li className="list-group-item ho_font_poppins">
            {editando
            ?<div className="d-flex align-items-center" style={{gap: "12px"}}>
                {nombre}
                <div className="flex-grow-1">
                    <Input input={nuevoNombreInput} setInput={setNuevoNombreInput} placeholder={"Nuevo nombre"} inputType={"text"} clasesInput={"ho_fs_20"}></Input>
                </div>
                <BotonCargando text={"Cancelar"} estilos={"ho_btn-small"} onClick={ () => setEditando(false) }></BotonCargando>
                <BotonCargando loading={loading} isDisabled={!validarEditar()} text={"Editar nombre"} estilos={"ho_btn-small"} onClick={ editarUsuario }></BotonCargando>
            </div>
            :<div className="container-fluid mx-0">
                <div className="row g-0">
                    <div className="col-12 col-md text-center text-md-start">
                        <Link to={`/usuario/${_id}`} style={{textDecoration: "none", color: "inherit"}}>{nombre}</Link>
                    </div>
                    <div className="col-12 col-md-auto text-center">
                        <Link to={`/contraseña?id=${_id}&nombre=${nombre}&rut=${rut}`} className="ho_color_azul_3">Cambiar contraseña</Link>
                        <button className="mi_boton_editar ho_color_azul_3" onClick={ () => setEditando(true) }>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 19h1.098L16.796 8.302l-1.098-1.098L5 17.902zm-1 1v-2.52L17.18 4.288q.154-.137.34-.212q.186-.075.387-.075q.202 0 .39.063q.19.064.35.23l1.066 1.072q.166.16.226.35q.061.191.061.382q0 .203-.069.389q-.068.185-.218.339L6.52 20zM19.02 6.092l-1.112-1.111zm-2.783 1.67l-.539-.558l1.098 1.098z"/></svg>
                        </button>

                        <button className="mi_boton_eliminar ho_color_azul_3" onClick={() => modalEliminar.current.abrir(usuario)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/></svg>
                        </button>
                    </div>
                </div>
            </div>
            }
        </li>
    );
}

export default ListaItem;