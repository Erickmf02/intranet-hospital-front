import React, { useEffect, useRef, useState } from "react";
import "./input.css";

function Input({ input, setInput, placeholder, inputType, label, children, validateInput, errorHelp, isDisabled, clasesContenedor, clasesInput }) {
  const { valor, estado } = input;
  const tieneValidacion = validateInput != null;
  const [valido, setValido] = useState( tieneValidacion ? false : null );
  
  const [escribiendo, setEscribiendo] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  const handleContainerClick = () => {
    inputRef.current.focus();
  };
  
  function handleChange(e){
    if (!isDisabled ) {
      const nuevoValor = e.target.value;
      const nuevoInput = { ...input, valor: nuevoValor };
      setInput(nuevoInput);
    }
  };

  useEffect(()=>{
    const nuevoInput = { ...input };
    if(valor==""){
      nuevoInput.estado = "vacio";
    }
    else if (tieneValidacion) {
      const esValido = validateInput();
      nuevoInput.estado = esValido ? "valido" : "invalido";
      setValido(esValido);
      setInput(nuevoInput);
    }
  },[valor])

  const handleInputFocus = () => {
    setEscribiendo(true);
  };

  const handleInputBlur = () => {
    const nuevoInput = {...input}
    if (valor === "" ) {
      nuevoInput.estado = "vacio";
    } else if (tieneValidacion) {
      nuevoInput.estado = valido ? "valido" : "invalido";
    } else {
      nuevoInput.estado = "esperando";
    }
    setEscribiendo(false);
    setInput(nuevoInput);
  };

  function handleTogglePassword(e){
    if(!escribiendo){
      e.stopPropagation()
    }
    setShowPassword(!showPassword);
  };
  
  function getClases(){
    let clases = ["ho_form_control", "ho_font_poppins"];
    if(isDisabled){
      clases.push("ho_form_control-disabled");
    }else{
      if(tieneValidacion){
        if (valido) {
          clases.push("ho_form_control-valido");
        } else if (!escribiendo && estado !== "vacio") {
          clases.push("ho_form_control-invalido");
        }
      }
      if (escribiendo) {
        clases.push("ho_form_control-escribiendo");
      }
    }
    return clases.join(" ");
  }

  return (
    <div className="d-flex w-100 flex-column align-items-start" style={{gap: "6px"}}>
      {label && <label className="ho_form_label ho_font_poppins ho_fs_16">{label}</label>}
      <div className={`${getClases()} ${ clasesContenedor? clasesContenedor : "" }`} onClick={handleContainerClick} onMouseDown={(e) => e.preventDefault()}>
        <span >
          {children}
        </span>
        {inputType === "textarea" ? (
          <textarea
            className={`ho_form_control_input ${ clasesInput? clasesInput : "" }`}
            ref={inputRef}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            value={valor}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={ isDisabled }
            onMouseDown={(e)=>{ e.stopPropagation() }}
          />
        ) : (
          <input
            className={`ho_form_control_input ${ clasesInput? clasesInput : "" }`}
            type={showPassword ? "text" : inputType}
            ref={inputRef}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            value={valor}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={ isDisabled }
            onMouseDown={(e)=>{ e.stopPropagation() }}
          />
        )}
        {
          (estado==="valido"||estado==="valido-escribiendo")&&
          <svg className="ho_input_good" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59z"></path></svg>
        }
        {
          (estado==="invalido" && !escribiendo)&&
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M20 20L4 4m16 0L4 20"></path></svg>
        }
        {
          inputType === "password" &&
          <div className="ho_password_toggle" onClick={handleTogglePassword}>
            {!showPassword 
            ? <svg style={{cursor: "pointer"}} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"></path></svg> 
            : <svg style={{cursor: "pointer"}}  xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"></path></svg>}
          </div>
        }
      </div>
      {
        (errorHelp && estado==="invalido" && !escribiendo && tieneValidacion) &&
        <div className="ho_form_error_help ho_font_poppins">
          {errorHelp}
        </div>
      }
    </div>
  );
}

export default Input;
