import { useState } from 'react'
import { useEffect } from 'react'
import { getAuth, onAuthStateChanged, deleteUser } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  deleteDoc
} from 'firebase/firestore'

import ComponenteModal from '../../components/ComponenteModal'
import { auth } from '../../utils/firebase'
import encrypt from '../../utils/validadores/encrypt'
import exportFuncionesCuenta from '../../utils/firebase'

function EliminarCuenta () {
  const [contraseña, setContraseña] = useState('')
  const [usuarioAutenticado, setUsuarioAutenticado] = useState('')
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [showErr, setShowErr] = useState('')
  const handleShow = () => setShow(true)
  const handleShowErr = () => setShowErr(true)

  const handleShowAlert = () => {
    handleShow()
  }

  const handleClose = () => {
    setShow(false)
  }

  const handleShowErrAlert = () => {
    handleShowErr()
  }

  const handleCloseErr = () =>{
    setShowErr(false)
  }

  const handleRedirect = () => {
    navigate('/home')
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

  const eliminarUsuario = () => {
    const auth = getAuth()
    const userToDelete = auth.currentUser
    deleteUser(userToDelete)
      .then(() => {
        handleClose()
        window.location.reload();
      })
      .catch(error => {
        handleShowAlert()
      })
  }

  const accionEliminar = e => {
    e.preventDefault()

    onAuthStateChanged(auth, async user => {
      if (user) {
        const uid = user.uid
        const db = exportFuncionesCuenta.db
        const docRef = doc(db, 'usuarios', uid)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          if (encrypt(contraseña) === docSnap.data().contraseña) {
            handleCloseErr()
            
            const q = query(
              collection(exportFuncionesCuenta.db, 'Etiquetas'),
              where('idUsuario', '==', uid)
            )

            const querySnapshot = await getDocs(q)

            querySnapshot.forEach(async document => {
              const idEtiqueta = document.data().idEtiqueta
              await deleteDoc(
                doc(exportFuncionesCuenta.db, 'Etiquetas', idEtiqueta)
              )
                .then(() => {
                  handleClose()
                })
                .catch(error => {
                  handleShowAlert()
                })
            })

            const q2 = query(
              collection(exportFuncionesCuenta.db, 'Articulos'),
              where('idUsuario', '==', uid)
            )
            const querySnapshot2 = await getDocs(q2)
            querySnapshot2.forEach(async document => {
              const idArticulo = document.data().idArticulo
              await deleteDoc(
                doc(exportFuncionesCuenta.db, 'Articulos', idArticulo)
              )
                .then(() => {
                  handleClose()
                })
                .catch(error => {
                  handleShowAlert()
                })
            })

            //Elimina los accesos directos del usuario
            const q3 = query(
              collection(exportFuncionesCuenta.db, 'Accesos-directos'),
              where('idUsuario', '==', uid)
            )
            const querySnapshot3 = await getDocs(q3)
            querySnapshot3.forEach(async document => {
              const idAcceso = document.data().idAcceso
              await deleteDoc(
                doc(exportFuncionesCuenta.db, 'Accesos-directos', idAcceso)
              )
              .then(() => {
                console.log(idAcceso)
              })
              .catch(error => {
                console.log(error)
              })
            })

            await deleteDoc(doc(exportFuncionesCuenta.db, 'usuarios', uid))
            .then(() => {
              handleClose()
            }).catch(error =>{
              handleShowAlert()
            })
            .catch(error => {
              handleShowAlert()
            })
            eliminarUsuario()
          }else{
            handleShowErrAlert()
          }
        }
      } else {
        handleShowAlert()
      }
    })
  }

  return (
    <>
      {usuarioAutenticado === null ? (
        <div className='p-5'>
          <h1>Debes tener la sesión iniciada</h1>
        </div>
      ) : (
        <div className='container'>
          <div className='login-container gradient-bg-landing'>
            <h2 className='text-center text-color'>Eliminar cuenta</h2>
            <form onSubmit={accionEliminar}>
              <div>
                <div className='mb-3 mt-2'>
                  <label className='form-label text-color'>Contraseña</label>
                  <input
                    type='password'
                    className='form-control'
                    id='contraseña'
                    placeholder='Contraseña'
                    value={contraseña}
                    onChange={e => setContraseña(e.target.value)}
                  />
                  <div id='errPass' style={{ display: 'none', color: 'red' }}>
                    *La contraseña es incorrecta
                  </div>
                  <div
                    id='errInterno'
                    style={{ display: 'none', color: 'red' }}
                  >
                    *Tenemos problemas en el servido, intentalo más tarde
                  </div>
                </div>
                <button type='submit' className='btn btn-success w-100 mt-3'>
                  Eliminar usuario
                </button>
                <a
                  href='/cuenta-usr'
                  className='btn btn-danger w-100 mt-3'
                  role='button'
                >
                  Cancelar
                </a>
              </div>
            </form>
          </div>
          <ComponenteModal
            show={show}
            handleClose={handleClose}
            msg='Tenemos problemas para contactar con el servidor, cierre sesión y vuelva iniciarla antes de intentarlo de nuevo'
          />
          <ComponenteModal
            show={showErr}
            handleClose={handleCloseErr}
            msg='Contraseña incorrecta'
          />
        </div>
      )}
    </>
  )
}

export default EliminarCuenta
