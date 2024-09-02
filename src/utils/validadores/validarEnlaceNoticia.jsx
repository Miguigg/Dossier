function validarEnlaceNoticia(enlace){
    const reEnlace = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/

    if(!reEnlace.test(enlace)){
        document.getElementById("errEnlace").style.display = "block";
    }else{
        document.getElementById("errEnlace").style.display = "none";
    }
    return reEnlace.test(enlace);
}

export default validarEnlaceNoticia