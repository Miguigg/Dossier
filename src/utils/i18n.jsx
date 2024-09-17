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
            },
        },
    }
})

export default i18n;