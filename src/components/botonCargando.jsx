import "./botonCargando.css";

function BotonCargando({onClick, text, loading, isDisabled, executeOnClickOnDisabled, estilos, children }) {

  async function handleOnClick(){
    if ( onClick && !loading && (executeOnClickOnDisabled || !isDisabled)) {
      await onClick();
  }
  }
  return (
    <button type="submit" className={`ho_btn ho_btn-blue ho_font_poppins ${(isDisabled || loading) ? "ho_btn-disabled":""} ${estilos}`} onClick={handleOnClick}>
      {loading
      ?
      <>
        <div className="spinner-border text-light me-2" role="status">
          <span className="visually-hidden">cargando...</span>
        </div>
        Cargando...
      </>
      :
      text
      }
      {children
      &&<span className="ms-2 d-flex align-items-center h-100">
        {children}
      </span>
      }
    </button>
  );
}

export default BotonCargando;
