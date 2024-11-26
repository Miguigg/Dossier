import { render, screen } from '@testing-library/react'
import MisEtiquetas from '../components/MisEtiquetas'
import { beforeEach, describe, expect, it } from 'vitest'
import { BrowserRouter } from 'react-router-dom'

describe('MisEtiquetas', () => {
  const testObj = [
    {
      descripcion: 'Etiqueta creada por defecto para tus favoritos',
      flag: 'noEditable',
      idEtiqueta: 'hKEIBVYHGHSgNMOIQCMf',
      idUsuario: 'Xtp2o1dsl9UML7SoWRd01nFSjus2',
      nombre: 'Mis favoritos'
    },
    {
        descripcion: 'Etiqueta creada para el ejemplo',
        flag: 'editable',
        idEtiqueta: 'hKEIBVYHGHSgNMOIQCMg',
        idUsuario: 'Xtp2o1dsl9UML7SoWRd01nFSjus3',
        nombre: 'ET2'
    }
  ]

  beforeEach(() => {
    render(
      <BrowserRouter>
        <MisEtiquetas etiquetas={testObj} />
      </BrowserRouter>
    )
  })

  it('Se carga el componente', () => {
    const label1 = screen.getByText(/Nombre Etiqueta/i)
    expect(label1).toBeInTheDocument()
  })

  it('Se cargan las etiquetas', () => {
    expect(screen.getByTestId('hKEIBVYHGHSgNMOIQCMf')).toBeInTheDocument();
    expect(screen.getByTestId('hKEIBVYHGHSgNMOIQCMg')).toBeInTheDocument();
  })
})
