import { faArrowLeft, faArrowRight, faCheckCircle, faHome, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'
import Button from '../../components/Button'
import { resendTwoFactorCode, resetPasswordInit, resetPasswordProcess, verifyTwoFactorCode } from '../../services/API'
import LoadingSpinner from '../../components/LoadingSpinner'
import Stepper, {Step} from '../../components/Stepper'
import { useHistory } from 'react-router'
import { NavLink } from 'react-router-dom'

const route = require("../../utils/route.json")

function ForgotPassword(props) {

    const [currentStep, setCurrentStep] = useState(1)
    const [steps, setSteps] = useState(4)
    const [errors, setErrors] = useState({
        codeError: false,
        codeErrorMessage:null,
        authError: false,
        authErrorMessage: null
    })

    const setCodeError = (bool, message = null) => { setErrors({...errors, codeError: bool, codeErrorMessage: message })}
    const setAuthError = (bool, message = null) => { setErrors({...errors, authError: bool, authErrorMessage: message })}

    const history = useHistory();
    const [timer, setTimer] = useState(0)

    const [requestSent, setRequestSent] = useState(false)

    // const launchTimer = () => {
    //     setTimer(120);
    // }

    // const startTimer = () => {
    //     setInterval( () => { 
    //         const timerTmp = timer - 1
    //         console.log("TimerTemp", timerTmp)
    //         setTimer(parseInt(timerTmp)) 
    //     }, 1000);
    // }

    // const stopTimer = () => {
    //     clearInterval(startTimer);
    // }

    const [resetAttempt, setResetAttempt] = useState({
        password:"",
        password_confirmation: "",
        email: "",
        code: "",
        serverCode: ""
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

    // const jumpToStep = (step) => {
    //     setCurrentStep(step);
    // }

    const handleChange = (e) => {
        let { name, value } = e.target
        let resetAttemptTmp = { ...resetAttempt }
        resetAttemptTmp[name] = value
        setResetAttempt(resetAttemptTmp);
        console.log(name + " : " + value )
    }

    const resendNewCode = () => {
        // timer === 0 ?
        // resendTwoFactorCode( loginAttemp.token,
        //     (response) => { console.log(response.data); setTimer(120) },
        //     (exception) => { console.log(exception.response.data)} ) : console.log("Timer still going")
    }

    const initCode = (e) => {
        e.preventDefault();
        resetPasswordInit(resetAttempt.email, (response) => {
            console.log("initCode", response.data);
        }, (exception) => {
            console.log(exception);
        });
        nextStep();
    }

    const codeSubmit = (e) => {
        e.preventDefault();
        if(resetAttempt.code === resetAttempt.serverCode)
        nextStep();
    }

    const resetPassword = (e) => {
        e.preventDefault();
        resetPasswordProcess(resetAttempt.email, resetAttempt.password, resetAttempt.serverCode, resetAttempt.code,
            (response) => {
                console.log(response.data);
            }, (exception) => {
                console.log(exception);
            })
        nextStep();
    }

    useEffect(() => { setSteps(steps)}, [steps])

    useEffect(() => { console.log(timer); if(timer > 0) { setTimeout(() => setTimer(timer - 1), 1000) } }, [timer])

    const { codeError, authError, codeErrorMessage, authErrorMessage } = errors

    return (
        <>
        <section className="AuthSection bg-light w-100">
            <Helmet title="Connexion - Challenge Solidarité"/>
            <div className="container">
                <div className="row min-vh-100 align-items-center justify-content-center">
                    <div className="col-lg-6 bg-white ">
                        <div className="d-flex my-5 flex-column align-items-center justify-content-center">
                            <h5 className="text-center h5">Mot de Passe Oublié</h5>
                            <span className="h3 text-primary headingFunPrim contentCenter fw-bold">Challenge Solidarité</span>
                        </div>
                        <div id="Login" className="px-2">
                            <Stepper currentStep={currentStep}>
                                <Step step={1}>
                                    <form id="Step-1" onSubmit={initCode}>
                                        <div className="form-floating mb-3">
                                            <input type="email" className="form-control" required value={resetAttempt.email} name="email" id="Login" onChange={handleChange} placeholder="Ex: votrenom@gmail.com"></input>
                                            <label for="Login">E-mail</label>
                                        </div>
                                        <div className="my-3">
                                            <Button className="FullWidth btn btn-primary my-1 h6" type="submit" >Suivant<FontAwesomeIcon icon={faArrowRight} className="ms-2" /> </Button>
                                        </div>
                                    </form>
                                </Step>
                                {/* <Step step={2}>
                                    <form id="Step-2" onSubmit={codeSubmit}>
                                        <p>Votre email : <b>{resetAttempt.email}</b></p>
                                        <p>Un code vous a été envoyé par mail. Saisissez-le ici :</p>
                                        <div className="row">
                                            <div className="col-12">
                                                <input type="text" className={`form-control pb-2 ${codeError === true && "is-invalid"}`} name="code" onChange={handleChange} required id="SecretCode" maxLength={32} placeholder="Entrez ce code"></input>
                                                { codeError === false ? "" : <span className="text-warning">{codeErrorMessage === null || codeErrorMessage}</span> }
                                            </div>
                                        </div>
                                        <div className="d-flex w-100 h6 my-4 text-primary flex-column align-items-center fw-bold text-center">
                                            <span onClick={resendNewCode} role="button">Envoyez un nouveau code</span>
                                            <br/>
                                            { timer !== 0 && <span role="button" className="fs-6 d-block">Encore { timer !== 0 && timer} seconde(s)</span>}
                                        </div>
                                        { authError === true && ( 
                                            <span className="d-flex align-items-center alert alert-danger">
                                                <FontAwesomeIcon icon={faInfoCircle} className="me-2 fa-2x" /> 
                                                {authErrorMessage === null || authErrorMessage}
                                            </span>) }
                                        <div className="mb-5">
                                            <Button className="FullWidth btn btn-dark my-1 h6" onClick={prevStep} ><FontAwesomeIcon icon={faArrowLeft} className="me-1" /> Précédent</Button>
                                            <Button type="submit" 
                                                className="FullWidth btn btn-primary d-flex justify-content-center align-items-center"
                                                disabled={ requestSent && currentStep === 2}
                                            >{ (requestSent && currentStep === 2) && (<LoadingSpinner className="me-2" style={{width: "25px", height: "25px"}} />) } Valider</Button>
                                        </div>
                                    </form>
                                </Step>
                                <Step step={3}>
                                    <form id="Step-3" onSubmit={resetPassword} >
                                        <div className="form-floating mb-3">
                                            <input type="password" className="form-control" required value={resetAttempt.password}  name="password" id="Password" onChange={handleChange} placeholder="Votre mot de passe"></input>
                                            <label for="Password">Mot de passe</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="password" className="form-control" required value={resetAttempt.password_confirmation}  name="password_confirmation" id="PasswordConfirm" onChange={handleChange} placeholder="Votre mot de passe"></input>
                                            <label for="Password">Confirmation</label>
                                        </div>
                                        <div className="mt-5 mb-3">
                                            <button className="FullWidth btn btn-dark my-1 h6" onClick={prevStep} ><FontAwesomeIcon icon={faArrowLeft} /> Précédent</button>
                                            <button className="FullWidth btn btn-primary my-1 h6" type="submit"
                                                disabled={ (requestSent && currentStep === 3) || ( resetAttempt.password !== resetAttempt.password_confirmation || resetAttempt.password.length <= 8)} >
                                                { (requestSent && currentStep === 3) && (<LoadingSpinner className="me-2" style={{width: "25px", height: "25px"}} />) }  Confirmer</button>
                                        </div>
                                    </form>
                                </Step> */}
                                <Step step={2}>
                                    <div className="row">
                                        <h2 className="text-center">Mail envoyé</h2>
                                        <h3 className="text-center text-primary"><FontAwesomeIcon icon={faCheckCircle} className="fa-3x" /></h3>
                                        <div className="mt-2 fs-4 mb-5 text-center">
                                            Un mail vous a été envoyé avec le lien de redéfinition du mot de passe.
                                            <NavLink className="FullWidth btn btn-dark my-1 h6" to={route.front.home.link}><FontAwesomeIcon icon={faHome} className="me-1" />Accueil </NavLink>
                                        </div>
                                    </div>
                                </Step>
                            </Stepper>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default ForgotPassword
