import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '../../components/Button'
import LoadingSpinner from '../../components/LoadingSpinner'
import Stepper, {Step} from '../../components/Stepper'
import { passwordValidation } from '../../config/constants'
import { resendTwoFactorCode, userLogin, verifyTwoFactorCode } from '../../services/API'
import { isExpired, decodeToken } from 'react-jwt'
import { setAuthUser } from '../../services/Auth'
import { useHistory } from 'react-router'
import { timers } from 'jquery'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const route = require("../../utils/route.json")

function Login(props) {

    const [currentStep, setCurrentStep] = useState(1)
    const [steps, setSteps] = useState(3)
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

    const [loginAttemp, setLoginAttemp] = useState({
        login: "",
        password:"",
        code: "",
        first_factor: false,
        two_factor: false,
        token: "",
        user: {},
        roles: []
    })

    const twoFactorAuthValidate = () => {
        setAuthUser(loginAttemp.user, loginAttemp.token, true, loginAttemp.roles)
    };

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

    const loginRef = useRef()
    const passwordRef = useRef()

    const loginSectionFormSubmit = (e) => {
        e.preventDefault();
        // let isValid = false
        // const form = e.target
        if( passwordValidation(passwordRef.current.value))
            console.log(passwordRef.current.value)
        else
            return false;

        userLogin(loginAttemp.login, loginAttemp.password, 
        (response) => {
            const { access_token, user } = response.data
            let decodedToken = decodeToken(access_token)
            console.log(isExpired(access_token))
            setLoginAttemp({...loginAttemp, token: access_token, first_factor: true, user: user })
            console.log(decodedToken)
            nextStep();
        }, (response) => { console.log("Error", response.response.data); setAuthError(true, response.data.error)})
    }

    const secondFactorFormSubmit = (e) => {
        e.preventDefault()
        setLoginAttemp({...loginAttemp, two_factor: true})
        verifyTwoFactorCode(loginAttemp.code, loginAttemp.token,
            (response) => { nextStep(); setTimeout( () => { twoFactorAuthValidate(); history.push(route.front.home.link)}) }, 
            (response) => { 
                console.log(response); 
                if(response.status === 400) {
                    setCodeError(true)
                }
            }
        )
    } 

    const handleChange = (e) => {
        let { name, value } = e.target
        let loginAttempTemp = { ...loginAttemp }
        loginAttempTemp[name] = value
        setLoginAttemp(loginAttempTemp);
        console.log(name + " : " + value )
    }

    const resendNewCode = () => {
        timer == 0 ?
        resendTwoFactorCode( loginAttemp.token,
            (response) => { console.log(response.data); setTimer(120) },
            (exception) => { console.log(exception.response.data)} ) : console.log("Timer still going")
    }

    useEffect(() => { setSteps(steps)}, [steps])

    useEffect(() => { console.log(timer); if(timer > 0) { setTimeout(() => setTimer(timer - 1), 1000) } }, [timer])

    const { codeError, authError, codeErrorMessage, authErrorMessage } = errors

    return (
        <section className="AuthSection bg-secondary-2 w-100">
            <Helmet title="Connexion - Challenge Solidarité"/>
            <div className="container">
                <div className="row min-vh-100 align-items-center justify-content-center">
                    <div className="col-lg-6 bg-white ">
                        <div className="d-flex my-5 flex-column align-items-center justify-content-center">
                            <h5 className="text-center h5">Connexion à </h5>
                            <span className="h3 text-primary-2 headingFunPrim contentCenter fw-bold">Challenge Solidarité</span>
                        </div>
                        <div id="Login" className="px-2">
                            <Stepper currentStep={currentStep}>
                                <Step step={1}>
                                    <form id="Step-1" onSubmit={loginSectionFormSubmit}>
                                        <div className="form-floating mb-3">
                                            <input type="email" className="form-control" ref={loginRef} required value={loginAttemp.login} name="login" id="Login" onChange={handleChange} placeholder="Ex: votrenom@gmail.com"></input>
                                            <label for="Login">E-mail</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="password" className="form-control" ref={passwordRef} required value={loginAttemp.password}  name="password" id="Password" onChange={handleChange} placeholder="Votre mot de passe"></input>
                                            <label for="Password">Mot de passe</label>
                                        </div>
                                        { authError === true && ( <span className="d-block alert alert-danger">{authErrorMessage === null || authErrorMessage}</span>) }
                                        <div className="mb-5">
                                            <Button type="submit" className="FullWidth btn btn-primary">Se connecter</Button>
                                        </div>
                                        <span className="text-dark text-center d-block mb-3">Vous n'avez pas de compte ? <NavLink className="text-primary fw-bold" to={route.auth.signup.link}>Créez votre compte</NavLink></span>
                                    </form>
                                </Step>
                                <Step step={2}>
                                    <form id="Step-2" onSubmit={secondFactorFormSubmit} >
                                        <div className="form-floating mb-3">
                                            <input type="email" className="form-control" id="Email" placeholder="Ex: votrenom@gmail.com" value={loginAttemp.login}></input>
                                            <label for="Email">E-mail</label>
                                        </div>
                                        <p>Un code vous a été envoyé par mail. Saisissez-le ici :</p>
                                        <div className="row">
                                            <div className="col-9 pe-0">
                                                <input type="text" className={`form-control pb-2 ${codeError === true && "is-invalid"}`} name="code" onChange={handleChange} required id="SecretCode" maxLength={6} placeholder="Entrez ce code"></input>
                                                { codeError === false ? "" : <span className="text-warning">{codeErrorMessage === null || codeErrorMessage}</span> }
                                            </div>
                                            <div className="col-3 ps-0">
                                                <div className="">
                                                    <Button className="FullWidth btn btn-secondary" type="submit" disabled={loginAttemp.code.length !== 6}>Valider</Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex w-100 h6 my-4 text-primary justify-content-center fw-bold text-center">
                                            <span onClick={resendNewCode} role="button">Envoyez un nouveau code</span>
                                            <br/>
                                            <span role="button" className="fs-5">Encore { timer != 0 && timer} seconde(s)</span>
                                        </div>
                                        <div className="mt-5 mb-3">
                                            <Button className="FullWidth btn btn-primary text-white my-1 h6" onClick={prevStep} ><FontAwesomeIcon icon={faArrowLeft} /> Précédent</Button>
                                        </div>
                                    </form>
                                </Step>
                                <Step step={3}>
                                    <div className="Step-3">
                                        <div className="d-flex my-4 text-primary flex-column align-items-center">
                                            <span className="h4 fw-bold">Authentification en cours ...</span>
                                            <LoadingSpinner style={{width: "100px", height: "100px"}} className="my-3"/>
                                        </div>
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

const mapStateToProps = (state) => ({
    loading: state.logInReducer.loading,
    result: state.logInReducer.result,
    error: state.logInReducer.error
})

const mapDispatchToProps = dispatch => bindActionCreators({
    userLogin
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
