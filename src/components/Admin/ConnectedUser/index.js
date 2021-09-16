import { faDoorOpen, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
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
                    <div className="d-flex align-items-center">Bonjour, <span className="text-capitalize ms-2">{ getConnectedUser().name }</span></div>
                    <button className="btn ms-2 rounded-none" title="Déconnexion" onClick={() => { userLogout(() => { history.push(route.auth.login.link) }) }}><FontAwesomeIcon icon={faSignOutAlt} className="faddfa-2x" /></button>
                </div> 
            }
        </>
    )
}

export default ConnectedUser
