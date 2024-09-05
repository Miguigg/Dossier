import validadorLogin from '../utils/validadores/validadorLogin';
import Login from '../pages/Login'
import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

describe('validarLogin', () => { 
    beforeEach(() =>{
        render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
        )
    })

    it("Valida correctamente un login", () =>{
        expect(validadorLogin("miguel@gmail.com")).toBe(true)
    })

    it("Valida como erroneo el gmail", () =>{
        expect(validadorLogin("miguelgmail.com")).toBe(false)
    })
 })