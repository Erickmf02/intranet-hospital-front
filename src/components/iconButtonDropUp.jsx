import "./iconButtonDropUp.css";

function IconButtonDropUp({children, onClick, clases}){

    return (
        <button className={`ho_ibtn_drop ${clases}`} onClick={onClick} data-bs-toggle="dropdown" type="button" aria-expanded="false">
            <div className="ho_ibtn_drop_svg">
                {children}
            </div>
        </button>
    );
}

export default IconButtonDropUp;