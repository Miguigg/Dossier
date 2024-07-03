import '../css/CuentaUsr.css'
import '../css/comun.css'

function MisEtiquetas(){
    return(
        <table>
            <thead>
                <tr>
                    <th scope="col" className='text-color'>Nombre Etiqueta</th>
                    <th scope="col" className='text-color'>Opciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><button type="button" class="btn custom-btn">Etiqueta ejemplo</button>
                    </td>
                    <td><button type="button" class="btn btn-danger">X</button></td>
                </tr>
                <tr>
                    <td><button type="button" class="btn custom-btn">Etiqueta ejemplo</button></td>
                    <td><button type="button" class="btn btn-danger">X</button></td>
                </tr>
                <tr>
                    <td><button type="button" class="btn custom-btn">Etiqueta ejemplo</button></td>
                    <td><button type="button" class="btn btn-danger">X</button></td>
                </tr>
            </tbody>
        </table>
    );
}

export default MisEtiquetas;