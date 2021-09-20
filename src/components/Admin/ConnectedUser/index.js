import { faDoorOpen, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { NavLink, Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { userLogout } from '../../../services/API'
import { getConnectedUser, IsConnected } from '../../../services/Auth'

let route = require("../../../utils/route.json");

function ConnectedUser() {

    const history = useHistory()
    return (
        <>
            { console.log(IsConnected())}
            {
                IsConnected() && 
                <div className="accountSection d-flex fs-6 m-0 fw-bold">
                    <button className="dropdown-toggle p-0 btn d-flex align-items-center outline-none hidden-arrow"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        id="connected_user_action"
                    >
                        <div className="rounded-circle bg-primary-2 text-uppercase d-flex align-items-center justify-content-center text-white h5 mb-0" style={{ width: '40px', height: '40px'}}>
                            { getConnectedUser()?.name[0] }
                        </div>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-center" aria-labelledby="connected_user_action">
                        <li className="dropdown-item bg-white h5 mb-0">Bonjour, <span className="text-capitalize text-primary">{ getConnectedUser().name }</span></li>
                        <hr className="my-2"/>
                        <li>
                            <button className="btn dropdown-item" title="Déconnexion" onClick={() => { userLogout((response) => { history.push(route.auth.login.link) }) }}><FontAwesomeIcon icon={faSignOutAlt} /> Déconnexion</button>                            
                        </li>
                    </ul>
                    {/* <div className="d-flex align-items-center">Bonjour, <span className="text-capitalize ms-2">{ getConnectedUser().name }</span></div>
                    <button className="btn ms-2 rounded-none" title="Déconnexion" onClick={() => { userLogout(() => { history.push(route.auth.login.link) }) }}><FontAwesomeIcon icon={faSignOutAlt} className="faddfa-2x" /></button> */}
                </div> 
            }
        </>
    )
}

export default ConnectedUser
