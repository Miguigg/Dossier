import validacionEtiqueta from '../utils/validadores/validacionEtiqueta';
import CrearEtiqueta from '../pages/GestionEtiquetas/CrearEtiqueta';
import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

describe('validarEtiqueta', () => { 
    beforeEach(() =>{
        render(
        <BrowserRouter>
            <CrearEtiqueta />
        </BrowserRouter>
        )
    })

    it("Valida correctamente una etiqueta", () =>{
        expect(validacionEtiqueta("ET1",  "Etiqueta de ejemplo")).toBe(true)
    })
    it("Valida como erronea una etiqueta", () =>{
        expect(validacionEtiqueta("ET-1",  "Etiqueta de ejemplo")).toBe(false)
    })
 })