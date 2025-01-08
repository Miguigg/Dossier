import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useTranslation } from 'react-i18next';
import { extract } from '@extractus/article-extractor'
import { Mistral } from "@mistralai/mistralai";
import ResultadoAnalisis from '../components/ResultadoAnalisis';

import validarEnlaceNoticia from '../utils/validadores/validarEnlaceNoticia'
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true, maxRetries: 1});
const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
const client = new Mistral({apiKey});

function TestIntegridad () {
  const [enlace, setEnlace] = useState('')
  const [resMistral, setResMistral] = useState({})
  const [usuarioAutenticado, setUsuarioAutenticado] = useState('')
  const [showResMistral, setshowResMistral] = useState(false);

  const handleShow = () => {
    setshowResMistral(true);
  };
  const {t, i18n} = useTranslation();

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
  
  const runModerationOpenAI = async (text) => {
    await openai.moderations.create({
      model: "omni-moderation-latest",
      input: [text]
    }).then((response) => {
      console.log(response)
    })
  }

  const runModerationMistral = async (text) => {
    await client.classifiers.moderate({
      model : "mistral-moderation-latest",  
      inputs : [text]
    }).then((response) => {
      setResMistral(response.results)
      handleShow()
    })
  }

  const ejecutarTest = async e => {
    e.preventDefault()
    if (validarEnlaceNoticia(enlace)) {      
      try {
        const contenido = await extract(enlace)
        const filtrado = contenido.content.replace(/<\/?[^>]+(>|$)/g, "").replace(/(\r\n|\n|\r)/gm, "").replace(/\s\s+/g, ' ')
        
        //Comprobar que modelo está seleccionado
        runModerationMistral(filtrado)
        runModerationOpenAI(filtrado)
      } catch (err) {
        console.error(err)
      }
    }  
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
                    placeholder={t("enlace")}
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
          {showResMistral && <ResultadoAnalisis json={resMistral} />}
        </div>
      )}
    </>
  )
}

export default TestIntegridad
