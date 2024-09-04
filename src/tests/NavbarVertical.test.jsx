import { render, screen } from '@testing-library/react'
import NavbarVertical from '../components/NavbarVertical'
import { beforeEach, describe, expect, it } from 'vitest'
import { BrowserRouter } from 'react-router-dom'

describe('NavbarVertical', () => {
  const testObj = [
    {
        descripcion: 'Etiqueta creada por defecto para tus favoritos',
        flag: 'noEditable',
        idEtiqueta: 'hKEIBVYHGHSgNMOIQCMe',
        idUsuario: 'Xtp2o1dsl9UML7SoWRd01nFSjus1',
        nombre: 'Mis favoritos'
      },
      {
        descripcion: 'Etiqueta creada para el ejemplo',
        flag: 'editable',
        idEtiqueta: 'hKEIBVYHGHSgNMOIQCWe',
        idUsuario: 'Xtp2o1dsl9UML7SoWRd01nFSjus1',
        nombre: 'ET1'
      }
  ]

  beforeEach(() => {
    render(
      <BrowserRouter>
        <NavbarVertical listaEtiquetas={testObj} />
      </BrowserRouter>
    )
  })

  it('Se carga el componente', () => {
    const label1 = screen.getByText(/Mis Etiquetas/i)
    expect(label1).toBeInTheDocument()
  })

  it('Se cargan las etiquetas', () => {
    expect(screen.getByTestId('hKEIBVYHGHSgNMOIQCMe')).toBeInTheDocument();
    expect(screen.getByTestId('hKEIBVYHGHSgNMOIQCWe')).toBeInTheDocument();
  })
})
