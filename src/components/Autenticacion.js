import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, app } from '../utils/firebase';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Autenticacion = () => {
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
    const userSignOut = () => {
        signOut(auth).then(()=>{
            console.log("adios")
        }).catch(error => console.log(error))
    }
    return (
        <>
        {usuarioAutenticado === null ?
            <>
                <Nav.Link as={Link} to="/login"><b className='text-white'>Login</b></Nav.Link>
                <Nav.Link as={Link} to="/registro"><b className='text-white'>Registro</b></Nav.Link>
            </>
            :
            <>
                <Nav.Link as={Link} onClick={userSignOut} to="/home"><b className='text-white'>Cerrar Sesión</b></Nav.Link>
            </>
        }
        
        </>
    );
}

export default Autenticacion