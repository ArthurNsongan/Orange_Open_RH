import { faArrowLeft, faArrowRight, faCheck, faCheckCircle, faChevronLeft, faInfoCircle, faUser, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Steps } from 'antd'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { NavLink } from 'react-router-dom'
import Select from 'react-select'
import { toast } from 'react-toastify'
import Button from '../../components/Button'
import LoadingSpinner from '../../components/LoadingSpinner'
import Stepper, { Step } from '../../components/Stepper'
import { checkEmail, checkPasswordStrong, checkPhoneNumber, signUpTypes } from '../../config/constants'
import { userRegister, AllAssociations, AddMember, checkUserDataValidation } from '../../services/API'
import { partnerRegister } from '../../services/partnerService'

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
    const [steps, setSteps] = useState(4)

    const [chosenRole, setChosenRole] = useState(null)


    const [lightAssociations, setLightAssociations] = useState([{ id: 1, name: "Association des Femmes Vaillantes" }])

    const [registerAttempt, setRegisterAttempt] = useState(null);

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const nextStep = () => {
        if (currentStep < steps) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleChange = (e) => {
        let { name, value, type } = e.target
        let registerAttemptTmp = { ...registerAttempt }
        if (type === "file") { registerAttemptTmp[name] = e.target.files[0] }
        else { registerAttemptTmp[name] = value }
        setRegisterAttempt(registerAttemptTmp);
        console.log(name + " : " + value)
        console.log(registerAttempt);
    }

    const handleAssocChange = (e) => {
        let { label, value } = e
        let registerAttemptTmp = { ...registerAttempt }
        console.log(value)
        registerAttemptTmp["association_id"] = value
        setRegisterAttempt(registerAttemptTmp);
        console.log(label + " : " + value)
        console.log(registerAttempt);
    }

    useEffect(() => {
        AllAssociations((response) => { setLightAssociations(response.data.data) },
            (exception) => {
                if (exception.response) {
                    console.log(exception.response)
                }
            })
    }, [props])

    const getChosenRoleForm = () => {
        switch (chosenRole) {
            case signUpTypes.member:
                return <MemberSignUp prevStep={prevStep} returnToRoleChoice={returnToRoleChoice} nextStep={nextStep} handleAssocChange={handleAssocChange} handleChange={handleChange}
                    lightAssociations={lightAssociations} registerAttempt={registerAttempt}
                    currentStep={currentStep} setRegisterAttempt={setRegisterAttempt} />;
            case signUpTypes.partner:
                return <PartenaireSignUp prevStep={prevStep} returnToRoleChoice={returnToRoleChoice} nextStep={nextStep} handleAssocChange={handleAssocChange} handleChange={handleChange}
                    lightAssociations={lightAssociations} registerAttempt={registerAttempt}
                    currentStep={currentStep} setRegisterAttempt={setRegisterAttempt} />
            default:
                return <MemberSignUp prevStep={prevStep} returnToRoleChoice={returnToRoleChoice} nextStep={nextStep} handleAssocChange={handleAssocChange} handleChange={handleChange}
                    lightAssociations={lightAssociations} registerAttempt={registerAttempt}
                    currentStep={currentStep} setRegisterAttempt={setRegisterAttempt} />
        }
    }

    useEffect(() => {
        switch (chosenRole) {
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
                            <NavLink to="/" className="h2 text-primary headingFunPrim contentCenter fw-bold" role="button">Challenge Solidarité</NavLink>
                        </div>
                        {chosenRole == null ? (
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
                        ) : getChosenRoleForm()}
                    </div>
                </div>
            </div>
        </section>
    )
}

const MemberSignUp = ({ registerAttempt, handleChange, returnToRoleChoice, handleAssocChange, lightAssociations, setRegisterAttempt }) => {

    const [currentStep, setCurrentStep] = useState(1)
    const [steps, setSteps] = useState(4)

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const contactDataFormSubmit = (e) => {
        e.preventDefault()
        setRegisterAttempt(
            {...registerAttempt,
            requestSent: true}
        )
        let userData = {
            email: registerAttempt.email
        }
        userData = {
            ...userData,
            OmAccountNumber: registerAttempt.OmAccountNumber
        }

        checkUserDataValidation(userData, (response) => {
            nextStep()
            setRegisterAttempt({...registerAttempt,requestSent: false})
            }, (exception) => {
            setRegisterAttempt({...registerAttempt,requestSent: false})
            if (exception.response) {
                toast.error(
                    <div className="d-flex align-items-center h6 text-white">
                        <FontAwesomeIcon icon={faInfoCircle} className="me-1" />Vérifiez les champs {
                            typeof (exception.response.data.error) === "object" && Object.keys(exception.response.data.error).map(item => (item))
                        }
                    </div>); console.log(exception.response)
            }
            else if (exception.request) {
                console.log(exception.request); toast.error(
                    <div className="d-flex align-items-center text-white">
                        <FontAwesomeIcon icon={faInfoCircle} className="me-1" /> Impossible de joindre le serveur !
                    </div>)
            }
            else { console.log(exception.message) }
        })

    }

    const nextStep = () => {
        if (currentStep < steps) {
            setCurrentStep(currentStep + 1)
        }
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
                nextStep()
                AddMember(res.data.data.id, registerAttempt.association_id, "0000",
                    (res) => {
                        console.log(res)
                        setRegisterAttempt({
                            ...registerAttempt,
                            requestSent: false
                        })
                    },
                    (error) => {
                        if (error.response) {
                            console.log(error.response)
                            setRegisterAttempt({
                                ...registerAttempt,
                                requestSent: false
                            });
                        }
                    });
            },
            (exception) => {
                setRegisterAttempt({
                    ...registerAttempt,
                    requestSent: false
                })
                if (exception.response) {
                    toast.error(
                        <div className="d-flex align-items-center h6 text-white">
                            <FontAwesomeIcon icon={faInfoCircle} className="me-1" />Vérifiez les champs {
                                typeof (exception.response.data.error) === "object" && Object.keys(exception.response.data.error).map(item => (item))
                            }
                        </div>); console.log(exception.response)
                }
                else if (exception.request) {
                    console.log(exception.request); toast.error(
                        <div className="d-flex align-items-center text-white">
                            <FontAwesomeIcon icon={faInfoCircle} className="me-1" /> Impossible de joindre le serveur !
                        </div>)
                }
                else { console.log(exception.message) }
            })
    }

    return <div id="MemberSignUp" className="px-2">
        <Steps className="mb-3 stepIndicator" current={currentStep - 1}>
            <Steps.Step titles="Informations Personnelles" />
            <Steps.Step titles="Choix de l'association" />
            <Steps.Step titles="Mot de passe" />
        </Steps>
        <Stepper currentStep={currentStep}>
            <Step>
                <form className="" onSubmit={contactDataFormSubmit} id="MemberDataForm">
                    <div className="form-floating mb-3">
                        <label for="Nom">Nom</label>
                        <input type="text" className="form-control" name="name" id="Nom" onChange={handleChange} value={registerAttempt.name} placeholder="Entrez votre nom..."></input>
                    </div>
                    <div className="form-floating mb-3">
                        <label for="Prenom">Prénom</label>
                        <input type="text" className="form-control" id="Prenom" name="firstname" onChange={handleChange} value={registerAttempt.firstname} placeholder="Entrez votre prénom..."></input>
                    </div>
                    <div className="form-floating mb-3">
                        <label for="Prenom">Sexe</label>
                        <select className="form-select" id="Sex" name="sex" onChange={handleChange}>
                            <option value="M" selected={registerAttempt.sex === "M"}>Masculin</option>
                            <option value="F" selected={registerAttempt.sex === "F"}>Féminin</option>
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <label for="BirthPlace">Lieu de Résidence</label>
                        <input type="text" className="form-control" id="Address" name="address" onChange={handleChange} value={registerAttempt.address} placeholder="Entrez votre lieu de résidence" />
                    </div>
                    <div className="form-floating mb-3">
                        <label for="Email">Numéro de Téléphone (avec compte Orange Money)</label>
                        <input type="text" className="form-control" pattern="[0-9]*" value={registerAttempt.OmAccountNumber} onChange={handleChange} id="OMAccountNumber" name="OmAccountNumber"></input>
                    </div>
                    <div className="form-floating mb-3">
                        <label for="Email">E-mail</label>
                        <input type="email" className="form-control" value={registerAttempt.email} onChange={handleChange} id="Email" name="email" placeholder="Ex: votrenom@gmail.com"></input>
                    </div>
                    <div className="d-flex flex-row align-items-center justify-content-between mb-5">
                        <button type="button" className="btn btn-light" onClick={returnToRoleChoice}><FontAwesomeIcon icon={faArrowLeft} className="me-1" /> Retour au choix du rôle</button>
                        <Button type="submit" disabled={registerAttempt.name === "" || registerAttempt.firstname === "" || registerAttempt.address === "" ||
                            !checkPhoneNumber(registerAttempt.OmAccountNumber)
                            || !checkEmail(registerAttempt.email) || registerAttempt.requestSent === true}
                            className="btn btn-primary">{(registerAttempt.requestSent && currentStep === 1) && (<LoadingSpinner className="me-2" style={{ width: "25px", height: "25px" }} />)}Suivant <FontAwesomeIcon icon={faArrowRight} className="ms-1" /></Button>
                    </div>
                </form>
            </Step>
            {/* <Step>
                        <form id="ContactDataForm" onSubmit={contactDataFormSubmit}>
                            <div className="d-flex flex-row justify-content-between mb-5">
                                <button className="btn btn-light my-1" onClick={prevStep}><FontAwesomeIcon icon={faArrowLeft} className="me-1"/> Précédent</button>
                                <Button className="btn btn-primary my-1" onClick={nextStep}
                                    disabled={ (registerAttempt.OmAccountNumber === "" || registerAttempt.OmAccountNumber.length !== 9)  || registerAttempt.email === "" || registerAttempt.requestSent === true }
                                    type="submit">Suivant <FontAwesomeIcon icon={faArrowRight} /></Button>
                            </div>
                        </form>
                    </Step> */}
            <Step>
                <label for="Nom">Séléctionnez une association</label>
                <Select name="association_id" onChange={handleAssocChange} placeholder={"Sélectionnez votre association !"} options={
                    lightAssociations.map((item) =>
                    ({
                        label: item.name,
                        value: item.id
                    }))
                } />
                <div className="d-flex flex-row justify-content-between mt-2 mb-5">
                    <button className="btn btn-light my-1" onClick={prevStep}><FontAwesomeIcon icon={faArrowLeft} className="me-1" /> Précédent</button>
                    <Button className="btn btn-primary my-1" disabled={registerAttempt.association_id === ""} onClick={nextStep}>Suivant <FontAwesomeIcon icon={faArrowRight} className="ms-1" /></Button>
                </div>
            </Step>
            <Step>
                <form id="finalStepForm" onSubmit={finalStepForm}>
                    <label for="Password">Mot de passe</label>
                    <div className="form-floating mb-3">
                        <input type="password" name="password" className="form-control" value={registerAttempt.password}
                            onChange={handleChange} id="Password" placeholder="Votre mot de passe"></input>
                    </div>
                    <span className="d-flex text-secondary my-2 fw-bold fs-7">Votre mot de passe doit contenir au moins 8 caractères. Au moins 1 majuscule, 1 miniscule et des chiffres.</span>
                    <div className="form-floating mb-3">
                        <label for="Password">Confirmer le mot de passe</label>
                        <input type="password" name="password_confirmation" value={registerAttempt.password_confirmation}
                            onChange={handleChange} className="form-control" id="Password_Confirm" ></input>
                    </div>
                    <div className="d-flex flex-row justify-content-between mb-5">
                        <button className="btn btn-light my-1" onClick={prevStep}><FontAwesomeIcon icon={faArrowLeft} className="me-1" /> Précédent</button>
                        <button className="btn btn-success my-1 d-flex align-items-center justify-content-center" type="submit" disabled={(registerAttempt.password !== registerAttempt.password_confirmation || !checkPasswordStrong(registerAttempt.password)) || registerAttempt.requestSent} >
                            {registerAttempt.requestSent && (<LoadingSpinner className="me-2" style={{ width: "25px", height: "25px" }} />)} Confirmer l'Inscription <FontAwesomeIcon icon={faCheckCircle} className="ms-1" />
                        </button>
                    </div>
                </form>
            </Step>
            <Step>
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
                        <Button className="FullWidth btn btn-primary my-1" type="button"> Retourner à l'Accueil</Button>
                    </NavLink>
                </div>
            </Step>
        </Stepper>
    </div>
}

