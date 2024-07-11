import '../css/CuentaUsr.css'
import '../css/comun.css'
function ListaFavs(){
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th scope="col" className='text-color'>Nombre medio</th>
                        <th scope="col" className='text-color'>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><button type="button" class="btn btn-info">El Pais</button>
                        </td>
                        <td><button type="button" class="btn btn-danger">X</button></td>
                    </tr>
                    <tr>
                        <td><button type="button" class="btn btn-info">El Mundo</button></td>
                        <td><button type="button" class="btn btn-danger">X</button></td>
                    </tr>
                    <tr>
                        <td><button type="button" class="btn btn-info">elDiario.es</button></td>
                        <td><button type="button" class="btn btn-danger">X</button></td>
                    </tr>
                </tbody>
        </table>
        <button type="button" class="btn btn-success">Añadir acceso directo</button>
    </div>
    );
}

export default ListaFavs;