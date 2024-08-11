import '../css/landing.css'


function VerticalNav() {
    return(
        <div className='p-5'>
            <h2>Mis Etiquetas<hr className="border border-primary border-3 opacity-75"></hr></h2>
            <p>Etiqueta seleccionada: ****</p>
            <nav className="navbar">
                <div className="container-fluid gradient-bg-landing">
                    <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/home">Etiqueta</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/home">Etiqueta</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/home">Etiqueta</a>
                    </li>
                    <li className=''>
                        <a href="/crear-etiqueta" className="btn btn-success" role="button">Crear etiqueta</a>
                    </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default VerticalNav;