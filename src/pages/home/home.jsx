import React from 'react';
import "./menu.css";
import backgroundjpg from "./img/background.png";
import logo from "./img/logo.png"
import Navbar from '../../components/navbar';


function Home() {
    return ( 
        <div className='mi_contenedor_padreH'>
            <Navbar/>
            <header className='mi_header'>
                <div className="mi_contenedor_header">
                    <img className="mi_imagen_contenedor" src={backgroundjpg} alt="Header Image" />
                    <section className="mi_textos-header">
                        <h3><iconify-icon icon="mdi:instagram" className="mi_icono_header"></iconify-icon>@hospitalmulchen</h3>
                        <h3><iconify-icon icon="ic:baseline-facebook" className="mi_icono_header"></iconify-icon>hospitalmulchen</h3>
                    </section>
                </div>
            </header>

            <div className="mi_linea"></div>

            <div className="contenedor_secundario_home">
                <div className="mi_contenedor_enlaces">
                    <div className="mi_titulo_enlaces">
                        <h3>Enlaces sugeridos</h3>
                    </div>
                    <section className="mi_enlaces">
                        <div>
                            <ul>
                                <li><a href="http://10.8.117.22/dssbiobio/" style={{ backgroundColor: '#89DDF1' }}>SAC</a></li>
                                <li><a href="http://10.8.117.26/" style={{ backgroundColor: '#45C1DF' }}>Panel de documentos</a></li>
                                <li><a href="http://10.8.117.21/autoconsulta/" style={{ backgroundColor: '#259FBE' }}>Autoatencion</a></li>
                                <li><a href="http://10.4.75.185/default.aspx" style={{ backgroundColor: '#1E829C' }}>Radiografias</a></li>
                                <li><a href="https://wlme.medipass.cl/WebPublic/index.php" style={{ backgroundColor: '#166073' }}>Licencias medicas electronicas</a></li>
                                <li><a href="http://10.4.75.158/" style={{ backgroundColor: '#1E829C' }}>Examenes laboratorio</a></li>
                                <li><a href="https://lab.panelssbiobio.cl/GestionIntegrada/Home/Login?ReturnUrl=%2fGestionIntegrada%2fclinicos" style={{ backgroundColor: '#259FBE' }}>Examenes hospital Los angeles</a></li>
                            
                            </ul>
                        </div>
                    </section>
                </div>
                <div className="mi_contenedor_acceso_directo">
                    <div className="mi_titulo_acceso_directo">
                        <h1>Accesos directos</h1>
                    </div>
                        <section className="mi_acceso_directo">
                    <div>
                        <a href="/carpeta/100000000000000000000002" style={{textDecoration: 'none'}}>
                            <div className="mi_calidad_acceso_directo  mi_icono" >
                                <svg className="mi_icono_acceso_directo" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" d="M416 221.25V416a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V96a48 48 0 0 1 48-48h98.75a32 32 0 0 1 22.62 9.37l141.26 141.26a32 32 0 0 1 9.37 22.62Z"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 56v120a32 32 0 0 0 32 32h120"/></svg>
                            </div>
                            <div className="mi_texto_icono">
                                <p style={{ color: '#259FBE' }}>Calidad</p>
                            </div>
                        </a>
                    </div>
                    <div>
                        <a href="/carpeta/100000000000000000000003" style={{textDecoration: 'none'}}>
                            <div className="mi_comite_acceso_directo  mi_icono">
                                <svg  className="mi_icono_acceso_directo" xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M160 40a32 32 0 1 0-32 32a32 32 0 0 0 32-32m-32 16a16 16 0 1 1 16-16a16 16 0 0 1-16 16m90.34 78.05l-45.17-51.22a32 32 0 0 0-24-10.83h-42.34a32 32 0 0 0-24 10.83l-45.17 51.22a20 20 0 0 0 28.13 28.43l16.3-13.08l-16.54 62.88A20 20 0 0 0 102 228.8l26-44.87l26 44.87a20 20 0 0 0 36.41-16.52l-16.5-62.88l16.3 13.08a20 20 0 0 0 28.13-28.43m-11.51 16.77a4 4 0 0 1-5.66 0c-.21-.2-.42-.4-.65-.58L165 121.76a8 8 0 0 0-12.74 8.24l22.88 87a7.72 7.72 0 0 0 .48 1.35a4 4 0 1 1-7.25 3.38a6.25 6.25 0 0 0-.33-.63L134.92 164a8 8 0 0 0-13.84 0L88 221.05a6.25 6.25 0 0 0-.33.63a4 4 0 0 1-2.26 2.07a4 4 0 0 1-5-5.45a7.72 7.72 0 0 0 .48-1.35L103.74 130A8 8 0 0 0 91 121.76l-35.52 28.48c-.23.18-.44.38-.65.58a4 4 0 1 1-5.66-5.65c.12-.12.23-.24.34-.37l45.32-51.39a16 16 0 0 1 12-5.41h42.34a16 16 0 0 1 12 5.41l45.32 51.39c.11.13.22.25.34.37a4 4 0 0 1 0 5.65"/></svg>
                            </div>
                            <div className="mi_texto_icono">
                                <p style={{ color: '#F17000' }}>Comité</p>
                            </div>  
                        </a>
                    </div>
                    <div>
                        <a href="https://maps.app.goo.gl/xEvSMrHAxVByU7Kn7" style={{textDecoration: 'none'}}>
                            <div className="mi_dirección_acceso_directo  mi_icono">
                                <svg className='mi_icono_acceso_directo' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 14c2.206 0 4-1.794 4-4s-1.794-4-4-4s-4 1.794-4 4s1.794 4 4 4m0-6c1.103 0 2 .897 2 2s-.897 2-2 2s-2-.897-2-2s.897-2 2-2"/><path fill="currentColor" d="M11.42 21.814a.998.998 0 0 0 1.16 0C12.884 21.599 20.029 16.44 20 10c0-4.411-3.589-8-8-8S4 5.589 4 9.995c-.029 6.445 7.116 11.604 7.42 11.819M12 4c3.309 0 6 2.691 6 6.005c.021 4.438-4.388 8.423-6 9.73c-1.611-1.308-6.021-5.294-6-9.735c0-3.309 2.691-6 6-6"/></svg>
                            </div>
                            <div className="mi_texto_icono">
                                <p style={{ color: '#259FBE' }}>Ubicación </p>
                            </div>
                        </a>
                    </div>

                    <div>
                        <a href="/hospital" style={{textDecoration: 'none'}}>
                            <div className="mi_info_acceso_directo  mi_icono">
                            <svg className='mi_icono_acceso_directo' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><path fill="currentColor" d="M18 11a6 6 0 1 1 12 0a6 6 0 0 1-12 0m19-4a5 5 0 1 0 0 10a5 5 0 0 0 0-10M11 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10m8.25 12A4.25 4.25 0 0 0 15 23.25V34a9 9 0 1 0 18 0V23.25A4.25 4.25 0 0 0 28.75 19zM13 23.25c0-1.6.602-3.061 1.592-4.167A4.272 4.272 0 0 0 13.75 19h-5.5A4.25 4.25 0 0 0 4 23.25V33a7 7 0 0 0 10.293 6.179A10.951 10.951 0 0 1 13 34zM35 34c0 1.872-.468 3.635-1.293 5.179A7 7 0 0 0 44 33v-9.75A4.25 4.25 0 0 0 39.75 19h-5.5c-.288 0-.57.029-.842.083A6.227 6.227 0 0 1 35 23.25z"/></svg>
                            </div>
                            <div className="mi_texto_icono">
                                <p style={{ color: '#F17000' }}>¿Quienes somos?</p>
                            </div>  
                        </a>
                    </div>
                    </section>
            </div>
        </div>

        <footer>
            <p>&copy; Villagra #455 Hospital Mulchen</p>
        </footer>
    </div>
    );
    }

export default Home;
