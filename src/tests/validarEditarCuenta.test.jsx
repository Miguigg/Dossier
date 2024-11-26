import validarEditarCuenta from '../utils/validadores/validacionEditarCuenta';
import EditarCuenta from '../pages/GestionCuenta/EditarCuenta'
import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

describe('validarEditarCuenta', () => {

    beforeEach(() =>{
        render(
        <BrowserRouter>
            <EditarCuenta />
        </BrowserRouter>
        )
    })

    it("Valida correctamente una modificación", () =>{
        expect(validarEditarCuenta("Miguel", "Gómez", "*****", "Misster1412*", "Misster1412*")).toBe(false)
    })
 })