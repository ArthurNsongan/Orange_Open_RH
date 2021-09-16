import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Button from '../../../../components/Button'
import { getRoles, AllAssociations, CreateUser } from '../../../../services/API';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import LoadingSpinner from '../../../../components/LoadingSpinner';

const route = require("../../../../utils/route.json")

function AddUser(props) {

    const history = useHistory();

    const [user, setUser] = useState({
        password: "",
        password_confirmation: "",
    })

    // const [loaded, setLoaded] = useState(true)

    const [sent, setSent] = useState(false)


    const [lightAssociations, setLightAssociations] = useState([{ id: 1, name: "Association des Femmes Vaillantes"}])

    const [roles, setRoles] = useState([])

    const handleAddNewTextInputChange = (e) => {
        let { name, value } = e.target
        let userTmp = {...user}
        userTmp[name] = value
        setUser(userTmp)
        console.log(userTmp)
    }

    const handleSubmitNewUserForm = (e) => {
        e.preventDefault()

        setSent(true)
        
        let inputListNames = []
        let firstInvalidItem = null
        let isValid = true
        let form = e.target
        Array.from(form.elements === undefined ? [] : form.elements).forEach( item => {
            item.classList.remove("is-invalid")
            if(item.value.length === 0 && !inputListNames.includes(item.name) && !item.id.includes("react-select") && ( item.tagName === "INPUT" || item.tagName === "SELECT" ) )
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
            setSent(false)
            return false;
        }

        CreateUser(user, 
            (response) => {
                console.log("AddUser Admin : ",response.data)
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
                if(exception.response) {
                    toast.error(
                        <div className="d-flex align-items-center fs-6">
                            Erreur rencontrée au niveau des champs surlignés !!!
                            <br/>
                            {exception.response.data.error.length} erreur(s) rencontrés
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
        return (user.password === user.password_confirmation && user.password.length > 8)
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
                                <option value="">-- Séléctionnez le rôle</option>
                                { roles.map( (item, index) => {
                                    return(
                                        <option value={item.id} selected={item.id === user.role_id}>{item.name}</option>
                                    )
                                })}
                            </select>
                            <div class="invalid-feedback" id="RoleFeedback"></div>
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
                            <label className="d-block mb-2">Mot de Passe</label>
                            <input className={"form-control " + ( !validatePasswordFields() ? "is-invalid " : "")} onChange={handleAddNewTextInputChange} id="Password" 
                                aria-describedby="PasswordFeedback" type="password" name="password" 
                                value={user.password} placeholder="Mot de Passe"  />
                            <div class="invalid-feedback" id="PasswordFeedback">
                                { (user.password !== user.password_confirmation && user.password_confirmation !== "") && 
                                    <span className="fw-bold">Les mots de passes ne correspondent pas.</span>
                                }
                            </div>
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Saisissez A Nouveau</label>
                            <input className="form-control" onChange={handleAddNewTextInputChange} id="Password" 
                                aria-describedby="PasswordFeedback" type="password" name="password_confirmation" 
                                value={user.password_confirmation} placeholder="Confirmation de Mot de Passe"  />
                        </div>
                    </div>

                    <div className="row my-2">
                        <div className="float-start">
                            <Button type="button" className="btn-secondary m-2">Fermer</Button>
                            <Button type="submit" className="btn-primary m-2" 
                                disabled={sent || (user.password === user.password_confirmation && user.password.length < 8)}
                                > { sent && (<LoadingSpinner />) }Enregistrer</Button>
                        </div>
                    </div>
                </form>                   
            </div>
        </div>
    )
}

export default AddUser
