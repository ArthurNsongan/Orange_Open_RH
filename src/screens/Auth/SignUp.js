import { faArrowLeft, faArrowRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Select from 'react-select'
import Button from '../../components/Button'
import Stepper, {Step} from '../../components/Stepper'

function SignUp(props) {
    const [currentStep, setCurrentStep] = useState(1)
    const [steps, setSteps] = useState(4)

    const [registerAttempt, setRegisterAttempt] = useState({
        name: "",
        firstname: "",
        email: "",
        maritalStatus: "",
        OMAccountNumber: null,
        association: "",
        association_id: "",
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
        let { name, datalist, value } = e.target
        let registerAttemptTmp = { ...registerAttempt }
        console.log(e.target)
        registerAttemptTmp[name] = value
        setRegisterAttempt(registerAttemptTmp);
        console.log(name + " : " + value )
        console.log(registerAttempt);
    }

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
                                    <form className="">
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
                                                <option value="Célibataire">Célibataire</option>
                                                <option value="Marié(e)">Marié(e)</option>
                                                <option value="Veuf/Veuve">Veuf / Veuve</option>
                                            </select>
                                            <label for="maritalStatus">Status de Mariage</label>
                                        </div>
                                        <div className="mb-5">
                                            <Button type="button" disabled={ registerAttempt.name === "" && registerAttempt.firstname === ""
                                                && registerAttempt.maritalStatus === "" } 
                                                className="FullWidth btn btn-primary-2" onClick={nextStep}>Suivant <FontAwesomeIcon icon={faArrowRight} /></Button>
                                        </div>
                                    </form>
                                </Step>
                                <Step step={2}>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" pattern="[0-9]*"  value={registerAttempt.OMAccountNumber} onChange={handleChange} id="OMAccountNumber" name="OMAccountNumber"></input>
                                        <label for="Email">Numéro de Téléphone (avec compte Orange Money)</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control"  value={registerAttempt.email} onChange={handleChange} id="Email" name="email" placeholder="Ex: votrenom@gmail.com"></input>
                                        <label for="Email">E-mail</label>
                                    </div>
                                    <div className="mb-5">
                                        <Button className="FullWidth btn btn-primary text-white my-1"><FontAwesomeIcon icon={faArrowLeft} /> Précédent</Button>
                                        <Button className="FullWidth btn btn-secondary my-1" onClick={nextStep}>Suivant <FontAwesomeIcon icon={faArrowRight} /></Button>
                                    </div>
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
                                    <Select name="association_id" onChange={handleChange} options={[{label:"Association des Femmes Vaillantes", value: 2},{label:"Ordre des Ingénieurs", id: 3}]}/>
                                        
                                        {/* // .map(item => (
                                        //     { value: item.id, label: item.name}
                                        // )) */}
                                    <div className="mt-2 mb-5">
                                        <Button className="FullWidth btn btn-primary text-white my-1"><FontAwesomeIcon icon={faArrowLeft} /> Précédent</Button>
                                        <Button className="FullWidth btn btn-secondary my-1" onClick={nextStep}>Suivant <FontAwesomeIcon icon={faArrowRight} /></Button>
                                    </div>
                                </Step>
                                <Step step={4}>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" id="Password" placeholder="Votre mot de passe"></input>
                                        <label for="Password">Mot de passe</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" id="Password" placeholder="Votre mot de passe"></input>
                                        <label for="Password">Confirmer le mot de passe</label>
                                    </div>
                                    <div className="mb-5">
                                        <Button className="FullWidth btn btn-primary text-white my-1"><FontAwesomeIcon icon={faArrowLeft} /> Précédent</Button>
                                        <Button className="FullWidth btn btn-secondary my-1">Suivant <FontAwesomeIcon icon={faArrowRight} /></Button>
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
