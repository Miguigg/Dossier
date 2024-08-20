function validarArticulo(nombre, enlace, etiquetaSeleccionada, descripcion){
    const reNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9,. ]+$/

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

    var reDescripcion = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9,. ]+$/;
    console.log(descripcion)
    if(!reDescripcion.test(descripcion)){
        document.getElementById("errDescripcion").style.display = "block";
    }else{
        document.getElementById("errDescripcion").style.display = "none";
    }
    return reNombre.test(nombre) && reEnlace.test(enlace) && etiquetaSeleccionada !== "0" && etiquetaSeleccionada !== "" && reDescripcion.test(descripcion)
}

export default validarArticulo;