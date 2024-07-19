function validarArticulo(nombre, descripcion){
    const reNombre = /^[a-zA-Z]+$/

    if(!reNombre.test(nombre)){
        document.getElementById("errNombre").style.display = "block";
    }else{
        document.getElementById("errNombre").style.display = "none";
    }

    var reDescripcion = /^[a-zA-Z0-9]+$/;

    if(!reDescripcion.test(descripcion)){
        document.getElementById("errDescripcion").style.display = "block";
    }else{
        document.getElementById("errDescripcion").style.display = "none";
    }


    var selectElement = document.getElementById('selectEtc');
    var selectedValue = selectElement.value;
    if(selectedValue === "0"){
        document.getElementById("errSelect").style.display = "block";
    }else{
        document.getElementById("errSelect").style.display = "none";
    }
    return reNombre.test(nombre) && reDescripcion.test(descripcion) && selectedValue !== "0"
}

export default validarArticulo;