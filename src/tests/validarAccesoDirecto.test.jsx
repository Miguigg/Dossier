import validarAccesoDirecto from '../utils/validadores/validarAccesoDirecto';
import CrearAccesoDirecto from '../pages/GestionAccesosDirectos/CrearAccesoDirecto'
import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

describe('validarAccesoDirecto', () => { 
    beforeEach(() =>{
        render(
        <BrowserRouter>
            <CrearAccesoDirecto />
        </BrowserRouter>
        )
    })

    it("Valida correctamente el acceso directo", () =>{
        expect(validarAccesoDirecto("NombreEjemplo", "https://www.elmundo.es/")).toBe(true)
    })

    it("Falla por el nombre", () =>{
        expect(validarAccesoDirecto("Nombre***Ejemplo", "https://www.elmundo.es/")).toBe(false)
    })

    it("Falla por enlace no válido", () =>{
        expect(validarAccesoDirecto("NombreEjemplo", "www.elmundo.es/")).toBe(false)
    })
 })