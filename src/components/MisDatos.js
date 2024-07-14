function MisDatos(){
    return(
        <div>
            <div className="mb-3 mt-2">
                <label className="form-label text-color">Nombre</label>
                <input className="form-control" id="nombre" placeholder="Nombre" disabled/>
            </div>
            <div className="mb-3 mt-2">
                <label className="form-label text-color">Apellidos</label>
                <input className="form-control" id="nombre" placeholder="Nombre" disabled/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label mt-2 text-color">Dirección de correo</label>
                <input type="email" className="form-control" id="email" placeholder="Enter your email" disabled/>
            </div>
            <a href="/editar-cuenta" class="btn btn-success w-100 mt-3" role="button">Editar usuario</a>
            <a href="/eliminar-cuenta" class="btn btn-danger w-100 mt-3" role="button">Eliminar cuenta</a>

        </div>
    );
}

export default MisDatos;