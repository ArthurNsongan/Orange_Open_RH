import { faArrowLeft, faArrowRight, faCheckCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'
import Button from '../../components/Button'
import { changePassword, changePasswordCheck, resetPasswordProcess } from '../../services/API'
import LoadingSpinner from '../../components/LoadingSpinner'
import Stepper, {Step} from '../../components/Stepper'
import { useHistory, useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Steps } from 'antd'
import { checkPasswordStrong } from '../../config/constants'

const route = require("../../utils/route.json")

function ResetPassword(props) {

    const [currentStep, setCurrentStep] = useState(1)
    const [steps, setSteps] = useState(2)
    const [errors, setErrors] = useState({
        password:[],
        temp_password: [],
    })

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
        temp_password: "",
        email: "",
        //password_token: ""
    })

    const prevStep = () => {
        if(requestSent === true) {
            setRequestSent(false);
        }
        if(currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const nextStep = () => {
        if(requestSent === true) {
            setRequestSent(false);
        }
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
        let errorsTmp = { ...errors }
        errorsTmp.password = []
        if(name === "password_confirmation" && 
            resetAttempt.password != resetAttempt.password_confirmation) {
                errorsTmp.password.push("Vos mots de passe ne correspondent pas.")
        }
        setErrors(errorsTmp)
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

/*     const checkTempPassword = (e) => {
        e.preventDefault()
        setRequestSent(true)
        changePasswordCheck({ email: resetAttempt.email, temp_password: resetAttempt.temp_password}, (response) => {
            nextStep()
        }, (exception) => {
            toast.error("Erreur au niveau du serveur")
        })
        nextStep()
    } */

    const resetPassword = (e) => {
        e.preventDefault();
        changePassword(resetAttempt, (response) => {
            nextStep();
            if(response.data.success) {
                toast.success(<h6>{response.data?.success}</h6>)
            }
        }, (exception) => {
            toast.error("Erreur au niveau du serveur")  
        });
    }

    useEffect(() => {
        try {
            const { email, temp_password } = history.location.state;
            alert(email + " - " + temp_password);
            setResetAttempt({...resetAttempt, email: email, temp_password: temp_password})
        } catch (error) {
            console.log(error)
        }
    }, [])

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
                            <h5 className="text-center h5">Mot de Passe</h5>
                            <NavLink to={route.front.home.link}>
                                <span className="h3 text-primary headingFunPrim contentCenter fw-bold">Challenge Solidarité</span>
                            </NavLink>
                        </div>
                        <div id="Login" className="px-2">
                            <Steps className="mb-3 stepIndicator" current={currentStep - 1}>
                                <Steps.Step titles="Informations Personnelles" />
                                <Steps.Step titles="Choix de l'association" />
                            </Steps>
                            <Stepper currentStep={currentStep}>
                                {/* <Step>
                                    <form id="Step-3" onSubmit={checkTempPassword}>
                                        <div className="form-floating mb-3">
                                            <label for="Password">Votre email : </label>
                                            <h4>{ resetAttempt.email }</h4>
                                        </div>
                                        <p className="text-center fs-5">Veuillez saisir votre mot de passe temporaire : </p>
                                        <div className="form-floating mb-3">
                                            <label for="Password">Mot de passe</label>
                                            <input type="password" className="form-control" required value={resetAttempt.temp_password} name="temp_password" id="Password" onChange={handleChange} placeholder="Votre mot de passe"></input>
                                            <div className="invalid-feedback">
                                            {
                                                errors.temp_password.map((item) => (
                                                    <><span className="d-flex">{item}</span></>
                                                ))
                                            }
                                            </div>
                                        </div>
                                        <div className="mt-5 mb-3">
                                            <button className="FullWidth btn btn-primary my-1 h6" type="submit"
                                                disabled={ (requestSent && currentStep === 1) || resetAttempt.temp_password.length < 8} >
                                                { (requestSent && currentStep === 3) && (<LoadingSpinner className="me-2" style={{width: "25px", height: "25px"}} />) }  Confirmer</button>
                                        </div>
                                    </form>
                                </Step> */}
                                <Step>
                                    <form id="Step-3" onSubmit={resetPassword} >
                                        <p className="text-center fs-5">Veuillez redéfinir votre mot de passe : </p>
                                        <span className="d-flex text-secondary my-2 fw-bold fs-7">Votre mot de passe doit contenir au moins 8 caractères. Au moins 1 majuscule, 1 miniscule et des chiffres.</span>
                                        <div className="form-floating mb-3">
                                            <label for="Password">Mot de passe</label>
                                            <input type="password" className={`form-control ${errors.password.length > 0 && "is-invalid"}`} 
                                                required value={resetAttempt.password}  
                                                name="password" id="Password" 
                                                onChange={handleChange} placeholder="Votre mot de passe"/>
                                            <div className="invalid-feedback">
                                            {
                                                errors.password.map((item) => (
                                                    <><span className="d-flex">{item}</span></>
                                                ))
                                            }
                                            </div>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <label for="Password">Confirmation</label>
                                            <input type="password" className="form-control" required value={resetAttempt.password_confirmation}  name="password_confirmation" id="PasswordConfirm" onChange={handleChange} placeholder="Votre mot de passe"></input>
                                        </div>
                                        <div className="mt-5 mb-3">
                                            <button className="FullWidth btn btn-primary my-1 h6" type="submit"
                                                disabled={ (requestSent && currentStep === 1) || ( resetAttempt.password !== resetAttempt.password_confirmation || !checkPasswordStrong(resetAttempt.password))} >
                                                { (requestSent && currentStep === 3) && (<LoadingSpinner className="me-2" style={{width: "25px", height: "25px"}} />) }  Confirmer</button>
                                        </div>
                                    </form>
                                </Step>
                                <Step>
                                    <div className="row">
                                        <h2 className="text-center">Mot de passe modifié avec succès</h2>
                                        <h3 className="text-center text-primary"><FontAwesomeIcon icon={faCheckCircle} className="fa-3x" /></h3>
                                        <div className="mt-5 mb-3">
                                            <NavLink className="FullWidth btn btn-dark my-1 h6" to={route.auth.login.link}> Se connecter</NavLink>
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

export default ResetPassword
