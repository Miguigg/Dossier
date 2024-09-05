import validadorArticulo from '../utils/validadores/validadorArticulo';
import AddArticulo from '../pages/GestionArticulos/AddArticulo'
import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

describe('validadorArticulo', () => { 
    beforeEach(() =>{
        render(
        <BrowserRouter>
            <AddArticulo />
        </BrowserRouter>
        )
    })

    it("Valida correctamente un registro", () =>{
        expect(validadorArticulo("at1", "https://www.eldiario.es/economia/estadistica-oficial-admite-desviacion-32-480-millones-pib-espanol_129_11629626.html", "et1", "Articulo de ejemplo")).toBe(true)
    })

    it("Detecta un fallo en el nombre", () =>{
        expect(validadorArticulo("at1///", "https://www.eldiario.es/economia/estadistica-oficial-admite-desviacion-32-480-millones-pib-espanol_129_11629626.html", "et1", "Articulo de ejemplo")).toBe(false)
    })

    it("Falla el enlace", () =>{
        expect(validadorArticulo("at1", "economia/estadistica-oficial-admite-desviacion-32-480-millones-pib-espanol_129_11629626.html", "et1", "Articulo de ejemplo")).toBe(false)
    })

    it("Falla la etiqueta seleccionada por se la por defecto ", () =>{
        expect(validadorArticulo("at1", "https://www.eldiario.es/economia/estadistica-oficial-admite-desviacion-32-480-millones-pib-espanol_129_11629626.html", "0", "Articulo de ejemplo")).toBe(false)
    })

    it("Falla la etiqueta seleccionada por ser erronea (no existe)", () =>{
        expect(validadorArticulo("at1", "https://www.eldiario.es/economia/estadistica-oficial-admite-desviacion-32-480-millones-pib-espanol_129_11629626.html", "", "Articulo de ejemplo")).toBe(false)
    })

    it("Falla la descripción por caracteres no validos", () =>{
        expect(validadorArticulo("at1", "https://www.eldiario.es/economia/estadistica-oficial-admite-desviacion-32-480-millones-pib-espanol_129_11629626.html", "et1", "Articulo de ejemplo****")).toBe(false)
    })
 })