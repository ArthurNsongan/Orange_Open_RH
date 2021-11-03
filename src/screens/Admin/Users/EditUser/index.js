import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory, useParams } from 'react-router'
import Button from '../../../../components/Button'
import { getUser, getRoles, AllAssociations, UpdateUser, getRoleByUser, AddRole, RemoveRole, AddMember } from '../../../../services/API';
import Select from 'react-select';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { checkEmail, checkPhoneNumber, formatUserRoles } from '../../../../config/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCircleNotch, faDotCircle, faTimes, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { checkAuth, defaultUserRoles } from '../../../../services/Auth';

let route = require('../../../../utils/route.json')

const _ = require("lodash")

function EditUser(props) {

    const history = useHistory()

    const { user_id } = useParams();

    const [user, setUser] = useState({
        name: "",
        firstname: "",
        OmAccountNumber: "",
        email: "",
    })

    const initialErrors = {
        name: [],
        firstname: [],
        email: [],
        OmAccountNumber: [],
        address: [],
        region: [],
        sex: [],
        role_id: [],
    }

    const [userErrors, setUserErrors] = useState(initialErrors)

    const [lightAssociations, setLightAssociations] = useState([{ id: 1, name: "Association des Femmes Vaillantes"}])

    const [sent, setSent] = useState(false)

    const [removeSent, setRemoveSent] = useState(false)

    const [roles, setRoles] = useState([])

    const [userRole, setUserRole] = useState([])

    const [userRoleRemovalId, setUserRoleRemovalId] = useState(null)

    const handleAddNewTextInputChange = (e) => {
        let { name, value } = e.target
        let userTmp = { ...user }
        if(name === "role_id" && roles.find(item => item.id == user.role_id)?.name === defaultUserRoles.ADMIN_ROLE) {
            userTmp.association_id = null;
        }
        userTmp[name] = value
        setUser(userTmp)
        console.log(userTmp)
    }

    const handleSubmitEditUserForm = (e) => {
        e.preventDefault()

        checkAuth()

        let inputListNames = ["role_id", "association_id"]
        let firstInvalidItem = null
        let userErrorsTmp = initialErrors
        let isValid = true
        let form = e.target
        Array.from(form.elements === undefined ? [] : form.elements).forEach( item => {
            item.classList.remove("is-invalid")
            let itemIsValid = true
            const isNonValidated = () => {
                console.log(item)
                isValid = false;
                itemIsValid = false;
            }
            if(!inputListNames.includes(item.name) && !item.id.includes("react-select") && ( item.tagName === "INPUT" || item.tagName === "SELECT" ) )
            {
                userErrorsTmp[item.name] = []
                if(item.value.length === 0) {
                    isNonValidated()
                    userErrorsTmp[item.name].push("Le champ est requis.")
                } else if(item.name.includes("email") && !checkEmail(item.value) ) {
                    isNonValidated()
                    userErrorsTmp[item.name].push("E-mail invalide.")
                } else if(item.name.includes("OmAccountNumber") && !checkPhoneNumber(item.value) ) {
                    isNonValidated()
                    userErrorsTmp[item.name].push("Le numéro de téléphone n'est pas valide.")
                } 
                /* else if(item.name === "password") {
                    if(!checkPasswordStrong(user.password)) {
                        userErrorsTmp[item.name].push("Mot de passe pas assez fort !")
                    }
                } */
                if(itemIsValid === false) {
                    item.classList.add("is-invalid")
                }
            }
            if(firstInvalidItem === null) { firstInvalidItem = item}
        })
        if(user.role_id != null && roles.find(item => item.id == user.role_id)?.name !== defaultUserRoles.ADMIN_ROLE && user.association_id == null) {
            userErrorsTmp["role_id"].push("Définir une association")
            form.querySelector('[name="role_id"]').classList.add("is-invalid");
            isValid = false;
        }
        console.log("UserAfterCheck", userErrorsTmp)
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
            setSent(false)
            setUserErrors({...userErrorsTmp})
            return false;
        }

        UpdateUser(user, (res) => {
            checkAuth()
            console.log(res.data)
            console.log("Update User", user, roles)
            if(user.role_id != null && roles.filter(item => item.id == user.role_id).length === 1) {
                userRole.forEach( item => {
                    console.log("Delete old roles")
                    checkAuth()
                    RemoveRole(user.id, item.id, userRole[0].association_id, (res) => console.log(res.data), (exception) => { if(exception.response) { console.log(exception.response) } } )
                })
        
/*                 AddRole(user.id, user.role_id, user.association_id, (res) => console.log(res.data), (exception) => { if(exception.response) { console.log(exception.response) } } )    
 */            
                if(roles.find(item => (item.name === defaultUserRoles.MEMBER_ROLE)).id == user.role_id ) {
                    alert(user.role_id)
                    AddMember(user.id, user.association_id, '0000', (response) => {
                        console.log(response.data)  
                    }, (exception) => {
                        console.log(exception?.response)
                    })
                } else {
                    AddRole(user.id, user.role_id, user.association_id, (response) => {
                        console.log(response.data)
                    }, (exception) => {
                        console.log(exception?.response)
                    })
                }
                toast.success(<div className="d-flex align-items-center fs-6">Utilisateur modifié avec succès </div>, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })

            } else {
                toast.success(<div className="d-flex align-items-center fs-6">{ res.data?.message || "Utilisateur modifié avec succès "}</div>, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
            
            history.push(route.admin.users.link)
        },
        (exception) => { if(exception.response) { console.log(exception.response); setSent(false) } })
    }

    const handleAssocChange = (selectItem) => {
        const { value } = selectItem
        let userTmp = user
        userTmp["association_id"] = value
    }

    const removeCurrentRole = () => {
        alert(JSON.stringify(userRole[userRoleRemovalId].pivot.association_id))
        RemoveRole(user.id, userRole[userRoleRemovalId].id, userRole[userRoleRemovalId].pivot.association_id , (res) => { 
            console.log(res.data)
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
            console.log("UserRoleToDelete", JSON.stringify(userRole))
            userRoleTmp.splice(userRoleRemovalId, 1)
            console.log("UserRoleDeleted",  JSON.stringify(userRoleTmp)) 
            setUserRole(userRoleTmp)
            setRemoveSent(false)
        }, (exception) => { if(exception.response) { console.log(exception.response) } } )
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
                            <div class="invalid-feedback" id="userNameFeedback">
                                {userErrors.name.map(item => (
                                    <><span className="fw-bold d-flex">{item}</span><br/></>
                                ))}
                            </div>                        
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Prénom</label>
                            <input className="form-control" onChange={handleAddNewTextInputChange} id="userFirstname" 
                                aria-describedby="userFirstnameFeedback" type="text" name="firstname" 
                                value={user.firstname} placeholder="Prénom de l'Utilisateur"  />
                            <div class="invalid-feedback" id="userFirstnameFeedback">
                                {userErrors.firstname.map(item => (
                                    <><span className="fw-bold d-flex">{item}</span></>
                                ))}
                            </div>                        
                        </div>
                    </div>
                    <div className="row flex-column my-3">
                        <div className="col-lg-8 mb-3">
                            <label className="d-block mb-2">E-mail</label>
                            <input className="form-control" onChange={handleAddNewTextInputChange} id="Email" 
                                aria-describedby="EmailFeedback" type="email" name="email" 
                                value={user.email} placeholder="E-mail de l'utilisateur"  />
                            <div class="invalid-feedback" id="EmailFeedback">
                                {userErrors.email.map(item => (
                                    <><span className="fw-bold d-flex">{item}</span><br/></>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-8 mb-3">
                            <label className="d-block mb-2">Numéro de Téléphone</label>
                            <input className="form-control" onChange={handleAddNewTextInputChange} id="OMAccountNumber" 
                                aria-describedby="OMAccountNumberFeedback" type="text" name="OmAccountNumber" 
                                value={user.OmAccountNumber} placeholder="Numéro de Téléphone"  />
                            <div class="invalid-feedback" id="userFirstnameFeedback">
                                {userErrors.OmAccountNumber.map(item => (
                                    <><span className="fw-bold d-flex">{item}</span><br/></>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="row flex-column mt-3">
                        <div className="col-lg-6 mb-1">
                            <label className="d-block mb-2">Rôle de l'utilisateur</label>
                            {console.log(userRole)}
                            { userRole.length > 1 ? <span>{"Rôles actuels"}</span> : ( userRole.length == 0 && <span>{"Rôle actuel"}</span>) }
                            <div className="d-flex actual_roles">
                                { _.isEqual({}, userRole) ? "Aucun Rôle attribué à cet utilisateur !" : userRole.map( (item, index) => ( 
                                    <span className="text-uppercase my-2 alert py-1 d-flex align-items-center fw-bold bg-supporting-blue"><FontAwesomeIcon icon={faUserSecret} className="me-1"/>{
                                        formatUserRoles(item.name)
                                    }<button type="button" className="btn ps-3" onClick={()=>{ setUserRoleRemovalId(index) }} data-bs-target="#validateRoleRemoval" data-bs-toggle="modal"><FontAwesomeIcon icon={faTimes} className="me-1 fs-4" /></button></span> ) ) }
                            </div>
                            <select className="form-select" onChange={handleAddNewTextInputChange} id="Role" 
                                aria-describedby="RoleFeedback" name="role_id" 
                            >
                                { user.role_id == null && (<option value="">-- Sélectionnez le rôle</option>) }
                                { roles.map( (item, index) => {
                                    return(
                                        <option value={item.id}>{formatUserRoles(item.name)}</option>
                                    )
                                })}
                            </select>
                            <div class="invalid-feedback" id="RoleFeedback">
                                {userErrors.role_id.map(item => (
                                    <><span className="fw-bold d-flex">{item}</span><br/></>
                                ))}
                            </div> 
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
