import validaRegistro from '../utils/validadores/validadorRegistro';
import Registro from '../pages/Registro'
import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

describe('validarRegistro', () => {

    beforeEach(() =>{
        render(
        <BrowserRouter>
            <Registro />
        </BrowserRouter>
        )
    })

    it("Valida correctamente un registro", () =>{
        expect(validaRegistro("Miguel", "Gómez", "miguel@gmail.com", "Misster1412*", "Misster1412*")).toBe(true)
    })
    it("Detecta un fallo en el apellido", () =>{
        expect(validaRegistro("Miguel", "Gómez*****", "miguel@gmail.com", "Misster1412*", "Misster1412*")).toBe(false)
    })
    it("Detecta un fallo en el gmail", () =>{
        expect(validaRegistro("Miguel", "Gómez", "miguel@", "Misster1412", "Misster1412")).toBe(false)
    })
    it("Detecta un fallo en la contraseña", () =>{
        expect(validaRegistro("Miguel", "Gómez", "miguel@gmail.com", "Misster1412*", "Misster1412")).toBe(false)
    })
 })