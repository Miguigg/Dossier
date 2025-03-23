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
import { useTranslation } from 'react-i18next';

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
  const {t, i18n} = useTranslation();

  useEffect(() => {
      i18n.changeLanguage(navigator.language)
  }, [])


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
          <h1>{t("errSesionIniciada")}</h1>
        </div>
      ) : (
        <div className='p-5'>
          <div className='container text-center'>
            <div className='row'>
              <div className='col text-color'>
                <div className='container'>
                  <div className='login-container gradient-bg-landing'>
                    <ListaFavs accesos={listaAccesos} t={t}/>
                  </div>
                </div>
              </div>
              <div className='col text-color'>
                <div className='container'>
                  <div className='login-container gradient-bg-landing'>
                    <MisDatos datosUsr={datosUsr} t={t}/>
                  </div>
                </div>
              </div>
              <div className='col text-color'>
                <div className='container'>
                  <div className='login-container gradient-bg-landing'>
                    <MisEtiquetas etiquetas={listaEtiquetas} t={t}/>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <div className='container'>
                </div>
              </div>         
            </div>
          </div>
          <ComponenteModal show={show} handleClose={handleClose} msg={t("errInterno")} />
        </div>
      )}
    </>
  )
}

export default CuentaUsr
