function validarLogin(correo){
    const reEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    
    if(!reEmail.test(correo)){
        document.getElementById("errEmail").style.display = "block";
    }else{
        document.getElementById("errEmail").style.display = "none";
    }
    return reEmail.test(correo)
}

export default validarLogin