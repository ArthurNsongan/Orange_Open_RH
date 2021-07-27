import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import $ from "jquery"
import './styles.css';

let route = require('../../utils/route.json')


function Header(props) {

    const [isBlock, setIsBlock] = useState(false)

    const OpenNavIcon = () => {
        return (
            <svg onClick={toggleMobile} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="#4A5568" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        )
    }

    const CloseNavIcon = () => (
        <svg onClick={toggleMobile} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 18L18 6M6 6L18 18" stroke="#4A5568" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )

    const toggleMobile = (e) => {
        let block = window.$("#mobileMenu")
        let isBlock = block.hasClass("d-none")
        console.log(isBlock)
        block.toggleClass("d-none")
        setIsBlock(isBlock);
    }

    const ToggleMobileMenu = () => {
        return ( isBlock ?
        <CloseNavIcon /> : <OpenNavIcon /> )
    }

    const NavBarList = (props) => {
        return(
            <ul className="menuNav">
                <li><NavLink exact to={`${route.front.home.link}`}activeClassName="active">{`${route.front.home.title}`}</NavLink></li>
                <li><NavLink to={`${route.front.communautes.link}`} activeClassName="active">{`${route.front.communautes.title}`}</NavLink></li>
                <li><NavLink to={`${route.front.projets.link}`} activeClassName="active">{`${route.front.projets.title}`}</NavLink></li>
                <li><NavLink exact to={`${route.front.propos.link}`} activeClassName="active">{`${route.front.propos.title}`}</NavLink></li>
            </ul>
        )
    }
    return (
        <>
            <nav className="menuNavBar">
                <div className="mobileNavActions">
                    <ToggleMobileMenu />
                </div>
                <div className="menuBrand">
                    <a href="/">
                        <img alt="Challenge Solidarité" src="https://www.challengesolidarite.com/CS/img/logob.png" className="brand" />
                    </a>
                </div>
                <div className="menuNavBarItems">
                    <NavBarList />
                </div>
                <div className="accountSection">
                    <button className="btn rounded-none btn-primary">Se connecter</button>
                </div>
            </nav>
            <nav className="mobileMenuNavBar d-none" id="mobileMenu">
                <NavBarList />
                <div className="accountSection">
                    <button className="btn rounded-none btn-primary">Se connecter</button>
                </div>
            </nav>
        </>
    );
}

export default Header;