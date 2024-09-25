import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import { useEffect } from 'react'
import { auth } from '../utils/firebase'
import ListaArticulos from '../components/ListaArticulos'
import VerticalNav from '../components/NavbarVertical'
import exportFuncionesCuenta from '../utils/firebase'
import ComponenteModal from '../components/ComponenteModal'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function Etiquetas () {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState('')
  const [listaEtiquetas, setListaEtiquetas] = useState([])
  const [idEtiquetaSeleccionada, setIdEtiquetaSeleccionada] = useState('')
  const [nombreEtiquetaSeleccionada, setNombreEtiquetaSeleccionada] = useState('')

  const handleShow = () => setShow(true)
  const [show, setShow] = useState(false)
  const location = useLocation()
  const {t, i18n} = useTranslation();

  useEffect(() => {
      i18n.changeLanguage(navigator.language)
  }, [])

  const handleShowAlert = () => {
    handleShow()
  }

  const handleClose = () => {
    setShow(false)
  }

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

  function getInfoSeleccionada () {
    const data = location.state

    if (data === null) {
      onAuthStateChanged(auth, async user => {
        if (user) {
          let tmpLista = ''
          const uid = user.uid
          const q = query(
            collection(exportFuncionesCuenta.db, 'Etiquetas'),
            where('idUsuario', '==', uid),
            where('nombre', '==', 'Mis favoritos')
          )
          const querySnapshot = await getDocs(q)
          querySnapshot.forEach(doc => {
            tmpLista = doc.data()
          })
          setIdEtiquetaSeleccionada(tmpLista.idEtiqueta)
          setNombreEtiquetaSeleccionada(tmpLista.nombre)
          tmpLista = ''
          handleClose()
        } else {
          handleShowAlert()
        }
      })
    }else{
        onAuthStateChanged(auth, async user => {
            if (user) {
              let tmpLista = ''
              const uid = user.uid
              const q = query(
                collection(exportFuncionesCuenta.db, 'Etiquetas'),
                where('idUsuario', '==', uid),
                where('idEtiqueta', '==', data)
              )
              const querySnapshot = await getDocs(q)
              querySnapshot.forEach(doc => {
                tmpLista = doc.data()
              })
              setIdEtiquetaSeleccionada(tmpLista.idEtiqueta)
              setNombreEtiquetaSeleccionada(tmpLista.nombre)
              tmpLista = ''
              handleClose()
            } else {
              handleShowAlert()
            }
            
          })
    }
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

  useEffect(() => {
    getDocEtiqueta()
    getInfoSeleccionada()
  }, [])

  return (
    <>
      {usuarioAutenticado === null ? (
        <div className='p-5'>
          <h1>{t("errSesionIniciada")}</h1>
        </div>
      ) : (
        <div className='container text-center'>
          {idEtiquetaSeleccionada === '' ? (
            <div className='p-5'>
              <h1>{t("err_et_select")}</h1>
            </div>
          ) : (
            <div>
              <h2 className='mt-5'>{t("et_seleccionada")}  {nombreEtiquetaSeleccionada}</h2>
              <div className='row'>
                <div className='col-sm-4'>
                  <VerticalNav listaEtiquetas={listaEtiquetas} />
                </div>
                <div className='col-sm-8'>
                  <ListaArticulos idEtiqueta={idEtiquetaSeleccionada} />
                </div>
              </div>
            </div>
          )}
          <ComponenteModal
            show={show}
            handleClose={handleClose}
            msg={t("errInterno")}
          />
        </div>
      )}
    </>
  )
}

export default Etiquetas
