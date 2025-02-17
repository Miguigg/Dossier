import { useEffect, useMemo, useState } from 'react'
import {
  User,
  signInWithEmailAndPassword,
  getIdToken,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '~firebase'
import loading from './assets/loading.gif'
import x from './assets/x.png'
import check from './assets/check.png'
import './style.css'

export default function IndexPopup () {
  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')
  const [user, setUser] = useState<User>(null)
  const [enlace, setEnlace] = useState('')
  const [temas, setTemas] = useState({})
  const [showResMistral, setshowResMistral] = useState(false)
  const [showLoadingMistral, setshowLoadingMistral] = useState(false)

  const handleShowMistral = () => {
    setshowResMistral(true)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
      useMemo(() => (user), [user])
    })
  }, [])

  function validarEnlaceNoticia (enlace) {
    const reEnlace =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/

    if (!reEnlace.test(enlace)) {
      document.getElementById('errEnlace').style.display = 'block'
    } else {
      document.getElementById('errEnlace').style.display = 'none'
    }
    return reEnlace.test(enlace)
  }

  const ejecutarTest = async e => {
    e.preventDefault()
    if (validarEnlaceNoticia(enlace)) {
      setshowLoadingMistral(true)
      try {
        onAuthStateChanged(auth, async user => {
          if (user) {
            const token = await getIdToken(user)
            fetch('http://localhost:3000/mistralAPI/extension', {
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
                setTemas(data)
                handleShowMistral()
                document.getElementById('errPeticionMistral').style.display =
                  'none'
                setshowLoadingMistral(false)
              })
              .catch(e => {
                setshowLoadingMistral(false)
                document.getElementById('errPeticionMistral').style.display =
                  'block'
              })
          }
        })
      } catch (e) {
        setshowLoadingMistral(false)
        document.getElementById('errPeticionMistral').style.display = 'block'
      }
    }
  }

  const signIn = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, passwd)
      .then(userCredential => {
        const user = userCredential.user
        setUser(user)
        setPersistence(auth, browserLocalPersistence)
      })
      .catch(error => {
        const errorCode = error.code

        if (errorCode === 'auth/id-token-expired') {
          document.getElementById('errSesion').style.display = 'block'
        } else {
          document.getElementById('errSesion').style.display = 'none'
        }
        if (errorCode === 'auth/internal-error') {
          document.getElementById('errSesion').style.display = 'block'
        } else {
          document.getElementById('errSesion').style.display = 'none'
        }
        if (errorCode === 'auth/user-not-found') {
          document.getElementById('errUsuarioServidor').style.display = 'block'
        } else {
          document.getElementById('errUsuarioServidor').style.display = 'none'
        }
        if (errorCode === 'auth/too-many-requests') {
          document.getElementById('errPeticiones').style.display = 'block'
        } else {
          document.getElementById('errPeticiones').style.display = 'none'
        }
        if (errorCode === 'auth/invalid-email') {
          document.getElementById('errEmail').style.display = 'block'
        } else {
          document.getElementById('errEmail').style.display = 'none'
        }
        if (errorCode === 'auth/invalid-credential') {
          document.getElementById('errUsuarioServidor').style.display = 'block'
        } else {
          document.getElementById('errUsuarioServidor').style.display = 'none'
        }
      })
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
        width: '300px'
      }}
    >
      <h1>
        Bienvenido a <a href=' http://localhost:5173/'>Dossier</a>!
      </h1>
      {!user ? (
        <div>
          <form onSubmit={signIn}>
            <p>
              <label htmlFor='email'>
                Tu email
              </label>
              <input
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                id='email'
                placeholder='Enter your email'
              />
              <div id='errEmail' style={{ display: 'none', color: 'red' }}>
                <p>Error en el Correo</p>
              </div>
            </p>
            <p>
              <label htmlFor='password' className='form-label text-color'>
                Contraseña
              </label>
              <input
                type='password'
                value={passwd}
                id='password'
                onChange={e => setPasswd(e.target.value)}
                placeholder='Enter your password'
              />
            </p>
            <div id='errCuenta' style={{ display: 'none', color: 'red' }}>
              <p>Error de sesion</p>
            </div>
            <div id='errSesion' style={{ display: 'none', color: 'red' }}>
              <p>Error de sesion</p>
            </div>
            <div id='errInterno' style={{ display: 'none', color: 'red' }}>
              <p>Error interno</p>
            </div>
            <div
              id='errUsuarioServidor'
              style={{ display: 'none', color: 'red' }}
            >
              <p>Usuario desconocido</p>
            </div>
            <div id='errPeticiones' style={{ display: 'none', color: 'red' }}>
              <p>Demasiados intentos</p>
            </div>
            <br />
            <button
              type='submit'
              className='btn btn-primary w-100 mt-3 text-color'
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div>
        {!!user ? (
          <div>
            <form onSubmit={ejecutarTest}>
              <label className='form-label mt-2 text-color'>Enlace</label>
              <input
                className='form-control'
                onChange={e => setEnlace(e.target.value)}
                id='enlace'
                placeholder='Enter your link'
              />
              <button
                type='submit'
                className='btn btn-primary w-100 mt-3 text-color'
              >
                Test
              </button>
              <div id='errEnlace' style={{ display: 'none', color: 'red' }}>
                <p>Error en el enlace</p>
              </div>
              <div
                id='errPeticionMistral'
                style={{ display: 'none', color: 'red' }}
              >
                Error al conectar con el servidor
              </div>
            </form>
            {showLoadingMistral && (
              <img src={loading} width={50} height={50} alt='logo' />
            )}

            {showResMistral && (
              <div>
                <ul className='list-group list-group-flush'>
                  <h1>Resumen</h1>
                  <p className='resumen'>{temas.results[0].resumen.choices[0].message.content}</p>
                  <h1>Temas del articulo</h1>
                  {temas.results[0].tags.choices[0].message.content
                    .split(',')
                    .map((item, index) => (
                      <li key={index} className='resumen'>
                        {item}
                      </li>
                    ))}
                </ul>
                <table>
                  <thead>
                    <tr>
                      <th>Presencia</th>
                      <th>Conclusión</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(temas.results[0].categories).map(
                      (key, index) => {
                        if (
                          key != 'health' &&
                          key != 'law' &&
                          key != 'pii' &&
                          key != 'financial'
                        ) {
                          return (
                            <tr key={index}>
                              <td>{key.replace("_", " ")}</td>
                              <td>
                                {temas.results[0].categories[key] ? (
                                  <img
                                    src={x}
                                    width={50}
                                    height={50}
                                    alt='logo'
                                  />
                                ) : (
                                  <img
                                    src={check}
                                    width={50}
                                    height={50}
                                    alt='logo'
                                  />
                                )}
                              </td>
                            </tr>
                          )
                        }
                      }
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          ''
        )}
      </div>
      )}
    </div>
  )
}
