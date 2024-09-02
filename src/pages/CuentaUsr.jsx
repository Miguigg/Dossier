import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import { useEffect } from 'react'
import { auth } from '../utils/firebase'
import ListaFavs from '../components/ListaFavoritos'
import MisDatos from '../components/MisDatos'
import MisEtiquetas from '../components/MisEtiquetas'
import exportFuncionesCuenta from '../utils/firebase'
import ComponenteModal from '../components/ComponenteModal'
import { collection, query, where, getDocs , doc, getDoc } from 'firebase/firestore'

import '../css/landing.css'
import '../css/login.css'
import 'bootstrap/dist/css/bootstrap.css'

function CuentaUsr () {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState('')
  const [listaEtiquetas, setListaEtiquetas] = useState([])
  const [listaAccesos, setListaAccesos] = useState([])
  const [datosUsr , setDatosUsr] = useState('')
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleShowAlert = () => {
    handleShow()
  };

  const handleClose = () => {
    setShow(false)
    };

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

  function getDocEtiqueta () {
    onAuthStateChanged(auth, async user => {
      if (user) {
        let tmpLista = []
        const uid = user.uid
        const q = query(
          collection(exportFuncionesCuenta.db, 'Etiquetas'),
          where('idUsuario', '==', uid)
        )

        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(doc => {
          tmpLista.push(doc.data())
        })
        setListaEtiquetas(tmpLista)
        tmpLista = []
        handleClose()
      } else {
        handleShowAlert()
      }
    })
  }

  function getDocUsuario() {
    
    onAuthStateChanged(auth, async user => {
      if (user) {
        const uid = user.uid
        const docRef = doc(exportFuncionesCuenta.db, "usuarios", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          handleClose()
          setDatosUsr(docSnap.data())
        } else {
          handleShowAlert()
        }
      } else {
        handleShowAlert()
      }
    })
  }

  function getDocumentosAccesos(){
    onAuthStateChanged(auth, async user => {
      if (user) {
        let tmpLista = []
        const uid = user.uid
        const q = query(
          collection(exportFuncionesCuenta.db, 'Accesos-directos'),
          where('idUsuario', '==', uid)
        )

        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(doc => {
          tmpLista.push(doc.data())
        })
        handleClose()
        setListaAccesos(tmpLista)
      } else {
        handleShowAlert()
      }
    })
  }

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        getDocEtiqueta()
        getDocUsuario()
        getDocumentosAccesos()
        handleClose()
      } else {
        handleShowAlert()
      }
    })
  }, [])

  return (
    <>
      {usuarioAutenticado === null ? (
        <div className='p-5'>
          <h1>Debes tener la sesión iniciada</h1>
        </div>
      ) : (
        <div className='p-5'>
          <div className='container text-center'>
            <div className='row'>
              <div className='col text-color'>
                <h2>
                  Mis accesos directos
                  <hr className='border border-primary border-3 opacity-75'></hr>
                </h2>
                <div className='container'>
                  <div className='login-container gradient-bg-landing'>
                    <p className='text-color'>
                      Aquí puedes añadir accesos directos a tus medios favoritos
                    </p>
                    <ListaFavs accesos={listaAccesos}/>
                  </div>
                </div>
              </div>
              <div className='col text-color'>
                <h2>
                  Mis datos
                  <hr className='border border-primary border-3 opacity-75'></hr>
                </h2>
                <div className='container'>
                  <div className='login-container gradient-bg-landing'>
                    <MisDatos datosUsr={datosUsr} />
                  </div>
                </div>
              </div>
              <div className='col text-color'>
                <h2>
                  Mis etiquetas
                  <hr className='border border-primary border-3 opacity-75'></hr>
                </h2>
                <div className='container'>
                  <div className='login-container gradient-bg-landing'>
                    <MisEtiquetas etiquetas={listaEtiquetas} />
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <h2>
                  Descargar extensión
                  <hr className='border border-primary border-3 opacity-75'></hr>
                </h2>
                <div className='container'>
                  <div className='login-container gradient-bg-landing'>
                    <table>
                      <thead>
                        <tr></tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <h1 className='text-black'>Descargar extensión</h1>
                          </td>
                          <td>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='60'
                              height='60'
                              fill='currentColor'
                              className='bi bi-puzzle-fill text-color'
                              viewBox='0 0 16 16'
                            >
                              <path d='M3.112 3.645A1.5 1.5 0 0 1 4.605 2H7a.5.5 0 0 1 .5.5v.382c0 .696-.497 1.182-.872 1.469a.5.5 0 0 0-.115.118l-.012.025L6.5 4.5v.003l.003.01q.005.015.036.053a.9.9 0 0 0 .27.194C7.09 4.9 7.51 5 8 5c.492 0 .912-.1 1.19-.24a.9.9 0 0 0 .271-.194.2.2 0 0 0 .036-.054l.003-.01v-.008l-.012-.025a.5.5 0 0 0-.115-.118c-.375-.287-.872-.773-.872-1.469V2.5A.5.5 0 0 1 9 2h2.395a1.5 1.5 0 0 1 1.493 1.645L12.645 6.5h.237c.195 0 .42-.147.675-.48.21-.274.528-.52.943-.52.568 0 .947.447 1.154.862C15.877 6.807 16 7.387 16 8s-.123 1.193-.346 1.638c-.207.415-.586.862-1.154.862-.415 0-.733-.246-.943-.52-.255-.333-.48-.48-.675-.48h-.237l.243 2.855A1.5 1.5 0 0 1 11.395 14H9a.5.5 0 0 1-.5-.5v-.382c0-.696.497-1.182.872-1.469a.5.5 0 0 0 .115-.118l.012-.025.001-.006v-.003l-.003-.01a.2.2 0 0 0-.036-.053.9.9 0 0 0-.27-.194C8.91 11.1 8.49 11 8 11s-.912.1-1.19.24a.9.9 0 0 0-.271.194.2.2 0 0 0-.036.054l-.003.01v.002l.001.006.012.025c.016.027.05.068.115.118.375.287.872.773.872 1.469v.382a.5.5 0 0 1-.5.5H4.605a1.5 1.5 0 0 1-1.493-1.645L3.356 9.5h-.238c-.195 0-.42.147-.675.48-.21.274-.528.52-.943.52-.568 0-.947-.447-1.154-.862C.123 9.193 0 8.613 0 8s.123-1.193.346-1.638C.553 5.947.932 5.5 1.5 5.5c.415 0 .733.246.943.52.255.333.48.48.675.48h.238z' />
                            </svg>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className='col'></div>
            </div>
          </div>
          <ComponenteModal show={show} handleClose={handleClose} msg="Tenemos problemas para contactar con el servidor, intentalo más tarde" />
        </div>
      )}
    </>
  )
}

export default CuentaUsr
