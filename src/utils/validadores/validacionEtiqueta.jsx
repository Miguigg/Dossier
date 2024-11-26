function validacionEtiqueta(nombre, descripcion){
    const reNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]+$/
    
    if(!reNombre.test(nombre)){
        document.getElementById("errNombreFormato").style.display = "block";
    }else{
        document.getElementById("errNombreFormato").style.display = "none";
    }

    var reDescripcion =  /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9,. ]*$/

    if(!reDescripcion.test(descripcion)){
        document.getElementById("errDescripcion").style.display = "block";
    }else{
        document.getElementById("errDescripcion").style.display = "none";
    }
    return reNombre.test(nombre) && reDescripcion.test(descripcion)
}

export default validacionEtiqueta