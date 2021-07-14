import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';

let route = require('../../utils/route.json')


function Header(props) {
    return (
        <nav className="menuNavBar">
            <div className="menuBrand">
                <a href="/">
                    <img alt="Challenge Solidarité" src="https://www.challengesolidarite.com/CS/img/logob.png" className="brand" />
                </a>
            </div>
            <ul className="menuNav">
                <li><NavLink exact to={`${route.front.home.link}`}activeClassName="active">{`${route.front.home.title}`}</NavLink></li>
                <li><NavLink to={`${route.front.communautes.link}`} activeClassName="active">{`${route.front.communautes.title}`}</NavLink></li>
                <li><NavLink to={`${route.front.projets.link}`} activeClassName="active">{`${route.front.projets.title}`}</NavLink></li>
                <li><NavLink to={`${route.front.propos.link}`} activeClassName="active">{`${route.front.propos.title}`}</NavLink></li>
            </ul>
            <div className="accountSection">
                <button className="btn rounded-none btn-primary">Se connecter</button>
            </div>
        </nav>
    );
}

export default Header;