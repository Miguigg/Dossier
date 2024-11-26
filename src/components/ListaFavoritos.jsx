import { Link } from 'react-router-dom'

import '../css/CuentaUsr.css'
import '../css/comun.css'

function ListaFavs (props) {
  const t = props.t
  return (
    <>
      <h2 className='text-dark'>
        {t('accesos_directos')}
        <hr className='border border-primary border-3 opacity-75'></hr>
      </h2>
      <p className='text-color'>{t('medios_favs')}</p>
      {props.accesos.length < 1 ? (
        <div className='text-err'>
          <h1>{t('err_vacio_accesos')}</h1>
          <div className='p-4'>
            <a
              href='/crear-acceso-directo'
              className='btn btn-success w-100 mt-3'
              role='button'
            >
              {t('anhadir_accesos')}
            </a>
          </div>
        </div>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th scope='col' className='text-color'>
                  {t('nombre_acceso_dir')}
                </th>
                <th scope='col' className='text-color'>
                  {t('opciones')}
                </th>
              </tr>
            </thead>
            <tbody>
              {props.accesos.map(item => (
                <tr data-testid={item.idAcceso} key={item.idAcceso}>
                  <td>
                    <a
                      type='button'
                      href={item.enlace}
                      className='btn btn-info'
                    >
                      {item.nombre}
                    </a>
                  </td>
                  <td>
                    <Link
                      to='/eliminar-acceso-directo'
                      state={item}
                      className='btn btn-danger'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        className='bi bi-x-circle-fill'
                        viewBox='0 0 16 16'
                      >
                        <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z' />
                      </svg>
                    </Link>
                  </td>
                  <td>
                    <Link
                      to='/editar-acceso-directo'
                      state={item}
                      className='btn btn-success'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        className='bi bi-pencil-fill'
                        viewBox='0 0 16 16'
                      >
                        <path d='M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z' />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='p-4'>
            <a
              href='/crear-acceso-directo'
              className='btn btn-success w-100 mt-3'
              role='button'
            >
              {t('anhadir_accesos')}
            </a>
          </div>
        </div>
      )}
    </>
  )
}

export default ListaFavs
