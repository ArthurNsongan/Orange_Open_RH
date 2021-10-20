import { faArrowLeft, faArrowRight, faCheck, faCheckCircle, faChevronLeft, faInfoCircle, faUser, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { NavLink } from 'react-router-dom'
import Select from 'react-select'
import { toast } from 'react-toastify'
import Button from '../../components/Button'
import LoadingSpinner from '../../components/LoadingSpinner'
import Stepper, {Step} from '../../components/Stepper'
import { signUpTypes } from '../../config/constants'
import { userRegister, AllAssociations, AddMember } from '../../services/API'

let route = require("../../utils/route.json")

function SignUp(props) {

    const history = useHistory()

    const registerAttemptInitState = {
        name: "",
        firstname: "",
        email: "",
        maritalStatus: "",
        OmAccountNumber: "",
        association: "",
        association_id: "",
        password: "",
        sex: "F",
        password_confirmation: "",
        idNumber: "",
        profession: "",
        requestSent: false,
    }

    const registerPartnerAttemptInitState = {
        name: "",
        email: "",
        logo: null,
        phone: "",
        password: "",
        password_confirmation: "",
        requestSent: false,
    }

    const [currentStep, setCurrentStep] = useState(1)
    const [steps, setSteps] = useState(5)

    const [chosenRole, setChosenRole] = useState(null)


    const [lightAssociations, setLightAssociations] = useState([{ id: 1, name: "Association des Femmes Vaillantes"}])

    const [registerAttempt, setRegisterAttempt] = useState(null);

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
        let { name, value, type } = e.target
        let registerAttemptTmp = { ...registerAttempt }
        if(type === "file" ) { registerAttemptTmp[name] = e.target.files[0] }
        else { registerAttemptTmp[name] = value }
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
        });

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
                        });
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

    const finalStepFormPartenaire = (e) => {
        e.preventDefault()

        setRegisterAttempt({
            ...registerAttempt,
            requestSent: true
        });

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
                        });
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

    const getChosenRoleForm = () => {
        switch (chosenRole) {
            case signUpTypes.member:
                return <MemberSignUp prevStep={prevStep} returnToRoleChoice={returnToRoleChoice} nextStep={nextStep} handleAssocChange={handleAssocChange} handleChange={handleChange}
                    lightAssociations={lightAssociations} registerAttempt={registerAttempt} 
                    currentStep={currentStep} contactDataFormSubmit={contactDataFormSubmit} finalStepForm={finalStepForm} />;
            case signUpTypes.partner:
                return <PartenaireSignUp prevStep={prevStep} returnToRoleChoice={returnToRoleChoice} nextStep={nextStep} handleAssocChange={handleAssocChange} handleChange={handleChange}
                lightAssociations={lightAssociations} registerAttempt={registerAttempt} 
                currentStep={currentStep} contactDataFormSubmit={contactDataFormSubmit} finalStepForm={finalStepForm}/>        
            default:
                return <MemberSignUp prevStep={prevStep} returnToRoleChoice={returnToRoleChoice} nextStep={nextStep} handleAssocChange={handleAssocChange} handleChange={handleChange}
                    lightAssociations={lightAssociations} registerAttempt={registerAttempt} 
                    currentStep={currentStep} contactDataFormSubmit={contactDataFormSubmit} finalStepForm={finalStepForm} />        }
    }

    useEffect(() => {
        alert(chosenRole)
        switch(chosenRole) {
            case signUpTypes.member:
                setRegisterAttempt(registerAttemptInitState);
                return null;
            case signUpTypes.partner:
                setRegisterAttempt(registerPartnerAttemptInitState);
                return null;      
            default:
                setRegisterAttempt(registerAttemptInitState);
                return null;
        }
    }, [chosenRole]);

    const returnToRoleChoice = () => { setChosenRole(null) }

    return (
        <section className="AuthSection bg-light w-100">
            <div className="container">
                <div className="row min-vh-100 align-items-center justify-content-center">
                    <div className="col-lg-6 bg-white animatedWidth">
                        <div className="d-flex my-5 flex-column align-items-center justify-content-center">
                            <h5 className="text-center h5">Inscription à </h5>
                            <span className="h3 text-primary headingFunPrim contentCenter fw-bold">Challenge Solidarité</span>
                        </div>
                        { chosenRole == null ? (
                            <>
                                <div className="d-flex justify-content-center">
                                    <h3 className="text-center">Vous souhaitez vous inscrire en tant que ?</h3>
                                </div>
                                <div className="d-flex flex-row mb-5 mx-3">
                                    <Button className="FullWidth py-3 me-2 btn btn-secondary border-0 bg-supporting-green" onClick={() => setChosenRole(signUpTypes.member)}>
                                        <div className="d-flex flex-column justify-content-center align-items-center py-3">
                                            <FontAwesomeIcon icon={faUser} className="fa-4x" />
                                            <span className="my-2 fs-4">Membre</span>
                                        </div>
                                    </Button>
                                    <Button className="FullWidth py-3 btn btn-secondary border-0 bg-supporting-blue" onClick={() => setChosenRole(signUpTypes.partner)}>
                                        <div className="d-flex flex-column ms-2 justify-content-center align-items-center py-3">
                                            <FontAwesomeIcon icon={faUserAstronaut} className="fa-4x" />
                                            <span className="my-2 fs-4">Partenaire</span>
                                        </div>
                                    </Button>
                                </div>
                            </>
                        ) : getChosenRoleForm() }
                    </div>
                </div>
            </div>
        </section>
    )
}

