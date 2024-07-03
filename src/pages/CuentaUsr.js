import { onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react';
import { useEffect } from "react";
import { auth } from '../utils/firebase';
import ListaFavs from '../components/ListaFavoritos';
import MisDatos from '../components/MisDatos';
import MisEtiquetas from '../components/MisEtiquetas';

import '../css/landing.css'
import '../css/login.css'
import 'bootstrap/dist/css/bootstrap.css';

function CuentaUsr() {

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

    return (
        <>
        {usuarioAutenticado === null ?
            <div className='p-5'>
            <h1>Debes tener la sesión iniciada</h1>
            </div>
            :
            <div className='p-5'>
                        <div class="container text-center">
                            <div class="row">
                                <div class="col text-color">
                                    <h2>Mis accesos directos<hr className="border border-primary border-3 opacity-75"></hr></h2>
                                    <div className="container">
                                        <div className="login-container gradient-bg-landing">
                                            <p className='text-color'>Aquí puedes añadir accesos directos a tus medios favoritos</p>
                                            <ListaFavs/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col text-color">
                                    <h2>Mis accesos directos<hr className="border border-primary border-3 opacity-75"></hr></h2>
                                        <div className="container">
                                            <div className="login-container gradient-bg-landing">
                                                <MisDatos/>
                                            </div>
                                        </div>
                                </div>
                                <div class="col text-color">
                                    <h2>Mis accesos directos<hr className="border border-primary border-3 opacity-75"></hr></h2>
                                            <div className="container">
                                                <div className="login-container gradient-bg-landing">
                                                    <MisEtiquetas/>
                                                </div>
                                            </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <h2>Mis accesos directos<hr className="border border-primary border-3 opacity-75"></hr></h2>
                                                <div className="container">
                                                    <div className="login-container gradient-bg-landing">
                                                    <table>
                                                            <thead>
                                                                <tr>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td><h1 className='text-black'>Descargar extensión</h1>
                                                                    </td>
                                                                    <td><button type="button" class="btn btn-danger">X</button></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        
                                                    </div>
                                                </div>
                                </div>
                                <div class="col">
                                2 of 2
                                </div>
                            </div>
                        </div>
            </div>
        }
        
        </>
    );
}

export default CuentaUsr;