import i18n from "i18next";
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    debug: true,
    fallbackLng: "en",
    resources:{
        en: {
            translation: {
                welcome: "Welcome to Dossier"
            },
        },
        es: {
            translation: {
                welcome: "Bienvenida/o a Dossier"
            },
        },
    }
})

export default i18n;