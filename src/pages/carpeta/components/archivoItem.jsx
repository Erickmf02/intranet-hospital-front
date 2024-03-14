import { Link } from "react-router-dom";
import { URL_API } from "../../../constantes";
import { useContext } from "react";
import { ContextoUsuarioSesion } from "../../../app";
import IconButtonDropUp from "../../../components/iconButtonDropUp";
import { ContextoModalEliminarArchivoRef } from "../carpetaArchivos";
import { ContextoEsAdmin } from "../carpetaSelector";

function ArchivoItem({archivo}){
    const {usuarioSesion, setUsuarioSesion} = useContext(ContextoUsuarioSesion);
    const modalEliminarArchivoRef = useContext(ContextoModalEliminarArchivoRef);
    const {esAdmin, setEsAdmin} = useContext(ContextoEsAdmin);
    return(
        <div className="container-fluid p-0">
            <div className="row g-3">
                <div className="col-12">
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="position-relative w-50 h-50 ">
                            {esAdmin&&
                            <div className="m-2 position-absolute top-0 end-0 z-1">
                                <div className="dropup">
                                    <IconButtonDropUp clases={"ho_ibtn_drop-azul ho_ibtn_drop-sm"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M5 10c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m14 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m-7 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2"></path></svg>
                                    </IconButtonDropUp>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a type="button" className="dropdown-item" onClick={()=>{modalEliminarArchivoRef.current.abrir(archivo)}}>Eliminar</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            }
                            <Link className="d-block ratio ratio-1x1 hover_outline_azul_3 rounded-4 shadow  ho_bg_white" to={`${URL_API}/carpeta/archivo/contenido/${archivo._id}?token=${usuarioSesion.token}`} target="_blank" style={{color: "inherit"}}>
                                <div className="d-flex align-items-center justify-content-center w-100 h-100">
                                    <div className="w-50 h-50">
                                        {renderExtensionIcon()}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="fw-medium ho_font_poppins text-center ho_color_azul_3">
                        {archivo.nombre}
                    </div>
                </div>
            </div>
        </div>
    );

    function renderExtensionIcon() {
        const {extension} = archivo;
        const clases = "w-100 h-100 ho_color_azul_3";
        switch (extension) {
            case "pdf":
                return (
                    <svg className={clases} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15"><path fill="currentColor" d="M2.5 6.5V6H2v.5zm4 0V6H6v.5zm0 4H6v.5h.5zm7-7h.5v-.207l-.146-.147zm-3-3l.354-.354L10.707 0H10.5zM2.5 7h1V6h-1zm.5 4V8.5H2V11zm0-2.5v-2H2v2zm.5-.5h-1v1h1zm.5-.5a.5.5 0 0 1-.5.5v1A1.5 1.5 0 0 0 5 7.5zM3.5 7a.5.5 0 0 1 .5.5h1A1.5 1.5 0 0 0 3.5 6zM6 6.5v4h1v-4zm.5 4.5h1v-1h-1zM9 9.5v-2H8v2zM7.5 6h-1v1h1zM9 7.5A1.5 1.5 0 0 0 7.5 6v1a.5.5 0 0 1 .5.5zM7.5 11A1.5 1.5 0 0 0 9 9.5H8a.5.5 0 0 1-.5.5zM10 6v5h1V6zm.5 1H13V6h-2.5zm0 2H12V8h-1.5zM2 5V1.5H1V5zm11-1.5V5h1V3.5zM2.5 1h8V0h-8zm7.646-.146l3 3l.708-.708l-3-3zM2 1.5a.5.5 0 0 1 .5-.5V0A1.5 1.5 0 0 0 1 1.5zM1 12v1.5h1V12zm1.5 3h10v-1h-10zM14 13.5V12h-1v1.5zM12.5 15a1.5 1.5 0 0 0 1.5-1.5h-1a.5.5 0 0 1-.5.5zM1 13.5A1.5 1.5 0 0 0 2.5 15v-1a.5.5 0 0 1-.5-.5z"></path></svg>
                );
            case "docx":
                return (
                    <svg className={clases} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zm-6.839 9.688v-.522a1.5 1.5 0 0 0-.117-.641a.86.86 0 0 0-.322-.387a.86.86 0 0 0-.469-.129a.87.87 0 0 0-.471.13a.87.87 0 0 0-.32.386a1.5 1.5 0 0 0-.117.641v.522q0 .384.117.641a.87.87 0 0 0 .32.387a.9.9 0 0 0 .471.126a.9.9 0 0 0 .469-.126a.86.86 0 0 0 .322-.386a1.55 1.55 0 0 0 .117-.642m.803-.516v.513q0 .563-.205.973a1.47 1.47 0 0 1-.589.627q-.381.216-.917.216a1.86 1.86 0 0 1-.92-.216a1.46 1.46 0 0 1-.589-.627a2.15 2.15 0 0 1-.205-.973v-.513q0-.569.205-.975q.205-.411.59-.627q.386-.22.92-.22q.535 0 .916.22q.383.219.59.63q.204.406.204.972M1 15.925v-3.999h1.459q.609 0 1.005.235q.396.233.589.68q.196.445.196 1.074q0 .634-.196 1.084q-.197.451-.595.689q-.396.237-.999.237zm1.354-3.354H1.79v2.707h.563q.277 0 .483-.082a.8.8 0 0 0 .334-.252q.132-.17.196-.422a2.3 2.3 0 0 0 .068-.592q0-.45-.118-.753a.9.9 0 0 0-.354-.454q-.237-.152-.61-.152Zm6.756 1.116q0-.373.103-.633a.87.87 0 0 1 .301-.398a.8.8 0 0 1 .475-.138q.225 0 .398.097a.7.7 0 0 1 .273.26a.85.85 0 0 1 .12.381h.765v-.073a1.33 1.33 0 0 0-.466-.964a1.4 1.4 0 0 0-.49-.272a1.8 1.8 0 0 0-.606-.097q-.534 0-.911.223q-.375.222-.571.633q-.197.41-.197.978v.498q0 .568.194.976q.195.406.571.627q.375.216.914.216q.44 0 .785-.164t.551-.454a1.27 1.27 0 0 0 .226-.674v-.076h-.765a.8.8 0 0 1-.117.364a.7.7 0 0 1-.273.248a.9.9 0 0 1-.401.088a.85.85 0 0 1-.478-.131a.83.83 0 0 1-.298-.393a1.7 1.7 0 0 1-.103-.627zm5.092-1.76h.894l-1.275 2.006l1.254 1.992h-.908l-.85-1.415h-.035l-.852 1.415h-.862l1.24-2.015l-1.228-1.984h.932l.832 1.439h.035z"></path></svg>
                );
            case "png":
                return (
                    <svg className={clases} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><g fill="currentColor"><path d="M208 88h-56V32Z" opacity={0.2}></path><path d="M60 144H44a8 8 0 0 0-8 8v56a8 8 0 0 0 16 0v-8h8a28 28 0 0 0 0-56m0 40h-8v-24h8a12 12 0 0 1 0 24m164 16.87a8 8 0 0 1-2.22 5.53A30.06 30.06 0 0 1 200 216c-17.64 0-32-16.15-32-36s14.36-36 32-36a29.45 29.45 0 0 1 16.48 5.11a8 8 0 0 1-9 13.27A13.21 13.21 0 0 0 200 160c-8.82 0-16 9-16 20s7.18 20 16 20a13.57 13.57 0 0 0 8-2.72V192a8 8 0 0 1 0-16h8a8 8 0 0 1 8 8ZM156 152v56a8 8 0 0 1-5.56 7.62a7.91 7.91 0 0 1-2.44.38a8 8 0 0 1-6.51-3.35L116 177v31a8 8 0 0 1-16 0v-56a8 8 0 0 1 14.51-4.65L140 183v-31a8 8 0 0 1 16 0M48 120a8 8 0 0 0 8-8V40h88v48a8 8 0 0 0 8 8h48v16a8 8 0 0 0 16 0V88a8 8 0 0 0-2.34-5.66l-56-56A8 8 0 0 0 152 24H56a16 16 0 0 0-16 16v72a8 8 0 0 0 8 8m112-68.69L188.69 80H160Z"></path></g></svg>
                );
            case "jpg":
                return (
                    <svg className={clases} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><g fill="currentColor"><path d="M208 88h-56V32Z" opacity={0.2}></path><path d="M120 144h-16a8 8 0 0 0-8 8v56a8 8 0 0 0 16 0v-8h8a28 28 0 0 0 0-56m0 40h-8v-24h8a12 12 0 0 1 0 24m96 0v16.87a8 8 0 0 1-2.22 5.53A30.06 30.06 0 0 1 192 216c-17.64 0-32-16.15-32-36s14.36-36 32-36a29.38 29.38 0 0 1 16.48 5.12a8 8 0 0 1-9 13.26A13.21 13.21 0 0 0 192 160c-8.82 0-16 9-16 20s7.18 20 16 20a13.63 13.63 0 0 0 8-2.71V192a8 8 0 0 1 0-16h8a8 8 0 0 1 8 8M80 152v38a26 26 0 0 1-52 0a8 8 0 0 1 16 0a10 10 0 0 0 20 0v-38a8 8 0 0 1 16 0m133.66-69.66l-56-56A8 8 0 0 0 152 24H56a16 16 0 0 0-16 16v72a8 8 0 0 0 16 0V40h88v48a8 8 0 0 0 8 8h48v16a8 8 0 0 0 16 0V88a8 8 0 0 0-2.34-5.66M160 80V51.31L188.69 80Z"></path></g></svg>
                );
            case "exe":
                return (
                    <svg className={clases} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" fillRule="evenodd" d="m25 21l7 5l-7 5z"></path><path fill="currentColor" d="m20.17 19l-2.59 2.59L19 23l4-4l-4-4l-1.42 1.41zm-8.34 0l2.59-2.59L13 15l-4 4l4 4l1.42-1.41z"></path><circle cx={9} cy={8} r={1} fill="currentColor"></circle><circle cx={6} cy={8} r={1} fill="currentColor"></circle><path fill="currentColor" d="M21 26H4V12h24v7h2V6c0-1.102-.897-2-2-2H4c-1.103 0-2 .898-2 2v20c0 1.103.897 2 2 2h17zM4 6h24v4H4z"></path></svg>
                );
            case "msi":
                return (
                    <svg className={clases} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8 21v-2H4q-.825 0-1.412-.587T2 17V5q0-.825.588-1.412T4 3h8v2H4v12h16v-3h2v3q0 .825-.587 1.413T20 19h-4v2zm9-7l-5-5l1.4-1.4l2.6 2.575V3h2v7.175L20.6 7.6L22 9z"></path></svg>
                );
            case "ppt":
                return (
                    <svg className={clases} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M488.698 58.311H302.231V5.981h-32.968L0 52.614v406.89l266.066 46.515h36.165v-58.144h174.49c9.942-.465 20.99.524 29.478-5.64c6.745-10.407 5.11-23.432 5.692-35.177V81.104c1.337-13.373-9.82-24.072-23.193-22.793M170.535 275.304c-13.198 6.744-28.316 5.814-42.677 5.349l-.058 68.202l-34.596-2.907l.058-186.35c31.573 1.511 69.831-12.501 95.996 11.163c25.06 30.41 18.431 86.344-18.723 104.543m313.572 145.13H302.231v-36.518h139.545V360.66H302.231v-29.072h139.545V308.33H302.289s-.058-22.792-.116-34.188c23.025 7.151 49.248 6.977 69.83-6.861c22.27-13.199 33.898-38.375 35.817-63.493h-76.517v-75.936l-29.072 5.873V85.752h181.876zm-141.18-304.735c40.41 1.86 74.429 36.021 76.58 76.315h-76.58zM127.8 191.053c11.454-.523 25.641-2.616 33.374 8.14c6.629 11.397 6.28 26.398.756 38.143c-6.628 11.977-21.63 10.815-33.2 12.21c-1.22-19.478-1.105-38.956-.93-58.493"></path></svg>
                );
            case "mp4":
                return (
                    <svg className={clases} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M27.188 4.875V5.97h-4.5V4.874H8.062V5.97h-4.5V4.874h-1v21.25h1V25.03h4.5v1.095h14.625V25.03h4.5v1.095h1.25V4.875h-1.25zM8.062 23.72h-4.5v-3.126h4.5v3.125zm0-4.44h-4.5v-3.124h4.5zm0-4.436h-4.5V11.72h4.5zm0-4.438h-4.5V7.28h4.5zm3.185 10.184V9.754l9.382 5.418zm15.94 3.13h-4.5v-3.126h4.5v3.125zm0-4.44h-4.5v-3.124h4.5zm0-4.436h-4.5V11.72h4.5zm0-4.438h-4.5V7.28h4.5z"></path></svg>
                );
            default:
                return (
                    <svg className={clases} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20 8.94a1.31 1.31 0 0 0-.06-.27v-.09a1.07 1.07 0 0 0-.19-.28l-6-6a1.07 1.07 0 0 0-.28-.19h-.09L13.06 2H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V9zm-6-3.53L16.59 8H14ZM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5v5a1 1 0 0 0 1 1h5Z"></path></svg>
                );
        }
    }
}

export default ArchivoItem;