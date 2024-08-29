function validarAccesoDirecto(nombre, enlace){
    const reNombre = /^[\p{L}\p{Zs}ñÑáéíóúÁÉÍÓÚüÜ:]+$/

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
    return reNombre.test(nombre) && reEnlace.test(enlace)
}
export default validarAccesoDirecto;