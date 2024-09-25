import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { useLocation, useNavigate } from 'react-router-dom';
import { doc , deleteDoc, query, collection, where, getDocs } from "firebase/firestore";
import exportFuncionesCuenta from '../../utils/firebase';
import { useTranslation } from 'react-i18next';



import '../../css/landing.css'
import '../../css/login.css'


function  EliminarEtiqueta() {

    const [usuarioAutenticado, setUsuarioAutenticado] = useState('')
    const location = useLocation();
    const navigate = useNavigate()

    const handleRedirect = () => {
      navigate('/cuenta-usr')
    }

    const {t, i18n} = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(navigator.language)
    }, [])

    const data = location.state;

    const eliminarEtiqueta = async (e) => {
      e.preventDefault()
      const idEtiquetaEliminar = data.idEtiqueta

      const q = query(collection(exportFuncionesCuenta.db, "Articulos"), where("idEtiqueta", "==", idEtiquetaEliminar));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (documento) => {
        const idArticuloEliminar = documento.data().idArticulo
        await deleteDoc(doc(exportFuncionesCuenta.db, "Articulos", idArticuloEliminar));
      });

      await deleteDoc(doc(exportFuncionesCuenta.db, "Etiquetas", data.idEtiqueta));
      handleRedirect()
    }

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


    return (
      <>
        {usuarioAutenticado === null ? (
            <div className='p-5'>
            <h1>{t("errSesionIniciada")}</h1>
            </div>
        ) : (
          <div className="container">
          <div className="login-container gradient-bg-landing">
            <h2 className="text-center text-color">{t("eliminar_et")}</h2>
            <form onSubmit={eliminarEtiqueta}>
              <div className="mb-3">
                <label className="form-label mt-2 text-color">{t("nombre_et")}</label>
                <input type="text" className="form-control" value={data.nombre} id="nombre" disabled/>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-color">{t("descripcion")}</label>
                <textarea className="form-control" value={data.descripcion} placeholder="Escribe una descripción" id="descripcion"  disabled></textarea>
              </div>
              <div id='errBack' style={{ display: 'none', color: 'red' }}>
                {t("errInterno")}
              </div>
              <button type="submit" className="btn btn-success w-100 mt-3">{t("eliminar_et")}</button>
              <a href="/cuenta-usr" className="btn btn-danger w-100 mt-3" role="button">{t("cancelar")}</a>
            </form>
          </div>
        </div>
        )}
      </>

    );
  }
  
  export default EliminarEtiqueta;