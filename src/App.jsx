import '../src/css/App.css'
import Landing from './pages/Landing';
import 'bootstrap/dist/css/bootstrap.css'; 
import Navs from './components/Nav';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Registro from './pages/Registro';
import CuentaUsr from './pages/CuentaUsr';
import UltimasNoticias from './pages/UltimasNoticias';
import Etiquetas from './pages/Etiquetas';
import TestIntegridad from './pages/TestIntegridad';
import CrearEtiqueta from './pages/GestionEtiquetas/CrearEtiqueta';
import EditarEtiqueta from './pages/GestionEtiquetas/EditarEtiqueta';
import EliminarEtiqueta from './pages/GestionEtiquetas/EliminarEtiqueta';
import AddArticulo from './pages/GestionArticulos/AddArticulo';
import EliminarArticulo from './pages/GestionArticulos/EliminarArticulo';
import EditArticulo from './pages/GestionArticulos/EditarArticulo';
import EditarCuenta from './pages/GestionCuenta/EditarCuenta';
import EliminarCuenta from './pages/GestionCuenta/EliminarCuenta';
import AddAccesoDirecto from './pages/GestionAccesosDirectos/CrearAccesoDirecto';
import EliminarAccesoDirecto from './pages/GestionAccesosDirectos/EliminarAccesoDirecto'; 
import EditarAccesoDirecto from './pages/GestionAccesosDirectos/EditarAccesoDirecto';
import RecuerarPass from './pages/RecuperarContraseña';

function App() {
  return (
    <div className='App'>
      <Navs/>
      <div>
        <Routes>
          <Route path="/home" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro/>} />
          <Route path='/cuenta-usr' element={<CuentaUsr/>}/>
          <Route path='/editar-cuenta' element={<EditarCuenta/>}/>
          <Route path='/eliminar-cuenta' element = {<EliminarCuenta/>}/>
          <Route path='/utlimas-noticias' element={<UltimasNoticias/>} />

          <Route path='/etiquetas' element={<Etiquetas/>} />
          <Route path='/crear-etiqueta' element = {<CrearEtiqueta/>}/>
          <Route path='/editar-etiqueta' element = {<EditarEtiqueta/>}/>
          <Route path='/eliminar-etiqueta' element = {<EliminarEtiqueta/>}/>

          <Route path='/test-integridad' element = {<TestIntegridad/>} />

          <Route path='/add-articulo' element = {<AddArticulo/>}/>
          <Route path='/editar-articulo' element = {<EditArticulo/>}/>
          <Route path='/eliminar-articulo' element = {<EliminarArticulo/>}/>

          <Route path='/crear-acceso-directo' element= {<AddAccesoDirecto/>}/>
          <Route path='/eliminar-acceso-directo' element = {<EliminarAccesoDirecto/>}/>
          <Route path='/editar-acceso-directo' element = {< EditarAccesoDirecto />}/>
          <Route path='/recuperar-contrasenha' element = { < RecuerarPass />  }/>
          <Route path="/" element={<Landing />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;