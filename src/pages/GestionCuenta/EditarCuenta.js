import { useState } from "react";

function EditarCuenta(){

    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');

    const editarCuenta = (e) => {}

    return(
        <div className="container">
            <div className="login-container gradient-bg-landing">
                <h2 className="text-center text-color">Editar cuenta</h2>
                <form onSubmit={editarCuenta}>
                    <div>
                        <div className="mb-3 mt-2">
                            <label className="form-label text-color">Nombre</label>
                            <input className="form-control" id="nombre" placeholder="Nombre" value={nombre} onChange={(e)=> setNombre(e.target.value)} />
                        </div>
                        <div className="mb-3 mt-2">
                            <label className="form-label text-color">Apellidos</label>
                            <input className="form-control" id="apellidos" placeholder="Apellidos" value={apellidos} onChange={(e)=> setApellidos(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label mt-2 text-color">Dirección de correo</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter your email" value={correo} onChange={(e)=> setCorreo(e.target.value)}/>
                        </div>
                        <button type="button" class="btn btn-success w-100 mt-3">Editar usuario</button>
                        <a href="/home" class="btn btn-danger w-100 mt-3" role="button">Cancelar</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditarCuenta;