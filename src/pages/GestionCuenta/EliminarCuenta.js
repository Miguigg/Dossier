import { useState } from 'react'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { deleteUser } from "firebase/auth";

import { auth } from '../../utils/firebase'
import { doc, getDoc, deleteDoc } from 'firebase/firestore'
import encrypt from '../../utils/validadores/encrypt'
import exportFuncionesCuenta from '../../utils/firebase'

function EliminarCuenta () {
  const [contraseña, setContraseña] = useState('')
  const [usuarioAutenticado, setUsuarioAutenticado] = useState('')
  const navigate = useNavigate()

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

  const eliminarUsuario = e => {
    const user = auth.currentUser;

    deleteUser(user).then(() => {
        document.getElementById('errInterno').style.display = 'none'
        handleRedirect()
    }).catch((error) => {
        console.log("Error interno")
    });
  }

  const accionEliminar = e => {
    e.preventDefault()
    onAuthStateChanged(auth, async user => {
      if (user) {
        const uid = user.uid;
        const db = exportFuncionesCuenta.db
        const docRef = doc(db, "usuarios", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            if(encrypt(contraseña) === docSnap.data().contraseña){
                document.getElementById('errPass').style.display = 'none'
                eliminarUsuario()
                await deleteDoc(doc(db, "usuarios", uid));
                handleRedirect()
            }else{
                document.getElementById('errPass').style.display = 'block'
            }
          } else {
            handleRedirect()
          }

      } else {
        console.log("Error desconocido")
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
                <div id='errInterno' style={{ display: 'none', color: 'red' }}>
                    *Tenemos problemas en el servido, intentalo más tarde
                </div>
                </div>
                <button type='submit' className='btn btn-success w-100 mt-3'>
                  Eliminar usuario
                </button>
                <a
                  href='/home'
                  className='btn btn-danger w-100 mt-3'
                  role='button'
                >
                  Cancelar
                </a>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default EliminarCuenta
