function validarArticulo(nombre, enlace, etiquetaSeleccionada){
    const reNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/

    if(!reNombre.test(nombre)){
        document.getElementById("errNombre").style.display = "block";
    }else{
        document.getElementById("errNombre").style.display = "none";
    }

    const reEnlace = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/

    if(!reEnlace.test(enlace)){
        document.getElementById("errEnlace").style.display = "block";
    }else{
        document.getElementById("errEnlace").style.display = "none";
    }

    if(etiquetaSeleccionada === "0" || etiquetaSeleccionada===""){
        document.getElementById("errSelect").style.display = "block";
    }else{
        document.getElementById("errSelect").style.display = "none";
    }
    return reNombre.test(nombre) && reEnlace.test(enlace) && etiquetaSeleccionada !== "0" && etiquetaSeleccionada !== ""
}

export default validarArticulo;