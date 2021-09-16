import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router'
import Button from '../../../../components/Button'
import { getUser, getRoles, AllAssociations, UpdateUser, getRoleByUser, AddRole, RemoveRole } from '../../../../services/API';
import Select from 'react-select';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../../components/LoadingSpinner';

const _ = require("lodash")

function EditUser(props) {

    const { user_id } = useParams();

    const [user, setUser] = useState({
        name: "",
        firstname: "",
        OmAccountNumber: "",
        password: "",
        password_confirmation: "",
        email: "",
    })

    const [lightAssociations, setLightAssociations] = useState([{ id: 1, name: "Association des Femmes Vaillantes"}])

    const [loaded, setLoaded] = useState(true)

    const [sent, setSent] = useState(false)

    const [roles, setRoles] = useState([])

    const [userRole, setUserRole] = useState([])

    const [userNewRole, setUserNewRole] = useState([])

    const handleAddNewTextInputChange = (e) => {
        let { name, value } = e.target
        let userTmp = { ...user }
        userTmp[name] = value
        setUser(userTmp)
        console.log(userTmp)
    }

    const handleSubmitEditUserForm = (e) => {
        e.preventDefault()

        let inputListNames = ["password", "password_confirmation"]
        let firstInvalidItem = null
        let isValid = true
        let form = e.target
        if(user.password !== user.password_confirmation && user.password.length > 0) {
            toast.error(<div className="d-flex align-items-center fs-6">Mot(s) de passe incorrects !!!</div>, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            return false;
        }
        Array.from(form.elements === undefined ? [] : form.elements).forEach( item => {
            item.classList.remove("is-invalid")
            if(item.value.length === 0 && !inputListNames.includes(item.name) && !item.classList.contains("ck-hidden") && ( item.tagName === "INPUT" || item.tagName === "SELECT" ) )
            {
                item.classList.add("is-invalid");
                console.log(item)
                isValid = false;
            }
            if(firstInvalidItem === null) { firstInvalidItem = item}
        })
        if(isValid === false || form === null) {
            window.scrollTo(0, firstInvalidItem.getBoundingClientRect().top + 200)
            toast.error(<div className="d-flex align-items-center fs-6">Erreur rencontrée au niveau des champs surlignés !!!</div>, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
            })
            return false;
        }


        UpdateUser(user, (res) => {
            console.log(res.data)
            userRole.forEach( item => {
                RemoveRole(user.id, item.id, (res) => console.log(res.data), (exception) => { if(exception.response) { console.log(exception.response) } } )
            })
    
            AddRole(user.id, user.role_id, user.association_id, (res) => console.log(res.data), (exception) => { if(exception.response) { console.log(exception.response) } } )
    
        },
        (exception) => { if(exception.response) { console.log(exception.response) } })
    }

    const handleAssocChange = (selectItem) => {
        const { value } = selectItem
        let userTmp = user
        userTmp["association_id"] = value
    }

    const removeCurrentRole = (item) => {
        RemoveRole(user.id, item.id, (res) => console.log(res.data), (exception) => { if(exception.response) { console.log(exception.response) } } )
    }

    useEffect(() => {

        getRoles( (response) => {
            setRoles(response.data)
        }, (exception) => {
            if(exception.response) {
                console.log(exception.response)
            }        
        })

        AllAssociations((response) => { setLightAssociations(response.data.data)},
        (exception) => {
            if(exception.response) {
                console.log(exception.response)
            }
        })

        getUser(user_id,
            (response) => {
                let userData = {...user, ...response.data }
                setUser(userData)
                getRoleByUser(userData.id, (res) => { setUserRole(res.data) })
            },
            (exception) => {
            if(exception.response) {
                console.log(exception.response)
            }
        })

    }, [props])

    return (
        <div className="d-flex flex-column">
            <Helmet title={"Editer un utilisateur - Utilisateurs"} />
            <h4 className="fw-bold mb-4">Editer un Utilisateur</h4>
            <div className="row bg-white shadow-sm px-2 py-4 mb-3 mx-0 min-vh-100">
                <form onSubmit={handleSubmitEditUserForm}>
                    <div className="row my-3">
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Nom</label>
                            <input className="form-control" onChange={handleAddNewTextInputChange} id="userName" 
                                aria-describedby="userNameFeedback" type="text" name="name" 
                                value={user.name} placeholder="Nom de l'Utilisateur"  />
                            <div class="invalid-feedback" id="userNameFeedback"></div>
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Prénom</label>
                            <input className="form-control" onChange={handleAddNewTextInputChange} id="userFirstname" 
                                aria-describedby="userFirstnameFeedback" type="text" name="firstname" 
                                value={user.firstname} placeholder="Prénom de l'Utilisateur"  />
                            <div class="invalid-feedback" id="userFirstnameFeedback"></div>
                        </div>
                    </div>
                    <div className="row flex-column my-3">
                        <div className="col-lg-8 mb-3">
                            <label className="d-block mb-2">E-mail</label>
                            <input className="form-control" onChange={handleAddNewTextInputChange} id="Email" 
                                aria-describedby="EmailFeedback" type="email" name="email" 
                                value={user.email} placeholder="E-mail de l'utilisateur"  />
                            <div class="invalid-feedback" id="EmailFeedback"></div>
                        </div>
                        <div className="col-lg-8 mb-3">
                            <label className="d-block mb-2">Numéro de Téléphone</label>
                            <input className="form-control" onChange={handleAddNewTextInputChange} id="OMAccountNumber" 
                                aria-describedby="OMAccountNumberFeedback" type="text" name="OmAccountNumber" 
                                value={user.OmAccountNumber} placeholder="Numéro de Téléphone"  />
                            <div class="invalid-feedback" id="userFirstnameFeedback"></div>
                        </div>
                    </div>

                    <div className="row flex-column my-3">
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Rôle</label>
                            <select className="form-select" onChange={handleAddNewTextInputChange} id="Role" 
                                aria-describedby="RoleFeedback" name="role_id" 
                            >
                                <option value="">-- Sélectionnez le rôle</option>
                                { roles.map( (item, index) => {
                                    return(
                                        <option value={item.id} selected={item.name === user.role_id}>{_.upperCase(item.name)}</option>
                                    )
                                })}
                            </select>
                            <div class="invalid-feedback" id="RoleFeedback"></div>
                            { userRole.length > 1 ? <span>{"Rôles actuels"}</span> : <span>{"Rôle actuel"}</span> }
                            <div className="d-flex actual_roles">
                                { userRole.map( (item) => ( <span className="text-uppercase my-2 alert py-1 fw-bold alert-success">{item.name}</span> ) ) }
                            </div>
                        </div>
                    </div>

                    <div className="row flex-column my-3">
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Association</label>
                            {/* <select className="form-select" onChange={handleAddNewTextInputChange} id="Role" 
                                aria-describedby="RoleFeedback" name="role_id" 
                            >
                                <option value="">-- Séléctionnez le rôle</option>
                                { roles.map( (item, index) => {
                                    return(
                                        <option value={item.id} selected={item.name === user.role_id}>{_.upperCase(item.name)}</option>
                                    )
                                })}
                            </select> */}
                            <Select name="association_id" onChange={handleAssocChange} options={
                                    lightAssociations.map((item) =>
                                    ({
                                        label: item.name,
                                        value: item.id
                                    }))
                                } placeholder="Sélectionnez l'association correspondante"/>
                            <div class="invalid-feedback" id="RoleFeedback"></div>
                        </div>
                    </div>

                    <div className="row flex-column my-3">
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Nouveau Mot de Passe</label>
                            <input className="form-control" onChange={handleAddNewTextInputChange} id="Password" 
                                aria-describedby="PasswordFeedback" type="password" name="password" 
                                value={user.password} placeholder="Mot de Passe"/>
                            <div class="invalid-feedback" id="PasswordFeedback"></div>
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Saisissez A Nouveau</label>
                            <input className="form-control" onChange={handleAddNewTextInputChange} id="Password_Confirm" 
                                aria-describedby="PasswordFeedback" type="password" name="password_confirmation" 
                                value={user.password_confirmation} placeholder="Confirmation de Mot de Passe" />
                            <div class="invalid-feedback" id="PasswordFeedback"></div>
                        </div>
                    </div>

                    <div className="row my-2">
                        <div className="float-start">
                            <Button type="button" className="btn-secondary m-2">Fermer</Button>
                            <Button type="submit" disabled={sent} className="btn-primary m-2 d-flex align-items-center"
                                > {sent && (<LoadingSpinner />) } Enregistrer</Button>
                        </div>
                    </div>
                </form>                   
            </div>
        </div>
    )
}

export default EditUser