const MemberSignUp = ({ registerAttempt, handleChange, contactDataFormSubmit, returnToRoleChoice, handleAssocChange, lightAssociations, finalStepForm}) => {
    
    const [currentStep, setCurrentStep] = useState(1)
    const [steps, setSteps] = useState(5)

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

    return <div id="MemberSignUp" className="px-2">
                <Stepper currentStep={currentStep}>
                    <Step step={1}>
                        <form className="" id="MemberDataForm">
                            <div className="form-floating mb-3">
                                <label for="Nom">Nom</label>
                                <input type="text" className="form-control" name="name" id="Nom" onChange={handleChange} value={registerAttempt.name} placeholder="Entrez votre nom..."></input>
                            </div>
                            <div className="form-floating mb-3">
                                <label for="Prenom">Prénom</label>
                                <input type="text" className="form-control" id="Prenom" name="firstname"  onChange={handleChange} value={registerAttempt.firstname}  placeholder="Entrez votre prénom..."></input>
                            </div>
                            <div className="form-floating mb-3">
                                <label for="Prenom">Sexe</label>
                                <select className="form-select" id="Sex" name="sex"  onChange={handleChange}>
                                    <option value="M" selected={registerAttempt.sex === "M"}>Masculin</option>
                                    <option value="F" selected={registerAttempt.sex === "F"}>Féminin</option>
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <label for="maritalStatus">Status de Mariage</label>
                                <select className="form-select" id="maritalStatus" name="maritalStatus" onChange={handleChange} >
                                    { registerAttempt.maritalStatus === "" && <option value=""></option> }
                                    <option value="single" selected={ registerAttempt.maritalStatus === "single"}>Célibataire</option>
                                    <option value="married" selected={ registerAttempt.maritalStatus === "married"}>Marié(e)</option>
                                    <option value="widowhood" selected={ registerAttempt.maritalStatus === "widowhood"}>Veuf / Veuve</option>
                                </select>
                            </div>
                            <div className="d-flex flex-row align-items-center justify-content-between mb-5">
                                <button type="button" className="btn btn-light" onClick={returnToRoleChoice}><FontAwesomeIcon icon={faArrowLeft} className="me-1" /> Retour au choix du rôle</button>
                                <Button type="button" disabled={ registerAttempt.name === "" || registerAttempt.firstname === ""
                                    || registerAttempt.maritalStatus === "" } 
                                    className="btn btn-primary" onClick={nextStep}>Suivant <FontAwesomeIcon icon={faArrowRight} className="ms-1" /></Button>
                            </div>
                        </form>
                    </Step>
                    <Step step={2}>
                        <form className="" id="MemberDataForm">
                            <div className="form-floating mb-3">
                                <label for="BirthDay">Date de Naissance <i>(facultatif)</i></label>
                                <input type="date" className="form-control" name="birthday" id="BirthDay" onChange={handleChange} value={registerAttempt.birthday} />
                            </div>
                            <div className="form-floating mb-3">
                                <label for="BirthPlace">Lieu de Naissance <i>(facultatif)</i></label>
                                <input type="text" className="form-control" id="BirthPlace" name="birthplace"  onChange={handleChange} value={registerAttempt.birthplace}  placeholder="Entrez votre lieu de naissance" />
                            </div>
                            <div className="form-floating mb-3">
                                <label for="Mother">Nom de la mère <i>(facultatif)</i></label>
                                <input type="text" className="form-control" id="Mother" name="mother"  onChange={handleChange} value={registerAttempt.mother} />
                            </div>
                            <div className="form-floating mb-3">
                                <label for="Father">Nom du père <i>(facultatif)</i></label>
                                <input type="text" className="form-control" id="Father" name="father"  onChange={handleChange} value={registerAttempt.father} />
                            </div>
                            <div className="d-flex flex-row justify-content-between mb-5">
                                <button className="btn btn-light my-1" onClick={prevStep}><FontAwesomeIcon icon={faArrowLeft} className="me-1"/> Précédent</button>
                                <Button type="button" className="btn btn-primary my-1" onClick={nextStep}>Suivant <FontAwesomeIcon icon={faArrowRight} className="ms-1" /></Button>
                            </div>
                        </form>
                    </Step>
                    <Step step={3}>
                        <form id="ContactDataForm" onSubmit={contactDataFormSubmit}>
                            <div className="form-floating mb-3">
                                <label for="Email">Numéro de Téléphone (avec compte Orange Money)</label>
                                <input type="text" className="form-control" pattern="[0-9]*"  value={registerAttempt.OmAccountNumber} onChange={handleChange} id="OMAccountNumber" name="OmAccountNumber"></input>
                            </div>
                            <div className="form-floating mb-3">
                                <label for="Email">E-mail</label>
                                <input type="email" className="form-control"  value={registerAttempt.email} onChange={handleChange} id="Email" name="email" placeholder="Ex: votrenom@gmail.com"></input>
                            </div>
                            <div className="d-flex flex-row justify-content-between mb-5">
                                <button className="btn btn-light my-1" onClick={prevStep}><FontAwesomeIcon icon={faArrowLeft} className="me-1"/> Précédent</button>
                                <Button className="btn btn-primary my-1" onClick={nextStep}
                                    disabled={ (registerAttempt.OmAccountNumber === "" || registerAttempt.OmAccountNumber.length !== 9)  || registerAttempt.email === "" || registerAttempt.requestSent === true }
                                    type="submit">Suivant <FontAwesomeIcon icon={faArrowRight} /></Button>
                            </div>
                        </form>
                    </Step>
                    <Step step={4}>
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
                        <div className="d-flex flex-row justify-content-between mt-2 mb-5">
                            <button className="btn btn-light my-1" onClick={prevStep}><FontAwesomeIcon icon={faArrowLeft} className="me-1"/> Précédent</button>
                            <Button className="btn btn-primary my-1" disabled={ registerAttempt.association_id === ""} onClick={nextStep}>Suivant <FontAwesomeIcon icon={faArrowRight} className="ms-1"/></Button>
                        </div>
                    </Step>
                    <Step step={5}>
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
                            <div className="d-flex flex-row justify-content-between mb-5">
                                <button className="btn btn-light my-1" onClick={prevStep}><FontAwesomeIcon icon={faArrowLeft} className="me-1"/> Précédent</button>
                                <button className="btn btn-success my-1 d-flex align-items-center justify-content-center" type="submit"
                                    disabled={ (registerAttempt.password !== registerAttempt.password_confirmation && registerAttempt.password.length < 8) && registerAttempt.requestSent } >
                                        { registerAttempt.requestSent && (<LoadingSpinner className="me-2" style={{width: "25px", height: "25px"}} />) } Confirmer l'Inscription <FontAwesomeIcon icon={faCheckCircle} className="ms-1" />     
                                </button>
                            </div>
                        </form>
                    </Step>
                    <Step step={6}>
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <span className="h2 fw-bold">
                                Enregistrement réussi !
                            </span>
                            <span className="bg-dark rounded-circle p-4 my-4">
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
}

