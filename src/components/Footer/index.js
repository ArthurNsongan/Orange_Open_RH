//Modules Intégrés
import React, { useState, useEffect } from 'react';

//Modules externes
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/'
import { faPhone, faEnvelope, faMapMarker } from '@fortawesome/free-solid-svg-icons'

//Modules internes
import './styles.css'

let route = require('../../utils/route.json')


function Footer(props) {

    const FooterLink = (props) => (
        <NavLink to={props.url} className="text-decoration-none pb-3">{props.title}</NavLink>
    )

    const FooterItem = (props) => (
        <div className="d-flex mb-3 text-white align-items-center">
            <FontAwesomeIcon icon={props.icon} />
            <span className="ms-3 d-block" style={{ "color": "inherit"}}>{props.content}</span>
        </div>
    )

    const SepStyle = {
        "width": "100%",
        "height": "1px",
        "backgroundColor": "lightgray",
        "opacity": "0.5"
    }

    const Separator = (props) => (
        <div style={SepStyle} className="my-5"></div>
    )

    //FooterLink : Composant utilisé pour les liens dans les colonnes du footer

    return (
        <footer className="bg-dark pt-5 text-white">
            <div className="container py-5 mt-5">
                <div className="row justify-content-start">
                    <div className="col-lg-3">
                        <h5 className="text-white mb-5">Challenge <span style={{"color":"#98c013"}}>Solidarité</span></h5>
                        <div className="d-flex flex-column">
                            <FooterItem icon={faMapMarker} content="Douala, Cameroun" />
                            <FooterItem icon={faPhone} content="+237 6 99 94 45 93" />
                            <FooterItem icon={faEnvelope} content="hope@challengesolidarite.com" />
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <h5 className="text-white text-uppercase mb-5 d-block">Menu</h5>
                        <div className="d-flex flex-column">
                            <FooterLink url={route.front.home.link} title={route.front.home.title}/>
                            <FooterLink url={route.front.communautes.link} title={route.front.communautes.title}/>
                            <FooterLink url={route.front.projets.link} title={route.front.projets.title}/>
                            {/* <FooterLink url="/a-propos-de-nous" title="A Propos de Nous"/> */}
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <h5 className="text-white text-uppercase mb-5 d-block">FAQ</h5>
                        <div className="d-flex flex-column">
                            <FooterLink url="#" title="Confidentialité"/>
                            <FooterLink url="#" title="Foire Aux Questions"/>
                        </div>                    
                    </div>
                    <div className="col-lg-3">
                        <h5 className="text-white text-uppercase mb-5 d-block">A Propos de nous</h5>
                        <div className="d-flex flex-column">
                            <FooterLink url="#" title="A Propos de Nous"/>
                            {/* <FooterLink url="/associations-et-corporations" title="Associations et Corporations"/> */}
                            {/* <FooterLink url="/projets" title="Projets"/> */}
                            {/* <FooterLink url="/a-propos-de-nous" title="A Propos de Nous"/> */}
                        </div>                    
                    </div>
                </div>
                <Separator />
                <div className="row justify-content-between">
                    <div className="col-lg-6 text-white d-flex align-items-center">
                        Challenge Solidarité - Tous droits réservés. <span className="ms-2" style={{ "fontSize": "20px"}}>&copy;</span>
                    </div>
                    <div className="col-lg-6 text-white d-flex align-items-center justify-content-end">
                        Challenge Solidarité - Tous droits réservés. <span className="ms-2" style={{ "fontSize": "20px"}}>&copy;</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;