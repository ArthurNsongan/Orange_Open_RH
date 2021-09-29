import React from 'react';
import "./style.css";
import * as Utils from "../../utils";
import { Constant } from "../../config/Constant";
import { useTranslation } from "react-i18next";
import {NavLink, withRouter, useParams} from "react-router-dom";
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
                                <li className="nav-item"><a target="_blank" rel="noreferrer" href={ Constant.applicationRh.taleo.url } className="nav-link skiptranslate"><span>{ Constant.applicationRh.taleo.title }</span></a></li>
                                <li className="nav-item"><a target="_blank" rel="noreferrer" href={ Constant.applicationRh.myInfos.url } className="nav-link skiptranslate"><span>{ Constant.applicationRh.myInfos.title }</span></a></li>
                                <li className="nav-item"><a target="_blank" rel="noreferrer" href={ Constant.applicationRh.e_learning.url } className="nav-link skiptranslate"><span>{ Constant.applicationRh.e_learning.title }</span></a></li>
                                <li className="nav-item"><a target="_blank" rel="noreferrer" href={ Constant.applicationRh.livretAcueil.url } className="nav-link skiptranslate"><span>{ Constant.applicationRh.livretAcueil.title }</span></a></li>
                                <li className="nav-item"><a target="_blank" rel="noreferrer" href={ Constant.applicationRh.fusion.url } className="nav-link skiptranslate"><span>{ Constant.applicationRh.fusion.title }</span></a></li>
                            </ul>
                            <ul className="nav">
                                <li className="nav-item"><NavLink to={`${route.faq.root}`} className="nav-link skiptranslate"><span>{t('faq.title')}</span></NavLink></li>
                                <li className="nav-item d-flex justify-content-start" ><NavLink to={`${route.contact.link}`} className="nav-link skiptranslate"><span>Contact</span></NavLink></li>
                                {/* <li className="nav-item d-flex justify-content-start"><a href="#" className="nav-link skiptranslate"><span>{t('common.help')}</span></a></li> */}
                                <li className="nav-item last" ><NavLink to={`${route.glossary.root}`} className="nav-link skiptranslate"><span>{t('glossary.title')}</span></NavLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
