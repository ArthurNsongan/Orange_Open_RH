import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory, useParams } from 'react-router'
import Button from '../../../../components/Button'
import { getUser, getRoles, AllAssociations, UpdateUser, getRoleByUser, AddRole, RemoveRole } from '../../../../services/API';
import Select from 'react-select';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { formatUserRoles } from '../../../../config/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCircleNotch, faDotCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { defaultUserRoles } from '../../../../services/Auth';

const _ = require("lodash")

function EditUser(props) {

    const history = useHistory()

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

    const [removeSent, setRemoveSent] = useState(false)

    const [roles, setRoles] = useState([])

    const [userRole, setUserRole] = useState([])

    const [userRoleRemovalId, setUserRoleRemovalId] = useState(null)

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

        console.warn("Initialization")

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
            let rolesTmp = roles
            item.classList.remove("is-invalid")
            if(item.value.length === 0 && !inputListNames.includes(item.name) && !item.classList.contains("ck-hidden")
                &&  ( rolesTmp.filter(item => item.id === user.role_id).length === 1 && item.name === "association_id") &&
                !item.id.includes("react-select") && ( item.tagName === "INPUT" ) )
            {
                item.classList.add("is-invalid");
                console.log(item)
                isValid = false;
            }
            if(firstInvalidItem === null) { firstInvalidItem = item}
            console.log("verify form")
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
            console.log("verify form 2")
            return false;
        }

        UpdateUser(user, (res) => {
            console.log(res.data)
            console.log("Update User", user, roles)
            if(user.role_id != null && roles.filter(item => item.id == user.role_id).length === 1) {
                userRole.forEach( item => {
                    console.log("Delete old roles")
                    RemoveRole(user.id, item.id, (res) => console.log(res.data), (exception) => { if(exception.response) { console.log(exception.response) } } )
                })
        
                AddRole(user.id, user.role_id, user.association_id, (res) => console.log(res.data), (exception) => { if(exception.response) { console.log(exception.response) } } )    
            
                toast.success(<div className="d-flex align-items-center fs-6">Utilisateur modifié avec succès </div>, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })

                history.goBack()
            }
        },
        (exception) => { if(exception.response) { console.log(exception.response) } })
    }

    const handleAssocChange = (selectItem) => {
        const { value } = selectItem
        let userTmp = user
        userTmp["association_id"] = value
    }

    const removeCurrentRole = () => {
        // RemoveRole(user.id, userRole[userRoleRemovalId].id, (res) => { 
        //     console.log(res.data)
            toast.success(<div className="d-flex align-items-center fs-6">Le rôle de de l'utilisateur a été supprimée avec succès. </div>, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
            })
            alert(userRoleRemovalId)
            let userRoleTmp = userRole
            console.log(userRole)
            userRoleTmp.splice(userRoleRemovalId, 1)
            setUserRole(userRoleTmp)
            setRemoveSent(false)
        // }, (exception) => { if(exception.response) { console.log(exception.response) } } )
    }

    const resetPasswordAuto = () => {
        alert("Un nouveau mot de passe vous a été réattribué ! Récupérez dans votre boîte mail !!")
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

                    <div className="row flex-column mt-3">
                        <div className="col-lg-6 mb-1">
                            <label className="d-block mb-2">Rôle de l'utilisateur</label>

                            { userRole.length > 1 ? <span>{"Rôles actuels"}</span> : <span>{"Rôle actuel"}</span> }
                            <div className="d-flex actual_roles">
                                { userRole.map( (item, index) => ( 
                                    <span className="text-uppercase my-2 alert py-1 d-flex align-items-center fw-bold bg-primary"><FontAwesomeIcon icon={faCircle} className="me-1"/>{
                                        formatUserRoles(item.name)
                                    }<button type="button" className="btn ps-3" onClick={()=>{ setUserRoleRemovalId(index) }} data-bs-target="#validateRoleRemoval" data-bs-toggle="modal"><FontAwesomeIcon icon={faTimes} className="me-1 fs-4" /></button></span> ) ) }
                            </div>
                            <select className="form-select" onChange={handleAddNewTextInputChange} id="Role" 
                                aria-describedby="RoleFeedback" name="role_id" 
                            >
                                { user.role_id == null && (<option value="">-- Sélectionnez le rôle</option>) }
                                { roles.map( (item, index) => {
                                    return(
                                        <option value={item.id} selected={item.name === user.role_id}>{formatUserRoles(item.name)}</option>
                                    )
                                })}
                            </select>
                            <div class="invalid-feedback" id="RoleFeedback"></div>
                        </div>
                    </div>
                    { roles.find(item => item.id == user.role_id)?.name !== defaultUserRoles.ADMIN_ROLE &&
                        <div className="row flex-column mb-3">
                        <div className="col-lg-6 mb-1">
                            <label className="d-block mb-1">Association</label>
                            <Select name="association_id" onChange={handleAssocChange} options={
                                    lightAssociations.map((item) =>
                                    ({
                                        label: item.name,
                                        value: item.id
                                    }))
                                } placeholder="Sélectionnez l'association correspondante"/>
                            <div class="invalid-feedback" id="RoleFeedback"></div>
                        </div>
                    </div> }

                    <div className="row flex-column my-3">
                        <p>Vous avez également attribuer un mot de passe automatique à un utilisateur</p>
                         <div className="col-lg-6 mb-3">
                            <Button className="btn-primary m-2 d-flex align-items-center" onClick={resetPasswordAuto} disabled={sent}
                                > {sent && (<LoadingSpinner />)} Réattribuer un mot de passe</Button>
                        </div>
                        {/*<div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Saisissez A Nouveau</label>
                            <input className="form-control" onChange={handleAddNewTextInputChange} id="Password_Confirm" 
                                aria-describedby="PasswordFeedback" type="password" name="password_confirmation" 
                                value={user.password_confirmation} placeholder="Confirmation de Mot de Passe" />
                            <div class="invalid-feedback" id="PasswordFeedback"></div>
                        </div>*/}
                    </div> 

                    <div className="d-flex my-2">
                        <button type="button" className="btn btn-light m-2">Fermer</button>
                        <Button type="submit" disabled={sent} className="btn-primary m-2 d-flex align-items-center"
                            > {sent && (<LoadingSpinner />) } Enregistrer</Button>
                    </div>
                </form>
                <div className="modal fade rounded-none" id="validateRoleRemoval" tabIndex="-1" aria-labelledby="" aria-hidden="true">
                    <div className="modal-dialog rounded-none modal-lg modal-dialog-centered">                
                        <div className="modal-content">
                            <div className="modal-body">
                                <div class="row justify-content-center">
                                    <div className="col-lg-12">
                                            <h2 className="text-center fw-bold">Suppression de rôle attribué à un utilisateur</h2>
                                            <h5 className="text-center py-2">Voulez-vous continuer ?</h5>
                                    </div>
                                </div>
                                <div className="modal-footer d-flex justify-content-center">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Non</button>
                                    <button type="button" className="btn btn-OM d-flex align-items-center" data-bs-dismiss="modal" disabled={removeSent}
                                        onClick={removeCurrentRole}> { removeSent && <LoadingSpinner /> }Oui </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                   
            </div>
        </div>
    )
}

export default EditUser
