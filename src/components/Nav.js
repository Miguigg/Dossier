import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/index.css'
import Logo from '../imagenes/logo192.png'

function Navs() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary gradient-bg-nav">
      <Container>
        <Navbar.Brand as={Link} to="/home"><img src={Logo} width={25} height={25} alt="logo"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/login"><b className='text-white'>Login</b></Nav.Link>
            <Nav.Link as={Link} to="/registro"><b className='text-white'>Registro</b></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navs;