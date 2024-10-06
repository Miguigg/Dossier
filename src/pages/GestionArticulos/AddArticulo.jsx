import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { collection, query, where, getDocs , doc,  addDoc, updateDoc } from 'firebase/firestore'
import ComponenteModal from '../../components/ComponenteModal';
import { useTranslation } from 'react-i18next';

import exportFuncionesCuenta from '../../utils/firebase';
import validarArticulo from '../../utils/validadores/validadorArticulo';
import '../../css/landing.css'
import '../../css/login.css'


function AddArticulo() {
    const [usuarioAutenticado, setUsuarioAutenticado] = useState('')
    const [nombre, setNombre] = useState('');
    const [enlace, setEnlace] = useState('');
    const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState('')
    const [descripcion, setDescripcion] = useState('');

    const [listaEtiquetas, setListaEtiquetas] = useState('')
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const {t, i18n} = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(navigator.language)
    }, [])
  

    let handleEtiquetaChange = (e) => {
      setEtiquetaSeleccionada(e.target.value)
    }

    const handleShowAlert = () => {
      handleShow()
    };
  
    const handleClose = () => {
      setShow(false)
    };
  

    function getDocsEtiquetas () {
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
          handleClose()
        } else {
          handleShowAlert()
        }
      })
    }

    const navigate = useNavigate()

    const handleRedirect = () => {
      navigate('/etiquetas')
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
      onAuthStateChanged(auth, user => {
        if (user) {
          getDocsEtiquetas()
          handleClose()
        } else {
          handleShowAlert()
        }
      })
    }, [])
    

    const AñadirArticulo = (e) => {
      e.preventDefault();
      if(validarArticulo(nombre, enlace,etiquetaSeleccionada,descripcion)){
        onAuthStateChanged(auth, async user => {
          if (user) {
            const uid = user.uid
            try {
              const docRef = await addDoc(
                collection(exportFuncionesCuenta.db, 'Articulos'),
                {
                  nombre: nombre,
                  enlace: enlace,
                  idUsuario: uid,
                  descripcion: descripcion,
                  idEtiqueta: etiquetaSeleccionada
                }
              )
              const etRef = doc(exportFuncionesCuenta.db, "Articulos", docRef.id);
              await updateDoc(etRef, {
                idArticulo: docRef.id
              })
              handleClose()
              handleRedirect()
            } catch (e) {
              handleRedirect()
            }
          } else {
            handleRedirect()
          }
        })
      }
      }

    const hasValues = obj => Object.keys(obj).length > 0;


    return (
      <>
            {usuarioAutenticado === null ? (
        <div className='p-5'>
          <h1>{t("errSesionIniciada")}</h1>
        </div>
      ) : (
          <div className="container">
          <div className="login-container gradient-bg-landing">
            <h2 className="text-center text-color">{t("anhadir_art")}</h2>
            <form onSubmit={AñadirArticulo}>
              <div className="mb-3">
                <label className="form-label mt-2 text-color">{t("art_nombre")}</label>
                <input type="text" className="form-control" value={nombre} onChange={(e)=> setNombre(e.target.value)} id="nombre" placeholder={t("art_nombre")} />
                <div id="errNombre" style={{display: "none", color: "red"}}>
                {t("err_nombre_art")}
                </div>
              </div>
              <div>
                  <label className="form-label mt-2 text-color">{t("selecciona_etq")}</label>
                  {hasValues(listaEtiquetas) ? (
                  <select id="selectEtc" className="form-select form-select mb-3" onChange={handleEtiquetaChange}> 
                    <option value="0"> -- {t("selecciona_etq")} -- </option>  
                    {listaEtiquetas.map((et) => <option key={et.idEtiqueta} value={et.idEtiqueta}>{et.nombre}</option>)}
                  </select>
                  ) : (
                    <div id="errSelect" style={{display: "block", color: "red"}}>
                    {t("err_etq_disp")}
                    </div>
                  )}
                  <div id="errSelect" style={{display: "none", color: "red"}}>
                  {t("err_select_etq")}
                  </div>
              </div>
              <div className='mb-3'>
                <label className='form-label mt-2 text-color'>{t("enlace")}</label>
                <input
                  type='text'
                  className='form-control'
                  value={enlace}
                  onChange={e => setEnlace(e.target.value)}
                  id='enlace'
                  placeholder={t("enlace")}
                />
                <div id='errEnlace' style={{ display: 'none', color: 'red' }}>
                  {t("err_link")}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label text-color">{t("descripcion")}</label>
                <textarea className="form-control" value={descripcion} placeholder={t("descripcion")} id="descripcion"  onChange={(e)=> setDescripcion(e.target.value)}></textarea>
                <div id="errDescripcion" style={{display: "none", color: "red"}}>
                {t("err_descripcion")}
                </div>
              </div>
              <button type="submit" className="btn btn-success w-100 mt-3">{t("anhadir_art")}</button>
              <a href="/etiquetas" className="btn btn-danger w-100 mt-3" role="button">{t("cancelar")}</a>
            </form>
          </div>
          <ComponenteModal show={show} handleClose={handleClose} msg={t("errInterno")} />
        </div>
      )}
      </>
    );
  }
  
  export default AddArticulo;