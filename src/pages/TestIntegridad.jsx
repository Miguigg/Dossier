import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useTranslation } from 'react-i18next';
import validarEnlaceNoticia from '../utils/validadores/validarEnlaceNoticia'

function TestIntegridad () {
  const [enlace, setEnlace] = useState('')
  const [usuarioAutenticado, setUsuarioAutenticado] = useState('')

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

  const ejecutarTest = e => {
    e.preventDefault()
    if (validarEnlaceNoticia(enlace)) { /* empty */ }
  }

  return (
    <>
      {usuarioAutenticado === null ? (
        <div className='p-5'>
          <h1>{t("errSesionIniciada")}</h1>
        </div>
      ) : (
        <div className='container my-5'>
          <h1 className='mb-4'>{t("test_int")}</h1>
          <div className='container'>
            <section className='text-black py-5 ms-5 me-5 p-auto rounded-4 gradient-bg-landing'>
              <div className='container'>
                <form onSubmit={ejecutarTest}>
                  <h2 className='text-center text-color p-5'>
                    {t("int_enlace")}
                  </h2>
                  <input
                    type='text'
                    className='form-control'
                    id='enlace'
                    value={enlace}
                    onChange={e => setEnlace(e.target.value)}
                    placeholder='Enlace'
                  />
                  <div className='p-5'>
                    <button className='btn btn-success btn-lg'>
                      {t("inspec_articulo")}
                    </button>
                  </div>
                </form>
                <div id='errEnlace' style={{ display: 'none', color: 'red' }}>
                  {t("err_link")}
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  )
}

export default TestIntegridad
