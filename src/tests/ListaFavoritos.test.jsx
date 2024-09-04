import { render, screen } from '@testing-library/react';
import ListaFavoritos from "../components/ListaFavoritos";
import { beforeEach, describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

describe('ListaFavoritos', () => {
    const testObj = [
        {
            enlace: "https://www.elmundo.es/index.html",
            idAcceso: "42fY53UsPsTmPq2OEwbB",
            idUsuario: "Xtp2o1dsl9UML7SoWRd01nFSjus1",
            nombre: "El Mundo"
        },
        {
            enlace: "https://www.elmundo.es/index.html",
            idAcceso: "42fY53UsPsTmPq2OEwbC",
            idUsuario: "Xtp2o1dsl9UML7SoWRd01nFSjus1",
            nombre: "El Pais"
        }
    ]

    beforeEach(() =>{
        render(
        <BrowserRouter>
            <ListaFavoritos accesos={testObj}/>
        </BrowserRouter>
        )
    })

    it("Se carga el componente", () =>{
        const label1 = screen.getByText(/Nombre medio/i) 
        expect(label1).toBeInTheDocument();
    })
    it("Se rellenan los inputs con los datos del usuario", () => {
        expect(screen.getByTestId('42fY53UsPsTmPq2OEwbB')).toBeInTheDocument();
        expect(screen.getByTestId('42fY53UsPsTmPq2OEwbC')).toBeInTheDocument();
    })
})