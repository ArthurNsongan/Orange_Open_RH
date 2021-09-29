import React, {useState, useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {Language} from "../../lang/Language";

export default function LanguageSwitcher() {
    const [t, i18n] = useTranslation();
    const [lang, setLang] = useState(localStorage.getItem("i18nextLng"));

    useEffect(() => {
        changeLanguage(lang);
    }, [lang]);

    const changeLanguage = (language) => {

        switch (language) {
            case Language.EN: {
                //setLang(Language.EN);
                i18n.changeLanguage(Language.EN);
                window.TranslatePage(language);
                break;
            }
            case Language.FR: {
                i18n.changeLanguage(Language.FR);
                window.TranslatePage(Language.FR);
                break;
            }
            default: {
                //setLang(Language.FR);
                i18n.changeLanguage(Language.FR);
                window.TranslatePage(Language.FR);
                break;
            }
        }

    }

    return (
        <li className="nav-item dropdown skiptranslate">
            {/*            <button type="button"
                    className="nav-link btn btn-link btn-inverse dropdown-toggle d-flex align-items-center"
                    data-toggle="dropdown">
                <span className="icon-international-globe h4 mb-0 mr-1" aria-hidden="true"></span>
                <span>{t("common.language")}</span>
            </button>*/}
            <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" role="button"
               aria-haspopup="true" aria-expanded="false">{lang.toUpperCase()}</a>
            <ul className="dropdown-menu dropdown-menu-right">
                <li>
                    <a className="dropdown-item" href="#" onClick={() => {
                        setLang(Language.FR);
                        //changeLanguage(Language.FR);
                    }} lang="fr"
                       hrefLang="fr">Français</a>
                </li>
                <li>
                    <a className="dropdown-item" href="#" onClick={() => {
                        setLang(Language.EN);
                        //changeLanguage(Language.EN);
                    }}
                       aria-current="page">English</a>
                </li>
            </ul>
        </li>
    )
}
