import { faArrowLeft, faArrowRight, faCheck, faCheckCircle, faChevronLeft, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { NavLink } from 'react-router-dom'
import Select from 'react-select'
import { toast } from 'react-toastify'
import Button from '../../components/Button'
import LoadingSpinner from '../../components/LoadingSpinner'
import Stepper, {Step} from '../../components/Stepper'
import { userRegister, AllAssociations, AddMember } from '../../services/API'

let route = require("../../utils/route.json")

function SignUp(props) {

    const history = useHistory()

    const [currentStep, setCurrentStep] = useState(1)
    const [steps, setSteps] = useState(5)

    const [lightAssociations, setLightAssociations] = useState([{ id: 1, name: "Association des Femmes Vaillantes"}])

    const [registerAttempt, setRegisterAttempt] = useState({
        name: "",
        firstname: "",
        email: "",
        maritalStatus: "",
        OmAccountNumber: "",
        association: "",
        association_id: "",
        password: "",
        password_confirmation: "",
        requestSent: false,
    })

    const prevStep = () => {
        if(currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const nextStep = () => {
        if(currentStep < steps) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleChange = (e) => {
        let { name, value } = e.target
        let registerAttemptTmp = { ...registerAttempt }
        registerAttemptTmp[name] = value
        setRegisterAttempt(registerAttemptTmp);
        console.log(name + " : " + value )
        console.log(registerAttempt);
    }

    const handleAssocChange = (e) => {
        let { label, value } = e
        let registerAttemptTmp = { ...registerAttempt }
        console.log(value)
        registerAttemptTmp["association_id"] = value
        setRegisterAttempt(registerAttemptTmp);
        console.log(label + " : " + value )
        console.log(registerAttempt);
    }

    const contactDataFormSubmit = (e) => {
        e.preventDefault()

        nextStep()
    }

    const finalStepForm = (e) => {
        e.preventDefault()

        setRegisterAttempt({
            ...registerAttempt,
            requestSent: true
        })

        userRegister(registerAttempt, 
            (res) => { 
                console.log(res)
                AddMember(res.data.data.id, registerAttempt.association_id, "0000",
                    (res) => { 
                        console.log(res)
                        setRegisterAttempt({
                            ...registerAttempt,
                            requestSent: false
                        })
                    },
                    (error) => { if(error.response) { 
                        console.log(error.response) 
                        setRegisterAttempt({
                            ...registerAttempt,
                            requestSent: false
                        })
                    }});
                nextStep()
            },
            (exception) => { 
                setRegisterAttempt({
                    ...registerAttempt,
                    requestSent: false
                })                
                if(exception.response) { toast.error(
                    <div className="d-flex align-items-center h6 text-white">
                        <FontAwesomeIcon icon={faInfoCircle} className="me-1" />Vérifiez les champs { 
                        typeof(exception.response.data.error) === "object" && Object.keys(exception.response.data.error).map( item => (item))
                    }
                    </div>); console.log(exception.response) }
                else if(exception.request) { console.log(exception.request); toast.error(
                <div className="d-flex align-items-center h6 text-white">
                    <FontAwesomeIcon icon={faInfoCircle} className="me-1" /> Impossible de joindre le serveur !
                </div>) }
                else { console.log(exception.message) } 
        })
    }

    useEffect(()=> {
        AllAssociations((response) => { setLightAssociations(response.data.data)},
        (exception) => {
            if(exception.response) {
                console.log(exception.response)
            }
        })
    }, [props])

    return (
        <section className="AuthSection bg-secondary-2 w-100">
            <div className="container">
                <div className="row min-vh-100 align-items-center justify-content-center">
                    <div className="col-lg-6 bg-white ">
                        <div className="d-flex my-5 flex-column align-items-center justify-content-center">
                            <h5 className="text-center h5">Inscription à </h5>
                            <span className="h3 text-primary-2 headingFunPrim contentCenter fw-bold">Challenge Solidarité</span>
                        </div>
                        <div id="SignUp" className="px-2">
                            <Stepper currentStep={currentStep}>
                                <Step step={1}>
                                    <form className="" id="MemberDataForm">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" name="name" id="Nom" onChange={handleChange} value={registerAttempt.name} placeholder="Entrez votre nom..."></input>
                                            <label for="Nom">Nom</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="Prenom" name="firstname"  onChange={handleChange} value={registerAttempt.firstname}  placeholder="Entrez votre prénom..."></input>
                                            <label for="Prenom">Prénom</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <select className="form-select" id="maritalStatus" name="maritalStatus"  onChange={handleChange} placeholder="Ex: votrenom@gmail.com" >
                                                <option value=""></option>
                                                <option value="single">Célibataire</option>
                                                <option value="married">Marié(e)</option>
                                                <option value="widowhood">Veuf / Veuve</option>
                                            </select>
                                            <label for="maritalStatus">Status de Mariage</label>
                                        </div>
                                        <div className="mb-5">
                                            <Button type="button" disabled={ registerAttempt.name === "" || registerAttempt.firstname === ""
                                                || registerAttempt.maritalStatus === "" } 
                                                className="FullWidth btn btn-primary-2" onClick={nextStep}>Suivant <FontAwesomeIcon icon={faArrowRight} /></Button>
                                        </div>
                                    </form>
                                </Step>
                                <Step step={2}>
                                    <form id="ContactDataForm" onSubmit={contactDataFormSubmit}>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" pattern="[0-9]*"  value={registerAttempt.OmAccountNumber} onChange={handleChange} id="OMAccountNumber" name="OmAccountNumber"></input>
                                            <label for="Email">Numéro de Téléphone (avec compte Orange Money)</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="email" className="form-control"  value={registerAttempt.email} onChange={handleChange} id="Email" name="email" placeholder="Ex: votrenom@gmail.com"></input>
                                            <label for="Email">E-mail</label>
                                        </div>
                                        <div className="mb-5">
                                            <Button className="FullWidth btn btn-primary text-white my-1" onClick={prevStep}><FontAwesomeIcon icon={faArrowLeft} /> Précédent</Button>
                                            <Button className="FullWidth btn btn-secondary my-1" 
                                                disabled={ (registerAttempt.OmAccountNumber === "" || registerAttempt.OmAccountNumber.length !== 9)  || registerAttempt.email === "" || registerAttempt.requestSent === true }
                                                type="submit">Suivant <FontAwesomeIcon icon={faArrowRight} /></Button>
                                        </div>
                                    </form>
                                </Step>
                                <Step step={3}>
                                    {/* <div className="form-floating mb-3">
                                        <input list="Associations" className="form-control" id="Association" name="association_id" onChange={handleAssocChange}/>
                                        <datalist id="Associations">
                                            <option data-value={1}>Association des Femmes Vaillantes</option>
                                            <option data-value={2}>Ordre des Ingénieurs</option>
                                        </datalist>
                                        <label for="Nom">Séléctionnez une association</label>
                                    </div> */}
                                    <label for="Nom">Séléctionnez une association</label>
                                    <Select name="association_id" onChange={handleAssocChange} placeholder={"Sélectionnez votre association !"} options={
                                        lightAssociations.map((item) =>
                                        ({
                                            label: item.name,
                                            value: item.id
                                        }))
                                    }/>
                                        
                                        {/* // .map(item => (
                                        //     { value: item.id, label: item.name}
                                        // )) */}
                                    <div className="mt-2 mb-5">
                                        <Button className="FullWidth btn btn-primary text-white my-1"><FontAwesomeIcon icon={faArrowLeft}  onClick={prevStep}/> Précédent</Button>
                                        <Button className="FullWidth btn btn-secondary my-1" disabled={ registerAttempt.association_id === ""} onClick={nextStep}>Suivant <FontAwesomeIcon icon={faArrowRight} /></Button>
                                    </div>
                                </Step>
                                <Step step={4}>
                                    <form id="finalStepForm" onSubmit={finalStepForm}>
                                        <div className="form-floating mb-3">
                                            <input type="password" name="password" className="form-control" value={registerAttempt.password}
                                                onChange={handleChange} id="Password" placeholder="Votre mot de passe"></input>
                                            <label for="Password">Mot de passe</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="password" name="password_confirmation" value={registerAttempt.password_confirmation}
                                                onChange={handleChange} className="form-control" id="Password_Confirm" ></input>
                                            <label for="Password">Confirmer le mot de passe</label>
                                        </div>
                                        <div className="mb-5">
                                            <Button className="FullWidth btn btn-primary text-white my-1" type="button" onClick={prevStep}><FontAwesomeIcon icon={faArrowLeft} /> Précédent</Button>
                                            <Button className="FullWidth btn btn-secondary my-1  d-flex align-items-center justify-content-center" type="submit"
                                                disabled={ (registerAttempt.password !== registerAttempt.password_confirmation || registerAttempt.password.length < 8) &&
                                                    registerAttempt.requestSent }
                                                >{ registerAttempt.requestSent && (<LoadingSpinner className="me-2" style={{width: "25px", height: "25px"}} />) } Confirmer</Button>
                                        </div>
                                    </form>
                                </Step>
                                <Step step={5}>
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                        <span className="h2 fw-bold">
                                            Enregistrement réussi !
                                        </span>
                                        <span className="bg-secondary-2 rounded-circle p-4 my-4">
                                            <FontAwesomeIcon icon={faCheck} className="fa-3x text-white" />
                                        </span>
                                    </div>
                                    <div className="mb-5">
                                        <NavLink exact to={route.front.home.link}>
                                            <Button className="FullWidth btn btn-primary text-white my-1" type="button"> Retourner à l'Accueil</Button>
                                        </NavLink>
                                    </div>
                                </Step>
                            </Stepper>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp
