import { useState } from "react";
import { useFirebase } from "~firebase/hook"
import {
  User,
  signInWithEmailAndPassword,
  getIdToken,
  onAuthStateChanged
} from 'firebase/auth'
import loading from './assets/loading.gif'
import x from './assets/x.png'
import check from './assets/check.png'
import './style.css'


import { auth } from "~firebase"

export default function IndexNewtab() {
  const { isLoading, onLogout } = useFirebase()
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

  const signIn = (e) => {
    e.preventDefault();
      signInWithEmailAndPassword(auth, email, passwd)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user)
      })
  }

    const ejecutarTest = async e => {
      e.preventDefault()
      if (validarEnlaceNoticia(enlace)) {
        setshowLoadingMistral(true)
        try {
          onAuthStateChanged(auth, async user => {
            if (user) {
              const token = await getIdToken(user)
              fetch('http://localhost:3000/mistralAPI/', {
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        gap: 4
      }}>
      <h1>
        Welcome to your <a href="https://www.plasmo.com">Plasmo</a> Extension!
      </h1>
      {!user ? (
        <div>
          <form onSubmit={signIn}>
            <label htmlFor="email" className="form-label mt-2 text-color">Tu email</label>
            <input type="email" className="form-control" value={email} onChange={(e)=> setEmail(e.target.value)} id="email" placeholder="Enter your email" />
            <label htmlFor="password" className="form-label text-color">Contraseña</label>
            <input type="password" className="form-control" value={passwd} id="password"  onChange={(e)=> setPasswd(e.target.value)} placeholder="Enter your password" />
            <button type="submit" className="btn btn-primary w-100 mt-3 text-color">Login</button>
          </form>
        </div>
      ) : (
        <button onClick={() => onLogout()}>Log out</button>
      )}
      <div>
        {isLoading ? "Loading..." : ""}
      </div>
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
                      Login
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
                        <p>{temas.results[0].resumen.choices[0].message.content}</p>
                        <h1>Temas del articulo</h1>
                        {temas.results[0].tags.choices[0].message.content
                          .split(',')
                          .map((item, index) => (
                            <li key={index} className='list-group-item'>
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
                                    <td>{key}</td>
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

    </div>
  )
}
