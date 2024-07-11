function TestIntegridad(){
    
    const signIn = (e) => {}

    return(
        <div class="container my-5">
            <h1 class="mb-4">Test de Integridad</h1>
            <form>
                <div className="container">
                <section className="text-black py-5 ms-5 me-5 p-auto rounded-4 gradient-bg-landing">
                    <div className="container">
                        <form onSubmit={signIn}>
                            <h2 className="text-center text-color p-5">Introduce aquí el enlace</h2>
                            <input type="text" className="form-control" id="enlace" />
                            <div className="p-5">
                                <button type="submit" class="btn btn-success btn-lg">Inspeccionar articulo</button>
                            </div>
                        </form>
                    </div>
                </section>
                </div>
            </form>
        </div>  
    );
}

export default TestIntegridad;