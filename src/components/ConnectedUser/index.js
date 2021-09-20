import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { NavLink, Link, useHistory } from 'react-router-dom'
import { userLogout } from '../../services/API'
import { defaultUserRoles, hasRole } from '../../services/Auth'
import { getConnectedUser, IsConnected } from '../../services/Auth'

let route = require("../../utils/route.json")

function ConnectedUser() {

    const history = useHistory()

    useEffect(() => {

    },[ history.location])
    return (
        <>
            {console.log(IsConnected())}
            {
                !IsConnected() ? (
                    <div className="accountSection">
                        <NavLink to={`${route.auth.login.link}`}>
                            <button className="btn rounded-none btn-primary">Se connecter</button>
                        </NavLink>
                    </div>) :
                    <div className="accountSection">
                        <button className="dropdown-toggle p-0 btn d-flex align-items-center outline-none hidden-arrow"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            id="connected_user_action"
                        >
                            <div className="rounded-circle bg-primary-2 text-uppercase d-flex align-items-center justify-content-center text-white h5 mb-0" style={{ width: '40px', height: '40px'}}>
                                { getConnectedUser().name[0] }
                            </div>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-center" aria-labelledby="connected_user_action">
                            <li className="dropdown-item bg-white h5 mb-0">Bonjour, <span className="text-capitalize text-primary">{ getConnectedUser().name }</span></li>
                            <hr className="my-2"/>
                            <li>
                                <Link className="dropdown-item" to={`${route.auth.profile.link}`}>Votre profil</Link>
                            </li>
                            { ( (hasRole(defaultUserRoles.ADMIN_ROLE) || hasRole(defaultUserRoles.SUPERVISOR_ROLE) ) && IsConnected() )  && (
                                <li>
                                    <Link className="dropdown-item" to={`${"/admin"}`}>Administration</Link>
                                </li>)
                            }
                            <li>
                                <button className="btn dropdown-item" title="Déconnexion" onClick={() => { userLogout((response) => { history.push(route.auth.login.link) }) }}><FontAwesomeIcon icon={faSignOutAlt} /> Déconnexion</button>                            
                            </li>
                        </ul>
                        {/* <NavLink to={`${route.auth.profile.link}`}>
                        <button className="btn rounded-none btn-primary">Bonjour <span className="text-capitalize">{ getConnectedUser().name }</span></button>
                    </NavLink>
                    <button className="btn rounded-none btn-secondary-2" title="Déconnexion" onClick={() => { userLogout((response) => { history.push(route.auth.login.link) }) }}><FontAwesomeIcon icon={faSignOutAlt} /></button> */}
                    </div>
            }
        </>
    )
}

export default ConnectedUser
