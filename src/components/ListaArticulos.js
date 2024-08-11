function ListaArticulos(){
    return(
        <div className="container my-5">
        <h1 className="mb-4">Lista de articulos</h1>
        <a href="/add-articulo" className="btn btn-success" role="button">Añadir articulo a etiqueta</a>
        <div className="list-group p-3">
            <a href="#article1" className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Article Title 1</h5>
                    <small>3 days ago</small>
                </div>
                <p className="mb-1">Brief description of Article 1. This is a short summary to give readers an idea of what the article is about.</p>

                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                    <a href="/editar-articulo" role="button" className="btn btn-success">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                    </svg>
                    </a>
                    <a href="/eliminar-articulo" role="button" className="btn btn-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-x" viewBox="0 0 16 16">
                            <path d="M6.854 7.146a.5.5 0 1 0-.708.708L7.293 9l-1.147 1.146a.5.5 0 0 0 .708.708L8 9.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 9l1.147-1.146a.5.5 0 0 0-.708-.708L8 8.293z"/>
                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                        </svg>
                    </a>
                </div>
            </a>
        </div>
    </div>
    );
}

export default ListaArticulos;