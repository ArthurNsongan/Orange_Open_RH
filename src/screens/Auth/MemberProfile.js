import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { getAssociation, getUserMe } from '../../services/API'
import { getConnectedUser, getRoles, defaultUserRoles } from '../../services/Auth'

function MemberProfile(props) {

    const connectedUser = getConnectedUser()

    const history = useHistory();

    var association_id

    try {
        association_id = getRoles().find( item => item.name === defaultUserRoles.MEMBER_ROLE ).association_id;
    } catch(exception) {
        history.push("/")
    }

    const [association, setAssociation] = useState({  })

    useEffect(() => {
        getUserMe((response) => {
            console.log(response)
        }, (exception) => {
            if(exception.response) { console.log(exception.response) }
            else if(exception.request) { console.log(exception.request) }
            else { console.log(exception.message) }
        })


        getAssociation(association_id, (response) => {
            setAssociation(response.data)
        }, (exception) => {
            if(exception.response) {
                console.log(exception.response)
            }
        })
        
    }, [props])

    return (
        <section className="relative pt-5 mt-2 bg-white min-vh-100">
            <div className="container-fluid pt-4 pb-2 mb-3 bg-dark">
                <h2 className="text-primary fw-bold ls-1 text-center">Profil Utilisateur</h2>
            </div>
            <div className="container">
                <div className="row Edit_Profile">
                    <h2>Bienvenue, <b className="text-primary">{connectedUser.name}</b></h2>
                    <p className="fs-4">Sur cette page, vous avez accès aux informations sur la plateforme Challenge Solidarité</p>
                </div>
            </div>
            <div className="container py-4">
                <div className="Association py-4 px-3 mb-2 bg-white shadows">
                    <h3 className="fw-bold">Vos Associations</h3>
                    <div className="">
                        <img src="" alt=""/>
                    </div>
                </div>
                <div className="Contributions py-4 px-3 bg-white shadows my-2">
                    <h3 className="fw-bold">Vos Contributions</h3>
                    <div className="">
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MemberProfile
