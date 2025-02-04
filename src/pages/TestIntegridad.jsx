import { useState, useEffect } from 'react'
import { onAuthStateChanged, getIdToken } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useTranslation } from 'react-i18next'
import ResultadoAnalisis from '../components/ResultadoAnalisis'

import validarEnlaceNoticia from '../utils/validadores/validarEnlaceNoticia'
import loading from '../imagenes/loading.gif'


function TestIntegridad () {
  const [enlace, setEnlace] = useState('')
  const [resMistral, setResMistral] = useState({})

  const [usuarioAutenticado, setUsuarioAutenticado] = useState('')
  const [showResMistral, setshowResMistral] = useState(false)
  const [showLoadingMistral, setshowLoadingMistral] = useState(false)

  const handleShowMistral = () => {
    setshowResMistral(true)
  }

  const { t, i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(navigator.language)
  }, [i18n])

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

  const ejecutarTest = async e => {
    e.preventDefault()
    if (validarEnlaceNoticia(enlace)) {
      setshowLoadingMistral(true)
      try {    
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const token = await getIdToken(user);
            fetch("http://localhost:3000/mistralAPI/", {
              method: 'POST', 
              headers: {
                'Content-Type': 'application/json' 
              },
              body: JSON.stringify({
                url: enlace,
                token: token
              })
            })
            .then(response => response.json()) 
            .then(data => {
              setResMistral(data)
              handleShowMistral()
              document.getElementById('errPeticionMistral').style.display = 'none'
              setshowLoadingMistral(false)
            })
            .catch(() => {
              setshowLoadingMistral(false)
              document.getElementById('errPeticionMistral').style.display = 'block'
            });
          }
        });
      } catch {
        setshowLoadingMistral(false)
        document.getElementById('errPeticionMistral').style.display = 'block'
      }
    }
  }

  return (
    <>
      {usuarioAutenticado === null ? (
        <div className='p-5'>
          <h1>{t('errSesionIniciada')}</h1>
        </div>
      ) : (
        <div className='container my-5'>
          <h1 className='mb-4'>{t('test_int')}</h1>
          <div className='container'>
            <section className='text-black py-5 ms-5 me-5 p-auto rounded-4 gradient-bg-landing'>
              <div className='container'>
                <form onSubmit={ejecutarTest}>
                  <h2 className='text-center text-color p-5'>
                    {t('int_enlace')}
                  </h2>
                  <input
                    type='text'
                    className='form-control'
                    id='enlace'
                    value={enlace}
                    onChange={e => setEnlace(e.target.value)}
                    placeholder={t('enlace')}
                  />
                  <div className='p-5'>
                    <button className='btn btn-success btn-lg'>
                      {t('inspec_articulo')}
                    </button>
                  </div>
                </form>
                <div id='errEnlace' style={{ display: 'none', color: 'red' }}>
                  {t('err_link')}
                </div>
              </div>
            </section>
          </div>
          <div
            id='errPeticionMistral'
            style={{ display: 'none', color: 'red' }}
          >
            {t('errPeticionMistral')}
          </div>
          <div id='errPeticionOpenAI' style={{ display: 'none', color: 'red' }}>
            {t('errPeticionOpenAI')}
          </div>
          {showLoadingMistral && <img src={loading} width={50} height={50} alt="logo"/>}

          {showResMistral && <ResultadoAnalisis json={resMistral} />}
        </div>
      )}
    </>
  )
}

export default TestIntegridad
