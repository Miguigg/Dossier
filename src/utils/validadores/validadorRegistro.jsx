function validaRegistro(nombre, apellidos, email, passwd, repPasswd){

    const reNombre = /^[a-zA-Z]+$/
    
    if(!reNombre.test(nombre)){
        document.getElementById("errNombreFormato").style.display = "block";
    }else{
        document.getElementById("errNombreFormato").style.display = "none";
    }
    const reApellidos = /^[A-ZÁÉÍÓÚÑa-záéíóúñ]+(?:[ '-][A-ZÁÉÍÓÚÑa-záéíóúñ]+)*$/
    
    if(!reApellidos.test(apellidos)){
        document.getElementById("errApellidos").style.display = "block";
    }else{
        document.getElementById("errApellidos").style.display = "none";
    }
    const reEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    
    if(!reEmail.test(email)){
        document.getElementById("errEmail").style.display = "block";
    }else{
        document.getElementById("errEmail").style.display = "none";
    }
    
    const rePasswd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/

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
    return reNombre.test(nombre) && reEmail.test(email) && reApellidos.test(apellidos) && equalPass && rePasswd.test(passwd)
}

export default validaRegistro