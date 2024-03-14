import "./cartaCarpeta.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { URL_API } from "../../../constantes";
import { useContext } from "react";
import { ContextoModalEliminarCarpeta, ContextoCarpeta, ContextoEsAdmin } from "../carpetaSelector.jsx";
import { ContextoModalErrorRef, ContextoUsuarioSesion } from "../../../app";
import { esAdministradorDeCarpeta } from "../../../utils/carpeta";
import { mostrarErrorModal } from "../../../utils/utilsError.js";

function CartaCarpeta({ carpeta }){
    const navigate = useNavigate();
    const { _id, nombre } = carpeta;
    const modalEliminarCarpetaRef = useContext(ContextoModalEliminarCarpeta);
    const modalErrorRef = useContext(ContextoModalErrorRef)

    const {usuarioSesion, setUsuarioSesion} = useContext(ContextoUsuarioSesion);
    const {esAdmin, setEsAdmin} = useContext(ContextoEsAdmin);

    const { carpeta: carpetaPadre, setCarpeta: setCarpetaPadre } = useContext(ContextoCarpeta);



    async function eliminar(){
        try{
            if(carpeta.hijos.length > 0 || carpeta.archivos.length > 0){
                modalEliminarCarpetaRef.current.abrir(carpeta)
            }else{
                const response = await axios.delete(`${URL_API}/carpeta/${_id}`, {
                    headers: {
                        Authorization: `Bearer ${usuarioSesion.token}`
                    }
                })
            
                const nuevosHijos = carpetaPadre.hijos.filter(
                    hijo => hijo._id !== _id
                );

                const nuevoPadre = {...carpetaPadre};
                nuevoPadre.hijos = nuevosHijos;
                console.log(nuevoPadre);
                setCarpetaPadre(nuevoPadre);
            }
        }catch (error) {
            mostrarErrorModal(modalErrorRef, error, navigate);
        }
    }

    return(
        <div className="col">
            <div className="position-relative">
                {esAdmin&&
                <div className="ho_carta_carpeta_button_container btn-group dropup">
                    <button className="ho_carta_carpeta_button" data-bs-toggle="dropdown" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024"><path fill="currentColor" d="M899.4 638.2h-27.198c-2.2-.6-4.2-1.6-6.4-2c-57.2-8.8-102.4-56.4-106.2-112.199c-4.401-62.4 31.199-115.2 89.199-132.4c7.6-2.2 15.6-3.8 23.399-5.8h27.2c1.8.6 3.4 1.6 5.4 1.8c52.8 8.6 93 46.6 104.4 98.6c.8 4 2 8 3 12v27.2c-.6 1.8-1.6 3.6-1.8 5.4c-8.4 52-45.4 91.599-96.801 103.6c-5 1.2-9.6 2.6-14.2 3.8zM130.603 385.8l27.202.001c2.2.6 4.2 1.6 6.4 1.8c57.6 9 102.6 56.8 106.2 113.2c4 62.2-32 114.8-90.2 131.8c-7.401 2.2-15 3.8-22.401 5.6h-27.2c-1.8-.6-3.4-1.6-5.2-2c-52-9.6-86-39.8-102.2-90.2c-2.2-6.6-3.4-13.6-5.2-20.4v-27.2c.6-1.8 1.6-3.6 1.8-5.4c8.6-52.2 45.4-91.6 96.8-103.6c4.8-1.201 9.4-2.401 13.999-3.601m370.801.001h27.2c2.2.6 4.2 1.6 6.4 2c57.4 9 103.6 58.6 106 114.6c2.8 63-35.2 116.4-93.8 131.4c-6.2 1.6-12.4 3-18.6 4.4h-27.2c-2.2-.6-4.2-1.6-6.4-2c-57.4-8.8-103.601-58.6-106.2-114.6c-3-63 35.2-116.4 93.8-131.4c6.4-1.6 12.6-3 18.8-4.4"></path></svg>
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" onClick={eliminar}>Eliminar</a></li>
                    </ul>
                </div>
                }
                <Link to={`/carpeta/${_id}`} className="ho_carta_carpeta">
                    <div className="ho_carta_carpeta_color">

                    </div>
                    <div className="ho_carta_carpeta_texto ho_font_poppins">
                        { nombre }
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default CartaCarpeta;