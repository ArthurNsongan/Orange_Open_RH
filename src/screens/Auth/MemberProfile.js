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
        <section className="relative mt-5 pt-5 bg-dark min-vh-100">
            <div className="container">
                <div className="row Edit_Profile">
                    <h2>Bienvenue, <b>{connectedUser.name}</b></h2>
                </div>
            </div>
            <div className="container py-4">
                <div className="Association py-4 px-3 mb-2 bg-white shadow-sm">
                    <h3>Votre Association</h3>
                    <div className="">
                        <img src="" alt=""/>
                        <h4>Ordre des Ingénieurs + {association_id}</h4>
                    </div>
                </div>
                <div className="Contributions py-4 px-3 bg-white shadow-sm my-2">
                    <h3>Vos Contributions</h3>
                    <div className="">
                        <h4>Ordre des Ingénieurs</h4>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MemberProfile
