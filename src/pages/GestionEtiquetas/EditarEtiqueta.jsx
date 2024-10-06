import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { useLocation, useNavigate } from 'react-router-dom';
import validacionEtiqueta from '../../utils/validadores/validacionEtiqueta';
import { doc, updateDoc } from "firebase/firestore";
import exportFuncionesCuenta from '../../utils/firebase';
import { useTranslation } from 'react-i18next';

import '../../css/landing.css'
import '../../css/login.css'


function EditarEtiqueta() {

    const [usuarioAutenticado, setUsuarioAutenticado] = useState('')
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const location = useLocation();
    const navigate = useNavigate()

    const handleRedirect = () => {
      navigate('/cuenta-usr')
    }

    const data = location.state;

    const {t, i18n} = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(navigator.language)
    }, [])

    useEffect(() => {
      setNombre(data.nombre)
      setDescripcion(data.descripcion)
    }, [])

    useEffect(() => {
      const flagLogin = onAuthStateChanged(auth, user => {
        if (user) {
          setUsuarioAutenticado(user)
        } else {
          setUsuarioAutenticado(null)
        }
      })
      return () => {
        flagLogin()
      }
    }, [])

    const EditarEtiqueta = async (e) => {
      e.preventDefault()
      if(validacionEtiqueta(nombre, descripcion)){
        const docRef = doc(exportFuncionesCuenta.db, "Etiquetas", data.idEtiqueta);
        await updateDoc(docRef, {
          nombre: nombre,
          descripcion: descripcion
        });
        handleRedirect()
      }
    }

    return (
      <>
        {usuarioAutenticado === null ? (
            <div className='p-5'>
            <h1>{t("errSesionIniciada")}</h1>
            </div>
        ) : (
          <div className="container">
          <div className="login-container gradient-bg-landing">
            <h2 className="text-center text-color">{t("editar_et")}</h2>
            <form onSubmit={EditarEtiqueta}>
              <div className="mb-3">
                <label className="form-label mt-2 text-color">{t("nombre_et")}</label>
                <input type="text" className="form-control" value={nombre} onChange={(e)=> setNombre(e.target.value)} id="nombre" placeholder={t("nombre_et")} />
                <div id="errNombreFormato" style={{display: "none", color: "red"}}>
                {t("err_nombre_etiqueta")}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label text-color">{t("descripcion")}</label>
                <textarea className="form-control" value={descripcion} placeholder={t("descripcion")} id="descripcion"  onChange={(e)=> setDescripcion(e.target.value)}></textarea>
                <div id="errDescripcion" style={{display: "none", color: "red"}}>
                {t("err_descripcion")}
                </div>
              </div>
              <button type="submit" className="btn btn-success w-100 mt-3">{t("editar_et")}</button>
              <a href="/cuenta-usr" className="btn btn-danger w-100 mt-3" role="button">{t("cancelar")}</a>
            </form>
          </div>
        </div>
        )}
      </>
    );
  }
  
  export default EditarEtiqueta;