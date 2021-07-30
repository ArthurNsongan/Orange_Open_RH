import { faHandHolding, faLaptopMedical, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { NavLink } from 'react-router-dom'
import config from '../../../config/config'
let route = require('../../../utils/route.json');

const activeItem = {
    "backgroundColor": "#ffffff1f",
}

export function NavBar() {
    return (
        <div className="d-flex flex-column justify-content-center align-self-center Admin__NavBar">
        </div>
    )
}

export function SideBar(props) {

    return ( 
        <div className="Admin__SideBar">
            <h5 className="fw-bold px-3 mb-5" style={{"color": "inherit"}}>{config.app.name}</h5>
            <ul className="Admin__SideBar__List ps-0">
                <li>
                    <NavLink to={route.admin.users.link} activeStyle={activeItem}>
                        <span className="ps-4 pe-3 NavIcon"><FontAwesomeIcon icon={faUser} /></span>
                        {route.admin.users.title}
                    </NavLink>
                </li>
                <li>
                    <NavLink to={route.admin.communautes.link} activeStyle={activeItem}>
                        <span className="ps-4 pe-3 NavIcon"><FontAwesomeIcon icon={faUsers} /></span>
                        {route.admin.communautes.title}
                    </NavLink>
                </li>
                <li>
                    <NavLink to={route.admin.projets.link} activeStyle={activeItem}>
                        <span className="ps-4 pe-3 NavIcon"><FontAwesomeIcon icon={faLaptopMedical} /></span>
                        {route.admin.projets.title}
                    </NavLink>
                </li>
                <li>
                    <NavLink to={route.admin.partenaires.link} activeStyle={activeItem}>
                        <span className="ps-4 pe-3 NavIcon"><FontAwesomeIcon icon={faHandHolding} /></span>
                        {route.admin.partenaires.title}
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

// export default Header