const PartenaireSignUp = ({ registerAttempt, handleChange, returnToRoleChoice, handleAssocChange, lightAssociations, setRegisterAttempt }) => {

    const [currentStep, setCurrentStep] = useState(1)
    const [steps, setSteps] = useState(3)

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const contactDataFormSubmit = (e) => {
        e.preventDefault()
        setRegisterAttempt(
            {...registerAttempt,
            requestSent: true}
        )
        let userData = {
            email: registerAttempt.email
        }
        userData = {
            ...userData,
            phone: registerAttempt.phone
        }

        checkUserDataValidation(userData, (response) => {
            nextStep()
            setRegisterAttempt({...registerAttempt,requestSent: false})
            }, (exception) => {
            setRegisterAttempt({...registerAttempt,requestSent: false})
            if (exception.response) {
                toast.error(
                    <div className="d-flex align-items-center h6 text-white">
                        <FontAwesomeIcon icon={faInfoCircle} className="me-1" />Vérifiez les champs {
                            // typeof (exception.response.data.error) === "object" && Object.keys(exception.response.data.error).map(item => (item))
                            exception?.response?.data?.errors !== undefined && Object.keys(exception.response.data.errors).map(item => (<>{item[0]}<br/></>))
                        }
                    </div>); console.log(exception.response)
            }
            else if (exception.request) {
                console.log(exception.request); toast.error(
                    <div className="d-flex align-items-center text-white">
                        <FontAwesomeIcon icon={faInfoCircle} className="me-1" /> Impossible de joindre le serveur !
                    </div>)
            }
            else { console.log(exception.message) }
        })

    }

    const nextStep = () => {
        if (currentStep < steps) {
            setCurrentStep(currentStep + 1)
        }
    }

    const finalStepForm = (e) => {

        e.preventDefault()

        setRegisterAttempt({
            ...registerAttempt,
            requestSent: true
        });

        let registerAttemptData = new FormData();
        registerAttemptData.append("name", registerAttempt.name)
        registerAttemptData.append("logo", registerAttempt.logo)
        registerAttemptData.append("email", registerAttempt.email)
        registerAttemptData.append("password", registerAttempt.password)
        registerAttemptData.append("phone", registerAttempt.phone)
        registerAttemptData.append("password_confirmation", registerAttempt.password_confirmation)


        console.log("Register Partner Logo", registerAttemptData.get("logo"))

        partnerRegister(registerAttemptData,
            (res) => {
                console.log(res)
                setRegisterAttempt({
                    ...registerAttempt,
                    requestSent: false
                })
                nextStep()
                // alert(JSON.stringify(registerAttemptData));
            },
            (exception) => {
                setRegisterAttempt({
                    ...registerAttempt,
                    requestSent: false
                })
                if (exception.response) {
                    toast.error(
                        <div className="d-flex align-items-center h6 text-white">
                            <FontAwesomeIcon icon={faInfoCircle} className="me-1" />Vérifiez les champs {
                                typeof (exception?.response?.data?.error) === "object" && Object.keys(exception.response.data.error).map(item => (item))
                            }
                        </div>); console.log(exception.response)
                }
                else if (exception?.request) {
                    console.log(exception?.request); toast.error(
                        <div className="d-flex align-items-center h6 text-white">
                            <FontAwesomeIcon icon={faInfoCircle} className="me-1" /> Impossible de joindre le serveur !
                        </div>)
                }
                else { console.log(exception?.message) }
            })
    }

    return (
        <div id="PartenaireSignUp" className="px-2">
            <Steps className="mb-3 stepIndicator" current={currentStep - 1}>
                <Steps.Step titles="Informations Personnelles" />
                <Steps.Step titles="Mot de passe" />
            </Steps>
            <Stepper currentStep={currentStep}>
                <Step>
                    <form onSubmit={contactDataFormSubmit} className="" id="MemberDataForm">
                        <div className="form-floating mb-3">
                            <label for="Nom">Nom</label>
                            <input type="text" className="form-control" name="name" id="Nom" onChange={handleChange} value={registerAttempt.name} placeholder="Entrez votre nom..." />
                        </div>
                        <div className="form-floating mb-3">
                            <label for="Logo">Logo</label> <br />
                            {(registerAttempt.logo !== "" && registerAttempt.logo != null) && <img alt="Logo" src={URL.createObjectURL(registerAttempt.logo)} height="150px" className="" />}
                            <input type="file" accept="image/*" className="form-control" name="logo" id="Logo" onChange={handleChange} placeholder="Logo du partenaire" />
                        </div>
                        <div className="form-floating mb-3">
                            <label for="Email">E-mail</label>
                            <input type="email" className="form-control" value={registerAttempt.email} onChange={handleChange} id="Email" name="email" placeholder="Ex: votrenom@gmail.com"></input>
                        </div>
                        <div className="form-floating mb-3">
                            <label for="Phone">Numéro de Téléphone</label>
                            <input type="text" pattern="[0-9]9" className="form-control" name="phone" id="Phone" onChange={handleChange} value={registerAttempt.phone} />
                        </div>
                        <div className="d-flex flex-row justify-content-between mb-5">
                            <button className="btn btn-light my-1" onClick={returnToRoleChoice}><FontAwesomeIcon icon={faArrowLeft} className="me-1" /> Retour au choix du rôle</button>
                            <Button type="submit" className="btn btn-primary my-1"
                                disabled={registerAttempt.name === "" || (registerAttempt.logo == "" || registerAttempt.logo == null) || !checkPhoneNumber(registerAttempt.phone) || !checkEmail(registerAttempt.email)} onClick={nextStep}>Suivant <FontAwesomeIcon icon={faArrowRight} className="ms-1" /></Button>
                        </div>
                    </form>
                </Step>
                {/* <Step>
                <form className="" id="MemberDataForm">
                    
                </form>
            </Step> */}
                {/* <Step>
                <form id="ContactDataForm" onSubmit={contactDataFormSubmit}>
                    
                    <div className="d-flex flex-row justify-content-between mb-5">
                        <Button className="btn btn-primary my-1" onClick={prevStep}><FontAwesomeIcon icon={faArrowLeft} className="me-1" /> Précédent</Button>
                        <Button className="btn btn-primary my-1" onClick={nextStep}
                            disabled={ registerAttempt.email === "" }
                            type="submit">Suivant <FontAwesomeIcon icon={faArrowRight} /></Button>
                    </div>
                </form>
            </Step> */}
                {/* <Step>
                <label for="Nom">Adhérer au projet</label>
                <Select name="association_id" onChange={handleAssocChange} placeholder={"Sélectionnez votre association !"} options={
                    lightAssociations.map((item) =>
                    ({
                        label: item.name,
                        value: item.id
                    }))
                }/>
                <div className="d-flex flex-row justify-content-between mt-2 mb-5">
                    <Button className="btn btn-secondary my-1" onClick={prevStep}><FontAwesomeIcon icon={faArrowLeft}  className="me-1" /> Précédent</Button>
                    <Button className="btn btn-primary my-1" disabled={ false} onClick={nextStep}>Suivant <FontAwesomeIcon icon={faArrowRight} className="ms-1"/></Button>
                </div>
            </Step> */}
                <Step>
                    <form id="finalStepForm" onSubmit={finalStepForm}>
                        <div className="form-floating">
                            <label for="Password">Mot de passe</label>
                            <input type="password" name="password" className="form-control" value={registerAttempt.password}
                                onChange={handleChange} id="Password" placeholder="Votre mot de passe"></input>
                            
                        </div>
                        <span className="d-flex text-secondary my-2 fw-bold fs-7">Votre mot de passe doit contenir au moins 8 caractères. Au moins 1 majuscule, 1 miniscule et des chiffres.</span>
                        <div className="form-floating mb-3">
                            <label for="Password_Confirm">Confirmer le mot de passe</label>
                            <input type="password" placeholder="Confirmation du mot de passe" name="password_confirmation" value={registerAttempt.password_confirmation}
                                onChange={handleChange} className="form-control" id="Password_Confirm" ></input>
                        </div>
                        <div className="d-flex flex-row justify-content-between mb-5">
                            <Button className="btn btn-primary my-1" type="button" onClick={prevStep}><FontAwesomeIcon icon={faArrowLeft} className="me-1" /> Précédent</Button>
                            <button className="btn btn-success my-1 d-flex align-items-center justify-content-center" type="submit"
                                disabled={registerAttempt.password !== registerAttempt.password_confirmation || !checkPasswordStrong(registerAttempt.password) || registerAttempt.requestSent}
                            >{registerAttempt.requestSent && (<LoadingSpinner className="me-2" style={{ width: "25px", height: "25px" }} />)} Confirmer</button>
                        </div>
                    </form>
                </Step>
                <Step>
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
                            <Button className="FullWidth btn btn-primary my-1" type="button"> Retourner à l'Accueil</Button>
                        </NavLink>
                    </div>
                </Step>
            </Stepper>
        </div>
    )
}

export default SignUp
