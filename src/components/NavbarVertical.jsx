import { Link } from 'react-router-dom'

import '../css/landing.css'

function VerticalNav (props) {
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <div className='p-5'>
      <h2>
        Mis Etiquetas
        <hr className='border border-primary border-3 opacity-75'></hr>
      </h2>
      <nav className='navbar'>
        {props.listaEtiquetas.length < 1 ? (
          <div className='text-err'>
            <h1>No hay etiquetas que mostrar</h1>
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
