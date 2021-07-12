import React from 'react';
import "./style.css";
import * as Utils from "../../utils";
import { Constant } from "../../config/Constant";
import { useTranslation } from "react-i18next";

let route = require('../../utils/route');



export default function Footer(props) {
    const {t} = useTranslation();

    return (
        <footer role="contentinfo" className="footer-no-bg o-footer">
            <div id="footer">
                <div className="o-footer-bottom">
                    <div className="container-fluid">
                        <div className="row justify-content-between mb-0">
                            <ul className="nav">
                                <li className="nav-item"><a href={ Constant.applicationRh.taleo.url } className="nav-link"><span>{ Constant.applicationRh.taleo.title }</span></a></li>
                                <li className="nav-item"><a href={ Constant.applicationRh.myInfos.url } className="nav-link"><span>{ Constant.applicationRh.myInfos.title }</span></a></li>
                                <li className="nav-item"><a href={ Constant.applicationRh.e_learning.url } className="nav-link"><span>{ Constant.applicationRh.e_learning.title }</span></a></li>
                                <li className="nav-item"><a href={ Constant.applicationRh.livretAcueil.url } className="nav-link"><span>{ Constant.applicationRh.livretAcueil.title }</span></a></li>
                                <li className="nav-item"><a href={ Constant.applicationRh.fusion.url } className="nav-link"><span>{ Constant.applicationRh.fusion.title }</span></a></li>
                            </ul>
                            <ul className="nav">
                                <li className="nav-item"><a href={`${route.faq.root}`} className="nav-link"><span>{t('faq.title')}</span></a></li>
                                <li className="nav-item d-flex justify-content-start" ><a href={`${route.contact.link}`} className="nav-link"><span>Contact</span></a></li>
                                {/* <li className="nav-item d-flex justify-content-start"><a href="#" className="nav-link"><span>{t('common.help')}</span></a></li> */}
                                <li className="nav-item last" ><a href={`${route.glossary.root}`} className="nav-link"><span>{t('glossary.title')}</span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
