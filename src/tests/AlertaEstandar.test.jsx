import { render, screen } from '@testing-library/react';
import AlertaEstandar from "../components/AlertaEstandar";
import { beforeEach, describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

describe('AlertaEstandar', () => { 
    beforeEach(() =>{
        render(
        <BrowserRouter>
            <AlertaEstandar show={true} setShow={false} message={"Prueba"} variant/>
        </BrowserRouter>
        )
    })

    
    it("Se carga el componente", () =>{
        const label1 = screen.getByText(/Prueba/i) 
        expect(label1).toBeInTheDocument();
    })

 })