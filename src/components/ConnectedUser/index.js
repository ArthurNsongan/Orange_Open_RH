import { faDoorOpen, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { userLogout } from '../../services/API'
import { getConnectedUser, IsConnected } from '../../services/Auth'

let route = require("../../utils/route.json")

function ConnectedUser() {

    const history = useHistory()
    return (
        <>
            { console.log(IsConnected())}
            {
            !IsConnected() ? (
                <div className="accountSection">
                    <NavLink to={`${route.auth.login.link}`}>
                        <button className="btn rounded-none btn-primary">Se connecter</button>
                    </NavLink>
                </div>) :
                <div className="accountSection">
                    <NavLink to={`${route.front.home.link}`}>
                        <button className="btn rounded-none btn-primary">Bonjour <span className="text-capitalize">{ getConnectedUser().name }</span></button>
                        <button className="btn rounded-none btn-secondary-2" onClick={() => { userLogout(() => { history.push(route.auth.login.link) }) }}><FontAwesomeIcon icon={faSignOutAlt} /></button>
                    </NavLink>
                </div> 
            }
        </>
    )
}

export default ConnectedUser
