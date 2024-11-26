import validarEnlaceNoticia from '../utils/validadores/validarEnlaceNoticia';
import TestIntegridad from '../pages/TestIntegridad';
import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

describe('validarEnlaceNoticias', () => { 
    beforeEach(() =>{
        render(
        <BrowserRouter>
            <TestIntegridad />
        </BrowserRouter>
        )
    })

    it("Valida correctamente un enlace", () =>{
        expect(validarEnlaceNoticia("https://www.eldiario.es/politica/presidenta-judicial-defiende-nombramiento-reconocimiento-lucha-mujeres-inmerecida-invisibilidad_1_11630809.html")).toBe(true)
    })

    it("Valida un enlace como falso", () =>{
        expect(validarEnlaceNoticia("ww.eldiario.es/politica/presidenta-judicial-defiende-nombramiento-reconocimiento-lucha-mujeres-inmerecida-invisibilidad_1_11630809.html")).toBe(false)
    })
 })
