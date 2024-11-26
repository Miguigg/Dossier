import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react'

import '../css/landing.css'

function VerticalNav (props) {

  const {t, i18n} = useTranslation();

  useEffect(() => {
      i18n.changeLanguage(navigator.language)
  }, [])

  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <div className='p-5'>
      <h2>
        {t("mis_etq")}
        <hr className='border border-primary border-3 opacity-75'></hr>
      </h2>
      <nav className='navbar'>
        {props.listaEtiquetas.length < 1 ? (
          <div className='text-err'>
            <h1>{t("err_et_vacias")}</h1>
          </div>
        ) : (
          <div className='container-fluid gradient-bg-landing'>
            <ul className='navbar-nav'>
            {props.listaEtiquetas.map(item => (
              <li className='nav-item' data-testid={item.idEtiqueta} key={item.idEtiqueta}>
                <Link
                    to="/etiquetas"
                    state={item.idEtiqueta}
                    className='nav-link'
                    onClick={refreshPage}
                  >
                {item.nombre}
                </Link>
            </li>
            ))}
            </ul>
          </div>
        )}
      </nav>
    </div>
  )
}

export default VerticalNav
