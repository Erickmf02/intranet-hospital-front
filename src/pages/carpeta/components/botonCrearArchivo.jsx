import { useContext, useEffect, useState } from "react";
import { ContextoCarpeta } from "../carpetaSelector";
import { ContextoUsuarioSesion } from "../../../app";
import axios from "axios";
import { URL_API } from "../../../constantes";

function BotonCrearArchivo(){
    const {carpeta, setCarpeta} = useContext(ContextoCarpeta);
    const {usuarioSesion, setUsuarioSesion} = useContext(ContextoUsuarioSesion);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    useEffect(()=>{
        if(selectedFile){
            sendData();
        }
    }, [selectedFile])

    async function sendData(){
        try {
            if(!loading){
                setLoading(true);
                const { _id } = carpeta;
                const formData = new FormData();
                formData.append('id', _id);
                formData.append('archivo', selectedFile);
                const response = await axios.post(`${URL_API}/carpeta/archivo/${_id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${usuarioSesion.token}`
                    }
                });
                const { data } = response;
                const nuevaCarpeta = {...carpeta};
                nuevaCarpeta.archivos = [data ,...carpeta.archivos];
                console.log(nuevaCarpeta);
                setCarpeta(nuevaCarpeta);
                setSelectedFile(null);
            }
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    return(
        <>
        <label htmlFor="Archivo" role="button" className={`ho_btn ho_btn-blue ho_btn-small d-flex align-items-center ${loading&&"ho_btn-disabled"}`}>
            {loading&&
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            }
            <svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 16 16"><path fill="currentColor" d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"></path></svg>
            Agregar archivo
        </label>
        <input type="file" id="Archivo" onChange={handleFileChange} className="d-none"/>
        </>
    );
}

export default BotonCrearArchivo;