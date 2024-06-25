import '../src/css/App.css'
import Landing from './pages/Landing';
import 'bootstrap/dist/css/bootstrap.css'; 
import Navs from './components/Nav';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Registro from './pages/Registro';

function App() {
  return (
    <div className='App'>
      <Navs/>
      <div>
        <Routes>
          <Route path="/home" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro/>} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
