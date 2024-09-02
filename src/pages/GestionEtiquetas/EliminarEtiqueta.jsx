import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { useLocation, useNavigate } from 'react-router-dom';
import { doc , deleteDoc, query, collection, where, getDocs } from "firebase/firestore";
import exportFuncionesCuenta from '../../utils/firebase';



import '../../css/landing.css'
import '../../css/login.css'


function  EliminarEtiqueta() {

    const [usuarioAutenticado, setUsuarioAutenticado] = useState('')
    const location = useLocation();
    const navigate = useNavigate()

    const handleRedirect = () => {
      navigate('/cuenta-usr')
    }

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
            <h1>Debes tener la sesión iniciada</h1>
            </div>
        ) : (
          <div className="container">
          <div className="login-container gradient-bg-landing">
            <h2 className="text-center text-color">Eliminar etiqueta</h2>
            <form onSubmit={eliminarEtiqueta}>
              <div className="mb-3">
                <label className="form-label mt-2 text-color">Nombre Etiqueta</label>
                <input type="text" className="form-control" value={data.nombre} id="nombre" disabled/>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-color">Descripcion</label>
                <textarea className="form-control" value={data.descripcion} placeholder="Escribe una descripción" id="descripcion"  disabled></textarea>
              </div>
              <div id='errBack' style={{ display: 'none', color: 'red' }}>
                *Tenemos problemas en el serivdor, intentalo más tarde
              </div>
              <button type="submit" className="btn btn-success w-100 mt-3">Eliminar etiqueta</button>
              <a href="/cuenta-usr" className="btn btn-danger w-100 mt-3" role="button">Cancelar</a>
            </form>
          </div>
        </div>
        )}
      </>

    );
  }
  
  export default EliminarEtiqueta;