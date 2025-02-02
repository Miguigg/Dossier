import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import Check from '../imagenes/check.png'
import X from '../imagenes/x.png'

function ResultadoAnalisis (props) {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(navigator.language)
  }, [i18n])

  var temas = props.json.results[0].tags.choices[0].message.content
  var array = temas.split(",");
  console.log((array))
  var resultados = props.json.results[0].categories
  return (
    <div className='mt-4'>
      <h2 className='text-dark'>
        {t('resumen')}
        <hr className='border border-primary border-3 opacity-75'></hr>
      </h2>
      <p>{props.json.results[0].resumen.choices[0].message.content}</p>
      <table>
        <thead>
          <tr>
            <th>{t('presencia')}</th>
            <th>{t('conclusion')}</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(resultados).map((key, index) => {
            if (
              key != 'health' &&
              key != 'law' &&
              key != 'pii' &&
              key != 'financial'
            ) {
              return (
                <tr key={index}>
                  <td>{t(key)}</td>
                  <td>
                    {resultados[key] ? (
                      <img src={X} width={50} height={50} alt='logo' />
                    ) : (
                      <img src={Check} width={50} height={50} alt='logo' />
                    )}
                  </td>
                </tr>
              )
            }
          })}
        </tbody>
      </table>
      <hr />
      <p>{t('guiaImgs')}</p>
      <h2 className='text-dark'>
        {t('temas')}
        <hr className='border border-primary border-3 opacity-75'></hr>
      </h2>
      <ul className="list-group list-group-flush">
      {array.map((item, index) => (
        <li key={index} className="list-group-item">{item}</li>
      ))}
      </ul>
    </div>
  )
}

export default ResultadoAnalisis
