import React, { useContext, useEffect, useState } from "react";
import "./user.css";
import backgroundjpg from "./../home/img/background.png";
import Navbar from "../../components/navbar";
import user from "./../home/img/user.png";
import { useNavigate, useParams } from "react-router-dom";
import { URL_API } from "../../constantes";
import axios from "axios";
import { ContextoUsuarioSesion } from "../../app"; // Importar el contexto de sesión del usuario
import { obtenerRutBonito } from "../../utils/usuario";

function User() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const { usuarioSesion } = useContext(ContextoUsuarioSesion); // Obtener el contexto de sesión del usuario

  const handleImagenChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenSeleccionada(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [usuario, setUsuario] = useState();
  //auth
  useEffect(() => {
    if(usuarioSesion==false){
      navigate("/login", { replace: true });
    }else if (usuarioSesion) {
      getData();
    }
  }, [id, usuarioSesion]);

  async function getData() {
    try {
      const response = await axios.get(`${URL_API}/usuario/${id}`, {
        headers: {
          Authorization: `Bearer ${usuarioSesion.token}`
        }
      });
      const { data } = response;
      setUsuario(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbar />
      {loading ? (
        <>Cargando...</>
      ) : (
        <div className="user_body">
          <div>
            <img className="mi_imagen_fondo" src={backgroundjpg} alt="background img" />
            <div className="mi_tarjeta">
              <div className="mi_contenedor_user">
                <h3>{usuario.nombre}</h3>
                <h3 style={{ color: '#208C9B' }}>{obtenerRutBonito(usuario.rut)}</h3>

                <form>
                  <div className="imagen-contenedor-redondo">
                    {/* La imagen mostrada depende del estado imagenSeleccionada */}
                    <img src={imagenSeleccionada || user} alt="Foto de Perfil " />
                    <input
                      type="file"
                      id="foto"
                      name="foto"
                      accept="image/*"
                      onChange={handleImagenChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                </form>

                {/* Utiliza htmlFor para asociar el label con el input */}
                <label htmlFor="foto" className="boton_elegir_foto">
                  Elige foto de perfil
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
      <footer>
        <p>&copy; Villagra #455 Hospital Mulchen</p>
      </footer>
    </div>
  );
}

export default User;
