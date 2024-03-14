import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { ContextoProtocolo } from "../pages/panelAdmin/panelAdmin.jsx";
import bootstrap from "bootstrap/dist/js/bootstrap.js";
import {IP, PUERTO_API} from "../constantes.js";

function ModalAgregarProtocolo() {
  const [nuevoProtocolo, setNuevoProtocolo] = useState({
    nombre: "",
    abreviacion: "",
  });

  const referenciaModal = useRef(null);
  const modalBootstrap = useRef(null);
  const {protocolos, setProtocolos} = useContext(ContextoProtocolo);
  const [estado, setEstado] = useState("deshabilitado")

  useEffect(()=>{
    if(referenciaModal){
      modalBootstrap.current = new bootstrap.Modal(referenciaModal.current);
    }
  }, [referenciaModal])

  const handleNuevoProtocoloChange = (event) => {
    setNuevoProtocolo({
      ...nuevoProtocolo,
      [event.target.name]: event.target.value,
    });
  };

  async function handleGuardarProtocolo () {
    if(estado === "habilitado"){
      try{
        setEstado("cargando");

        const response = await axios.post(`http://${IP}:${PUERTO_API}/protocolo`, {
        nombre: nuevoProtocolo.nombre,
        abreviacion: nuevoProtocolo.abreviacion,
        })
  
        if(response.status === 201){
          const nuevoProtocolo = response.data;
  
          const updatedProtocolos = [nuevoProtocolo, ...protocolos]
          setProtocolos(updatedProtocolos);
          setNuevoProtocolo({
            nombre: "",
            abreviacion: ""
          })
        }
        await modalBootstrap.current.hide();
        setEstado("deshabilitado");
      }catch(error){
        console.log("error");
        modalBootstrap.current.hide();
      }
    }
  };

  useEffect(() => {
    if(estado !== "cargando"){
        if (nuevoProtocolo.nombre && nuevoProtocolo.abreviacion) {
            setEstado("habilitado");
        } else {
            setEstado("deshabilitado");
        }
    }
}, [nuevoProtocolo]);

  return (
    <div
      className="modal fade"
      id="modalCrearProtocolo"
      tabIndex="-1"
      aria-labelledby="modalCrearProtocoloLabel"
      aria-hidden="true"
      ref={referenciaModal}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Agregar nuevo protocolo al sistema
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="nombreProtocolo" className="form-label">
                  Nombre del protocolo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombreProtocolo"
                  name="nombre"
                  value={nuevoProtocolo.nombre}
                  onChange={handleNuevoProtocoloChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="abreviacionProtocolo" className="form-label">
                  Abreviación del nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="abreviacionProtocolo"
                  name="abreviacion"
                  value={nuevoProtocolo.abreviacion}
                  onChange={handleNuevoProtocoloChange}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleGuardarProtocolo}
              disabled={ estado !== "habilitado" }
            >
              {
                  estado === "cargando"
                  ?
                  <>
                      <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                      <span role="status">Cargando...</span>
                  </>
                  :
                  "Agregar protocolo al sistema"
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAgregarProtocolo;