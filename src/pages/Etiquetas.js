import { onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react';
import { useEffect } from "react";
import { auth } from '../utils/firebase';
import ListaArticulos from "../components/ListaArticulos";
import VerticalNav from "../components/NavbarVertical";

function Etiquetas(){

    const [usuarioAutenticado, setUsuarioAutenticado] = useState("");

    useEffect(() =>{
        const flagLogin = onAuthStateChanged(auth, (user) =>{
            if(user){
                setUsuarioAutenticado(user)
            }else{
                setUsuarioAutenticado(null)
            }
        })
        return () => {
            flagLogin()
        }
    }, [])

    return(
        <>
        {usuarioAutenticado === null ?
            <div className='p-5'>
            <h1>Debes tener la sesión iniciada</h1>
            </div>
            :
            <div className="container text-center">
                <div className="row">
                    <div className="col-sm-4"><VerticalNav/></div>
                    <div className="col-sm-8"><ListaArticulos/></div>
                </div>
            </div>
        }
        </>
    );
}

export default Etiquetas;