import { useState } from 'react'
import validarEditarCuenta from '../../utils/validadores/validacionEditarCuenta'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { auth } from '../../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { updatePassword } from 'firebase/auth'
import exportFuncionesCuenta from '../../utils/firebase'
import { useTranslation } from 'react-i18next';

function EditarCuenta () {
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [passwd, setPasswd] = useState('')
  const [repPasswd, setRepPasswd] = useState('')
  const [usuarioAutenticado, setUsuarioAutenticado] = useState('')

  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate('/cuenta-usr')
  }

  const {t, i18n} = useTranslation();

  useEffect(() => {
      i18n.changeLanguage(navigator.language)
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

  const editarCuenta = e => {
    e.preventDefault()
    if (validarEditarCuenta(nombre, apellidos, "" , passwd, repPasswd)) {

        if(passwd !== ""){
            updatePassword(auth.currentUser, passwd)
            .then(() => {
              console.log('exito cambiando la contraseña')
              document.getElementById("errBack").style.display = "none";
            })
            .catch(error => {
              document.getElementById("errBack").style.display = "block";
            })
        }

        if(nombre !== ""){
          onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              exportFuncionesCuenta.editNombre(uid,nombre)
              document.getElementById("errBack").style.display = "none";
            } else {
              document.getElementById("errBack").style.display = "block";
            }
          });            
        }

        if(apellidos !== ""){
            onAuthStateChanged(auth, (user) => {
              if (user) {
                const uid = user.uid;
                exportFuncionesCuenta.editApellidos(uid,apellidos)
                document.getElementById("errBack").style.display = "none";
              } else {
                document.getElementById("errBack").style.display = "block";
              }
            });  
        }
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
        <div className='container'>
        <div className='login-container gradient-bg-landing'>
          <h2 className='text-center text-color'>{t("edit_cuenta")}</h2>
          <form onSubmit={editarCuenta}>
            <div>
              <div className='mb-3 mt-2'>
                <label className='form-label text-color'>{t("nombre")}</label>
                <input
                  className='form-control'
                  id='nombre'
                  placeholder='Nombre'
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
                <div
                  id='errNombreFormato'
                  style={{ display: 'none', color: 'red' }}
                >
                  {t("errNombreFormato")}
                </div>
              </div>
              <div className='mb-3 mt-2'>
                <label className='form-label text-color'>{t("apellidos")}</label>
                <input
                  className='form-control'
                  id='apellidos'
                  placeholder='Apellidos'
                  value={apellidos}
                  onChange={e => setApellidos(e.target.value)}
                />
                <div id='errApellidos' style={{ display: 'none', color: 'red' }}>
                  {t("errApellidos")}
                </div>
              </div>
              <div className='mb-3'>
                <label htmlFor='password' className='form-label text-color'>
                  {t("contraseña")}
                </label>
                <input
                  type='password'
                  className='form-control'
                  value={passwd}
                  id='password'
                  onChange={e => setPasswd(e.target.value)}
                  placeholder='Contraseña'
                />
                <div id='errFormatPass' style={{ display: 'none', color: 'red' }}>
                  {t("errFormatoContrasena")}
                </div>
              </div>
  
              <div className='mb-3'>
                <label htmlFor='password' className='form-label text-color'>
                  {t("repPass")}
                </label>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  value={repPasswd}
                  onChange={e => setRepPasswd(e.target.value)}
                  placeholder='Repite la contraseña'
                />
              </div>
              <div id='errPassIgual' style={{ display: 'none', color: 'red' }}>
                {t("errPassIgual")}
              </div>
              <div id='errBack' style={{ display: 'none', color: 'red' }}>
                {t("errInterno")}
              </div>
              <button type='submit' className='btn btn-success w-100 mt-3'>
                {t("edit_usr")}
              </button>
              <a href='/cuenta-usr' className='btn btn-danger w-100 mt-3' role='button'>
                {t("cancelar")}
              </a>
            </div>
          </form>
        </div>
      </div>
      )}
    </>
  )
}

export default EditarCuenta
