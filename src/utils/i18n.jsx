import i18n from "i18next";
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    debug: true,
    fallbackLng: "en",
    resources:{
        en: {
            translation: {
                welcome: "Welcome to Dossier",
                caracteristicas: "features",
                derechos:"2024 Our Website. All rights reserved.",
                guarda_desc:"Store your news in one place to find and read it more easily",
                guarda:"Save your news",
                vericidad:"Test its veracity",
                vericidad_desc:"Check that the news is real. Be suspicious and look for sources if our system warns you that it may not be.",
                organiza:"Organize your press",
                organiza_desc:"Create labels and organize the news you save into them",
                nosotros:"About us",
                about:"Project developed for the Master's Thesis in Computer Engineering (MEI)",
                //Login
                email:"Email address",
                emailErr:"*You must enter a valid email 'miguel@gmail.com'",
                contraseña:"Password",
                contraseñaErr:"*The password or email does not match any account",
                sesionErr:"Session has expired",
                errInterno:"*We are having problems on the server, please try again later",
                usuarioDesc:"*Unknown user",
                intentosErr:"*Too many requests, please try again later",
                recConstra:"Recover password",
                confirmarCorreo:"You must confirm the email in the message we just sent",
                //Nav
                registro:"Register",
                noticias:"Latest news",
                cerrar_sesion:"Log out",
                mi_cuenta:"My Account",
                mis_etq:"My Tags",
                test_int:"Integrity test"
            },
        },
        es: {
            translation: {
                welcome: "Bienvenida/o a Dossier",
                caracteristicas: "Características",
                derechos:"2024 Derechos reservados",
                guarda_desc:"Almacena tus noticias en un solo lugar para encontrarlas y leerlas más fácilmente",
                guarda:"Guarda tus noticias",
                vericidad:"Testea su veracidad",
                vericidad_desc:"Comprueba que las noticias sean reales. Sospecha y busca fuentes si nuestro sistema te avisa de que puede no serlo",
                organiza:"Organiza tu prensa",
                organiza_desc:"Crea etiquetas y organiza en ellas las noticias que guardes",
                nosotros:"Sobre nosotros",
                about:"Proyecto desarrollado para el TFM del máster en Ingeniería informática (MEI)",
                //Login
                email:"Dirección de correo",
                emailErr:"*Debes introducir un email válido 'miguel@gmail.com'",
                contraseña:"Contraseña",
                contraseñaErr:" *La contraseña o el email no coinciden con el de ninguna cuenta",
                sesionErr:"La sesión ha expirado",
                errInterno:"*Tenemos problemas en el servidor, inténtalo más tarde",
                usuarioDesc:"*Usuario desconocido",
                intentosErr:"*Demasiadas peticiones, inténtalo más tarde",
                recConstra:"Recuperar contraseña",
                confirmarCorreo:"Debes confirmar el correo electrónico en el mensaje que acabamos de enviar",
                //Nav
                registro:"Registro",
                noticias:"Últimas noticias",
                cerrar_sesion:"Cerrar sesión",
                mi_cuenta:"Mi Cuenta",
                mis_etq:"Mis Etiquetas",
                test_int:"Test de integridad"
            },
        },
    }
})

export default i18n;