const PartenaireSignUp = ({ registerAttempt, handleChange, contactDataFormSubmit, returnToRoleChoice , handleAssocChange, lightAssociations, finalStepForm}) => {
    
    const [currentStep, setCurrentStep] = useState(1)
    const [steps, setSteps] = useState(5)

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
    
    return (
    <div id="PartenaireSignUp" className="px-2">
        <Stepper currentStep={currentStep}>
            <Step step={1}>
                <form className="" id="MemberDataForm">
                    <div className="form-floating mb-3">
                        <label for="Nom">Nom</label>
                        <input type="text" className="form-control" name="name" id="Nom" onChange={handleChange} value={registerAttempt.name} placeholder="Entrez votre nom..."/>
                    </div>
                    <div className="form-floating mb-3">
                        <label for="Logo">Logo</label> <br/>
                        { (registerAttempt.logo !== "" && registerAttempt.logo != null ) && <img alt="Logo" src={ URL.createObjectURL(registerAttempt.logo)} height="150px" className="" />}
                        <input type="file" accept="image/*" className="form-control" name="logo" id="Logo" onChange={handleChange} placeholder="Logo du partenaire" />
                    </div>
                    <div className="d-flex flex-row justify-content-between mb-5">
                        <button className="btn btn-light my-1"  onClick={returnToRoleChoice}><FontAwesomeIcon icon={faArrowLeft} className="me-1"/> Retour au choix du rôle</button>
                        <Button type="button" disabled={ registerAttempt.name === "" || (registerAttempt.logo == "" || registerAttempt.logo == null )} 
                            className="btn btn-primary" onClick={nextStep}>Suivant <FontAwesomeIcon icon={faArrowRight} className="ms-1" /></Button>
                    </div>
                </form>
            </Step>
            <Step step={2}>
                <form className="" id="MemberDataForm">
                    <div className="form-floating mb-3">
                        <label for="Phone">Numéro de Téléphone</label>
                        <input type="text" pattern="[0-9]*" className="form-control" name="phone" id="Phone" onChange={handleChange} value={registerAttempt.phone} />
                    </div>
                    <div className="d-flex flex-row justify-content-between mb-5">
                        <Button className="btn btn-light my-1" onClick={prevStep}><FontAwesomeIcon icon={faArrowLeft} className="me-1"/> Précédent</Button>
                        <Button type="button" className="btn btn-primary my-1" disabled={(registerAttempt?.phone === "" || registerAttempt?.phone?.length !== 9)  } onClick={nextStep}>Suivant <FontAwesomeIcon icon={faArrowRight} className="ms-1" /></Button>
                    </div>
                </form>
            </Step>
            <Step step={3}>
                <form id="ContactDataForm" onSubmit={contactDataFormSubmit}>
                    <div className="form-floating mb-3">
                        <label for="Email">E-mail</label>
                        <input type="email" className="form-control"  value={registerAttempt.email} onChange={handleChange} id="Email" name="email" placeholder="Ex: votrenom@gmail.com"></input>
                    </div>
                    <div className="d-flex flex-row justify-content-between mb-5">
                        <Button className="btn btn-primary my-1" onClick={prevStep}><FontAwesomeIcon icon={faArrowLeft} className="me-1" /> Précédent</Button>
                        <Button className="btn btn-primary my-1" onClick={nextStep}
                            disabled={ registerAttempt.email === "" }
                            type="submit">Suivant <FontAwesomeIcon icon={faArrowRight} /></Button>
                    </div>
                </form>
            </Step>
            <Step step={4}>
                {/* <div className="form-floating mb-3">
                    <input list="Associations" className="form-control" id="Association" name="association_id" onChange={handleAssocChange}/>
                    <datalist id="Associations">
                        <option data-value={1}>Association des Femmes Vaillantes</option>
                        <option data-value={2}>Ordre des Ingénieurs</option>
                    </datalist>
                    <label for="Nom">Séléctionnez une association</label>
                </div> */}
                <label for="Nom">Adhérer au projet</label>
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
                <div className="d-flex flex-row justify-content-between mt-2 mb-5">
                    <Button className="btn btn-secondary my-1" onClick={prevStep}><FontAwesomeIcon icon={faArrowLeft}  className="me-1" /> Précédent</Button>
                    <Button className="btn btn-primary my-1" disabled={ false} onClick={nextStep}>Suivant <FontAwesomeIcon icon={faArrowRight} className="ms-1"/></Button>
                </div>
            </Step>
            <Step step={5}>
                <form id="finalStepForm" onSubmit={finalStepForm}>
                    <div className="form-floating mb-3">
                        <label for="Password">Mot de passe</label>
                        <input type="password" name="password" className="form-control" value={registerAttempt.password}
                            onChange={handleChange} id="Password" placeholder="Votre mot de passe"></input>
                    </div>
                    <div className="form-floating mb-3">
                        {/* <label for="Password">Confirmer le mot de passe</label> */}
                        <input type="password" placeholder="Confirmation du mot de passe" name="password_confirmation" value={registerAttempt.password_confirmation}
                            onChange={handleChange} className="form-control" id="Password_Confirm" ></input>
                    </div>
                    <div className="d-flex flex-row justify-content-between mb-5">
                        <Button className="btn btn-primary my-1" type="button" onClick={prevStep}><FontAwesomeIcon icon={faArrowLeft} className="me-1" /> Précédent</Button>
                        <button className="btn btn-success my-1 d-flex align-items-center justify-content-center" type="submit"
                            disabled={ (registerAttempt.password !== registerAttempt.password_confirmation && registerAttempt.password.length < 8) &&
                                registerAttempt.requestSent }
                            >{ registerAttempt.requestSent && (<LoadingSpinner className="me-2" style={{width: "25px", height: "25px"}} />) } Confirmer</button>
                    </div>
                </form>
            </Step>
            <Step step={6}>
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <span className="h2 fw-bold">
                        Enregistrement réussi !
                    </span>
                    <span className="bg-dark rounded-circle p-4 my-4">
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
)}

export default SignUp
