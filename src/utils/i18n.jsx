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
                about:"Proyecto desarrollado para el TFM del máster en Ingeniería informática (MEIs)"
            },
        },
    }
})

export default i18n;