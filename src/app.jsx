import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { createContext, useRef, useState } from "react";

import Login from './pages/login/Login.jsx'
import Home from "./pages/home/home.jsx"
import Perfil from "./pages/perfilDeUsuario/Perfil.jsx"
import User from "./pages/user/user.jsx"
import Lista from "./pages/perfilDeUsuario/lista.jsx"
import Hospital from "./pages/home/Hospital.jsx"
import ModalError from "./components/modalError.jsx";
import CarpetaSelector from "./pages/carpeta/carpetaSelector.jsx";
import Password from "./pages/password/password.jsx";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login></Login>
    },
    {
        path: "/",
        element: <Home></Home>
    },
    {
        path: "/crear-usuario",
        element: <Perfil></Perfil>
    },
    {
        path: "/usuario/:id",
        element: <User></User>
    },
    {
        path: "/lista",
        element: <Lista></Lista>
    },
    {
        path: "/carpeta/:id",
        element: <CarpetaSelector></CarpetaSelector>
    },
    {
        path: "/hospital",
        element: <Hospital></Hospital>
    },
    {
        path: "contraseña",
        element: <Password></Password>
    }

]);

export const ContextoUsuarioSesion = createContext();
export const ContextoModalErrorRef = createContext();

function App(){
    const [usuarioSesion, setUsuarioSesion] = useState(null);
    const modalErrorRef = useRef();

    return(
        <div id="app">
            <ContextoUsuarioSesion.Provider value={{usuarioSesion, setUsuarioSesion}}>
                <ModalError ref={modalErrorRef}></ModalError>
                <ContextoModalErrorRef.Provider value={modalErrorRef}>
                    <RouterProvider router={router}></RouterProvider>
                </ContextoModalErrorRef.Provider>
            </ContextoUsuarioSesion.Provider>
        </div>
    );
}

export default App;