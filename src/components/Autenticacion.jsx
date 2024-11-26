import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from '../utils/firebase';
import {  Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

const Autenticacion = () => {
    const [usuarioAutenticado, setUsuarioAutenticado] = useState("");
    const navigate = useNavigate()
    const {t, i18n} = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(navigator.language)
    }, [])

    const handleRedirect = () => {
      navigate('/home')
    }
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
    const userSignOut = (e) => {
        e.preventDefault()
        signOut(auth).then(()=>{
            handleRedirect()
        }).catch(error => console.log(error))
    }
    return (
        <>
        {usuarioAutenticado === null ?
            <>
                <Nav.Link as={Link} to="/login"><b className='text-white'>Login</b></Nav.Link>
                <Nav.Link as={Link} to="/registro"><b className='text-white'>{t("registro")}</b></Nav.Link>
                <Nav.Link as={Link} to="/utlimas-noticias"><b className='text-white'>{t("noticias")}</b></Nav.Link>
            </>
            :
            <>
                <Nav.Link as={Link} onClick={userSignOut} to="/home"><b className='text-white'>{t("cerrar_sesion")}</b></Nav.Link>
                <Nav.Link as={Link} to="/cuenta-usr"><b className="text-white">{t("mi_cuenta")}</b></Nav.Link>
                <Nav.Link as={Link} to="/etiquetas"><b className="text-white">{t("mis_etq")}</b></Nav.Link>
                <Nav.Link as={Link} to="/utlimas-noticias"><b className='text-white'>{t("noticias")}</b></Nav.Link>
                <Nav.Link as={Link} to="/test-integridad"><b className='text-white'>{t("test_int")}</b></Nav.Link>
            </>
        }
        
        </>
    );
}

export default Autenticacion