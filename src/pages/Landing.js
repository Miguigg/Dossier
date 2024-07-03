import React from 'react';
import '../css/login.css'
import 'bootstrap/dist/css/bootstrap.css';
import '../css/landing.css'


function Landing(){
    return(
        <div className="App mt-2 container-react">
            <div>
            <header className="gradient-bg-landing text-white text-center py-5 ms-3 me-3 rounded-4">
                <div className="container">
                <h1 className='text-black'>Bienvenida/o a Dossier</h1>
                </div>
            </header>
    
            <section id="features" className="py-5">
                <div className="container">
                <h2 className="text-center">Caracteristicas</h2>
                <div className="row mt-4">
                    <div className="col-md-4">
                    <div className="card text-black">
                        <div className="card-body gradient-bg-landing">
                        <h5 className="card-title">Guarda tus noticias</h5>
                        <p className="card-text">Description of feature 1.</p>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-4">
                    <div className="card text-black">
                        <div className="card-body gradient-bg-landing">
                        <h5 className="card-title">Comprueba su veracidad</h5>
                        <p className="card-text">Description of feature 2.</p>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-4">
                    <div className="card text-black gradient-bg-landing">
                        <div className="card-body gradient-bg-landing">
                        <h5 className="card-title">Organiza tus noticias</h5>
                        <p className="card-text">Description of feature 3.</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
    
            <section className="text-black py-5 ms-5 me-5 p-auto rounded-4 gradient-bg-landing">
                <div className="container">
                <h2 className="text-center">Sobre nosotros</h2>
                <p className="lead text-center">Information about our website.</p>
                </div>
            </section>
    
            <footer className="text-black text-center py-4 footer gradient-bg-landing">
                <div className="container">
                <p>&copy; 2024 Our Website. All rights reserved.</p>
                </div>
            </footer>
            </div>
      </div>
    )
}

export default Landing;