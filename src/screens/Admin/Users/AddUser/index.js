import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Button from '../../../../components/Button'
import { getRoles, AllAssociations, CreateUser, AddMember, AddRole } from '../../../../services/API';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { defaultUserRoles } from '../../../../services/Auth';
import { checkEmail, checkPasswordStrong, checkPhoneNumber, formatUserRoles } from '../../../../config/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const route = require("../../../../utils/route.json")

function AddUser(props) {

    const history = useHistory();

    const [user, setUser] = useState({
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

    // const [loaded, setLoaded] = useState(true)

    const [sent, setSent] = useState(false)

    const [userErrors, setUserErrors] = useState(initialErrors)

    const [lightAssociations, setLightAssociations] = useState([{ id: 1, name: "Association des Femmes Vaillantes"}])

    const [roles, setRoles] = useState([])

    const handleAddNewTextInputChange = (e) => {
        let { name, value } = e.target
        let userTmp = {...user}
        if(name === "role_id" && roles.find(item => item.id == user.role_id)?.name === defaultUserRoles.ADMIN_ROLE) {
            userTmp.association_id = null;
        }
        userTmp[name] = value
        setUser(userTmp)
        console.log(userTmp)
    }

    const handleSubmitNewUserForm = (e) => {
        e.preventDefault()

        setSent(true)
        
        let inputListNames = []
        let firstInvalidItem = null
        let userErrorsTmp = userErrors
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
        if(roles.find(item => item.id == user.role_id)?.name !== defaultUserRoles.ADMIN_ROLE && user.association_id == null) {
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

        CreateUser(user, 
            (response) => {
                console.log("AddUser Admin : ",response.data)
                if(roles.find(item => item.name === defaultUserRoles.MEMBER_ROLE).id == user.role_id ) {
                    AddMember(response.data.id, user.association_id, '0000', (response) => {

                    }, (exception) => {
                        console.log(exception?.response)
                    })
                } else {
                    AddRole(response.data.id, user.role_id, user.association_id, (response) => {
                        
                    }, (exception) => {
                        console.log(exception?.response)
                    })
                }
                toast.success(
                    <div className="d-flex align-items-center fs-6">
                        Utilisateur créé avec succès !
                    </div>, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                history.push(route.admin.users.link)
            },
            (exception) => {
                var errors = exception?.response?.data?.errors
                if(errors) {
                    setSent(false)
                    setUserErrors({...initialErrors, ...exception.response.data.errors})
                    Object.keys(errors).forEach(item => {
                        form.querySelector(`[name="${item}"]`).classList.add("is-invalid");
                    })
                    toast.error(
                        <div className="d-flex align-items-center fs-6">
                            Erreur rencontrée au niveau des champs surlignés !!!
                            <br/>
                            {Object.values(errors).length} erreur(s) rencontrée(s)
                        </div>, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                }
            })


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

    }, [props])

    const handleAssocChange = (selectItem) => {
        const { value } = selectItem
        let userTmp = { ...user }
        userTmp["association_id"] = value
        setUser(userTmp)
    }

    const validatePasswordFields = () => {
        return (user.password === user.password_confirmation && checkPasswordStrong(user.password) && user.password_confirmation.length > 1)
    }

    return (
        <div className="d-flex flex-column">
            <Helmet title={"Ajouter un nouvel utilisateur - Utilisateurs"} />
            <h4 className="fw-bold mb-4">Ajouter un Utilisateur</h4>
            <div className="row bg-white shadow-sm px-2 py-4 mb-3 mx-0 min-vh-100">
                <form onSubmit={handleSubmitNewUserForm}>
                    <div className="row my-3">
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Nom</label>
                            <input className="form-control" onChange={handleAddNewTextInputChange} id="userName" 
                                aria-describedby="userNameFeedback" type="text" name="name" 
                                value={user.name} placeholder="Nom de l'Utilisateur" />
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
                        </div>
                    </div> }

                    {/* <div className="row flex-column my-3">
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Mot de Passe</label>
                            <input className={"form-control " + ( !validatePasswordFields() && "is-invalid ")} onChange={handleAddNewTextInputChange} id="Password" 
                                aria-describedby="PasswordFeedback" type="password" name="password" 
                                value={user.password} placeholder="Mot de Passe"  />
                            <div class="invalid-feedback" id="PasswordFeedback">
                                { !validatePasswordFields() && (
                                    <span className="fw-bold d-flex">Vos mots de passe ne correspondent pas.</span>
                                ) }
                                {userErrors.password.map(item => (
                                    <><span className="fw-bold d-flex">{item}</span><br/></>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Saisissez A Nouveau</label>
                            <input className="form-control" onChange={handleAddNewTextInputChange} id="Password" 
                                aria-describedby="PasswordFeedback" type="password" name="password_confirmation" 
                                value={user.password_confirmation} placeholder="Confirmation de Mot de Passe"  />
                        </div>
                    </div> */}

                    <div className="row my-2">
                        <div className="float-start">
                            <Button type="button" className="btn-secondary m-2">Fermer</Button>
                            <Button type="submit" className="btn-primary m-2" 
                                disabled={ sent }
                                > { sent && (<LoadingSpinner />) }Enregistrer</Button>
                        </div>
                    </div>
                </form>                   
            </div>
        </div>
    )
}

export default AddUser
