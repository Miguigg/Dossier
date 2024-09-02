import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/index.css'
import Logo from '../imagenes/logo_Dossier.png'
import Autenticacion from './Autenticacion';

function Navs() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary gradient-bg-nav">
      <Container>
        <Navbar.Brand as={Link} to="/home"><img src={Logo} width={50} height={50} alt="logo"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Autenticacion/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navs;