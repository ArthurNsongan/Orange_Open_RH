import { faBars, faHandHolding, faLaptopMedical, faMapMarker, faTable, faTimes, faUser, faUsers, faUsersCog, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import config from '../../../config/config'
import { defaultUserRoles, getRoles, hasRole, IsConnected } from '../../../services/Auth'
import ConnectedUser from '../ConnectedUser'
let route = require('../../../utils/route.json');

const activeItem = "Admin_SideBar_Active"

const OpenNavIcon = ({toggleMobile}) => {
    return (
        <button className="btn" onClick={toggleMobile}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </button>
    )
}

const CloseNavIcon = ({toggleMobile}) => (
    <button className="btn text-white" onClick={toggleMobile}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M6 18L18 6M6 6L18 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </button>
)

export function NavBar() {

    const openNav = () => {
        let block = window.$("#responsiveSidebar")
        block.addClass("Admin__SideBar__Visible")
    }

    
    return (
        <div className="d-flex justify-content-between align-items-center Admin__NavBar">
            <div className="Admin__SideBar__Toggler col-6">
                <OpenNavIcon toggleMobile={openNav} />
            </div>
            <div className="col d-flex justify-content-end">
                <ConnectedUser />
            </div>
        </div>
    );
}

export function SideBar(props) {

    const location = useLocation()

    const closeNav = () => {
        let block = window.$("#responsiveSidebar")
        block.removeClass("Admin__SideBar__Visible")
    }

    useEffect(() => {
        closeNav();
    }, [location])

    return ( 
        <div className="Admin__SideBar" id="responsiveSidebar" >
            <div className="Admin__SideBar__Toggler d-flex justify-content-end text-white">
                <CloseNavIcon toggleMobile={closeNav} />
            </div>
            <NavLink to={route.front.home.link}>
                <h5 className="fw-bold px-3 mb-5" style={{"color": "inherit"}}>{config.app.name}</h5>
            </NavLink>
            <ul className="Admin__SideBar__List ps-0">
                <li>
                    <NavLink to={route.admin.dashboard.link} activeClassName={activeItem}>
                        <span className="ps-4 pe-3 NavIcon"><FontAwesomeIcon icon={faTable} /></span>
                        {route.admin.dashboard.title}
                    </NavLink>
                </li>
                {
                    ( hasRole(defaultUserRoles.ADMIN_ROLE) && IsConnected() && getRoles() !== undefined ) ?
                    <>
                        <li>
                            <NavLink to={route.admin.users.link} activeClassName={activeItem}>
                                <span className="ps-4 pe-3 NavIcon"><FontAwesomeIcon icon={faUser} /></span>
                                {route.admin.users.title}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={route.admin.communautes.link} activeClassName={activeItem}>
                                <span className="ps-4 pe-3 NavIcon"><FontAwesomeIcon icon={faUsers} /></span>
                                {route.admin.communautes.title}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={route.admin.projets.link} activeClassName={activeItem}>
                                <span className="ps-4 pe-3 NavIcon"><FontAwesomeIcon icon={faLaptopMedical} /></span>
                                {route.admin.projets.title}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={route.admin.partenaires.link} activeClassName={activeItem}>
                                <span className="ps-4 pe-3 NavIcon"><FontAwesomeIcon icon={faHandHolding} /></span>
                                {route.admin.partenaires.title}
                            </NavLink>
                        </li>
                    </> 
                     : <></>
                }
                {
                    ( hasRole(defaultUserRoles.SUPERVISOR_ROLE) && !hasRole(defaultUserRoles.ADMIN_ROLE) && IsConnected() && getRoles() !== undefined) ?
                    <>
                        <li>
                            <NavLink exact to={route.supervisor.link} activeClassName={activeItem}>
                                <span className="ps-4 pe-3 NavIcon"><FontAwesomeIcon icon={faUsersCog} /></span>
                                {"Mon Association"}
                            </NavLink>
                        </li>
                    </> : <></>
                }
            </ul>
        </div>
    );
}

// export default Header
