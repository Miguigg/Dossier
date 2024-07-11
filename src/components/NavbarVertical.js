import '../css/landing.css'


function VerticalNav() {
    return(
        <div className='p-5'>
            <h2>Mis Etiquetas<hr className="border border-primary border-3 opacity-75"></hr></h2>
            <p>Etiqueta seleccionada: ****</p>
            <nav className="navbar">
                <div class="container-fluid gradient-bg-landing">
                    <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/home">Etiqueta</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/home">Etiqueta</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/home">Etiqueta</a>
                    </li>
                    <li className=''>
                        <a href="/crear-etiqueta" class="btn btn-success" role="button">Crear etiqueta</a>
                    </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default VerticalNav;