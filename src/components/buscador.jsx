import { useRef } from "react";
import "./buscador.css";

function Buscador({value, setValue}){

    const buscadorRef = useRef();

    const handleClick = () => {
        if (buscadorRef.current) {
            buscadorRef.current.focus();
        }
    };

    function handleSearchChange (event) {
        setValue(event.target.value);
    };

    return(
        <div className="ho_buscador" onClick={handleClick} >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" color="#1F7F98"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"/></svg>
            <input className="ho_color_blue ho_font_poppins ho_fs-16" type="text" placeholder="Buscar..." ref={buscadorRef} onChange={handleSearchChange} value={value}/>
        </div>
    );
}

export default Buscador;