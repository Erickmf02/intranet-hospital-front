    import { Link } from "react-router-dom"

    function CartaProtocolo ({protocolo}) {

        return (
            <div className="col">
                <Link to={`/protocolo/${protocolo._id}`} style={{textDecoration: "none"}}>
                    <div className="card h-100 ho_card">
                        <button className="ho_card_btn" data-bs-toggle="modal" data-bs-target="#modalAdministrarProtocolo">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 8h9m4 0h3m-9 8h9M4 16h3"/><circle cx="9" cy="16" r="2"/><circle cx="15" cy="8" r="2"/></g></svg>
                        </button>
                        <div className="card-img-top ho_card_color"></div>
                        <div className="card-body p-2">
                            <h5 className="card-title">{protocolo.abreviacion}</h5>
                            <p className="card-text">{ protocolo.nombre }</p>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }

    export default CartaProtocolo;