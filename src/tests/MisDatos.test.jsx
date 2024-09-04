import { render, screen } from '@testing-library/react';
import MisDatos from "../components/MisDatos";
import { beforeEach, describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

describe('MisDatos', () => {

    const testObj = {
        apellidos: "Gómez García",
        contraseña: "test",
        correo: "miguigg1412@gmail.com",
        nombre: "Miguel"
    }

    beforeEach(() =>{
        render(
        <BrowserRouter>
            <MisDatos datosUsr={testObj}/>
        </BrowserRouter>
        )
    })

    it("Se carga el componente", () =>{
        const label1 = screen.getByText(/Nombre/i) 
        expect(label1).toBeInTheDocument();
    })
    it("Se rellenan los inputs con los datos del usuario", () => {
        expect(screen.getByDisplayValue('Miguel')).toBeInTheDocument();
        expect(screen.getByDisplayValue('miguigg1412@gmail.com')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Gómez García')).toBeInTheDocument();
    })
  });
