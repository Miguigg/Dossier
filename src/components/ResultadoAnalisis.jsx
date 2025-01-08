import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import Check from '../imagenes/check.png'
import X from '../imagenes/x.png'

function ResultadoAnalisis (props) {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(navigator.language)
  }, [])

  var resultados = props.json[0].categories
  return (
    <div className='mt-4'>
      <table>
        <thead>
          <tr>
            <th>Presemcia de...</th>
            <th>Conclusión</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(resultados).map((key, index) => {
            if (key != 'health' && key != 'law' && key != 'pii' && key != 'financial') {
              return (
                <tr key={index}>
                  <td>{t(key)}</td>
                  <td>{resultados[key] ? <img src={X} width={50} height={50} alt="logo"/> : <img src={Check} width={50} height={50} alt="logo"/>}</td>
                </tr>
              )
            }
          })}
        </tbody>
      </table>
      <hr />
      <p>Aquellos con un check quieren decir que el contenido analizado es correcto y no presenta amenazas de ese tipo</p>
    </div>
  )
}

export default ResultadoAnalisis
