import NoticiasLista from "../components/NoticiaLista";

function UltimasNoticias(){
    return(
        <div>
            <h2>Noticias destacadas<hr className="border border-primary border-3 opacity-75"></hr></h2>
            <div className="container"><NoticiasLista/></div>

        </div>
    );
}

export default UltimasNoticias;