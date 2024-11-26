import '../css/login.css'
import 'bootstrap/dist/css/bootstrap.css';
import '../css/landing.css'
import "../utils/i18n"
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function Landing(){
    const {t, i18n} = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(navigator.language)
    }, [])

    return(
        <div className="App mt-2 container-react">
            <div>
            <header className="gradient-bg-landing text-white text-center py-5 ms-3 me-3 rounded-4">
                <div className="container">
                <h1 className='text-black'>{t("welcome")}</h1>
                </div>
            </header>
    
            <section id="features" className="py-5">
                <div className="container">
                <h2 className="text-center">{t("caracteristicas")}</h2>
                <div className="row mt-4">
                    <div className="col-md-4">
                    <div className="card text-black">
                        <div className="card-body gradient-bg-landing">
                        <h5 className="card-title">{t("guarda")}</h5>
                        <p className="card-text">{t("guarda_desc")}</p>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-4">
                    <div className="card text-black">
                        <div className="card-body gradient-bg-landing">
                        <h5 className="card-title">{t("vericidad")}</h5>
                        <p className="card-text">{t("vericidad_desc")}</p>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-4">
                    <div className="card text-black gradient-bg-landing">
                        <div className="card-body gradient-bg-landing">
                        <h5 className="card-title">{t("organiza")}</h5>
                        <p className="card-text">{t("organiza_desc")}</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
    
            <section className="text-black py-5 ms-5 me-5 p-auto rounded-4 gradient-bg-landing">
                <div className="container">
                <h2 className="text-center">{t("nosotros")}</h2>
                <p className="lead text-center">{t("about")}</p>
                </div>
            </section>
    
            <footer className="text-black text-center py-4 footer gradient-bg-landing">
                <div className="container">
                <p>&copy; {t("derechos")}</p>
                </div>
            </footer>
            </div>
      </div>
    )
}

export default Landing;