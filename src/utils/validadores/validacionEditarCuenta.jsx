function validarEditarCuenta(nombre,apellidos,passwd,repPasswd){
    //acepta vacio porque si no lleva nada, no hay cambios
    const reNombre = /^[a-zA-Z]*$/
    
    if(!reNombre.test(nombre)){
        document.getElementById("errNombreFormato").style.display = "block";
    }else{
        document.getElementById("errNombreFormato").style.display = "none";
    }
    const reApellidos = /^(?:[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?:[-' ][a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*|)$/
    
    if(!reApellidos.test(apellidos)){
        document.getElementById("errApellidos").style.display = "block";
    }else{
        document.getElementById("errApellidos").style.display = "none";
    }
    
    const rePasswd = /^(?:(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}|)$/

    let equalPass = false; 
    if(passwd === repPasswd){
        document.getElementById("errPassIgual").style.display = "none";
        if(!rePasswd.test(passwd)){
            document.getElementById("errFormatPass").style.display = "block";
        }else{
            document.getElementById("errFormatPass").style.display = "none";
        }
        equalPass = true;
    }else{
        document.getElementById("errPassIgual").style.display = "block";
        equalPass = false;
    }
    return reNombre.test(nombre) && reApellidos.test(apellidos) && equalPass && rePasswd.test(passwd)
}

export default validarEditarCuenta;