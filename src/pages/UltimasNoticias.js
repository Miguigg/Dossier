import NoticiasLista from "../components/NoticiaLista";

function UltimasNoticias(){
    return(
        <div>
            <h2>Mis accesos directos<hr className="border border-primary border-3 opacity-75"></hr></h2>
            <div className="container"><NoticiasLista/></div>

        </div>
    );
}

export default UltimasNoticias;