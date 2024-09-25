import NoticiasLista from "../components/NoticiaLista";
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function UltimasNoticias(){

    const {t, i18n} = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(navigator.language)
    }, [])

    return(
        <div>
            <h2>{t("ultimas_noticias")}<hr className="border border-primary border-3 opacity-75"></hr></h2>
            <div className="container"><NoticiasLista/></div>

        </div>
    );
}

export default UltimasNoticias;