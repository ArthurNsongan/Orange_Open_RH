import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useLocation, useParams } from 'react-router'
import { NavLink } from 'react-router-dom';
import Button from '../../../components/Button';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ProgressBar from '../../../components/ProgressBar';
import apiRoutes from '../../../config/apiConfig';
import Images from '../../../utils/images';
import { formatThousandsNumber } from '../../../config/constants'
import Interweave from 'interweave'
import { getAccessToken, initPayment } from '../../../services/API';
import { toast } from 'react-toastify';
import { getConnectedUser, getRoles, getUserPhoneAccountNumber, hasRole, isAssocMember, IsConnected } from '../../../services/Auth';
import { partnerJoinProject } from '../../../services/partnerService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

let route = require('../../../utils/route.json')
const _ = require("lodash")

function ProjectDetail(props) {

    const { projetId, projetName } = useParams();

    const [project, setProject] = useState({ stat: {}, })

    const projet = {
        "association": "L'ordre des médécins",
        "associationId": 2,
        "contributions": "4 000 000",
        "percent": "40",
        "contributionNeeded": "12 000 000",
        "contributors": "1250"
    }
    
    console.log(projetId + " - " + projetName)

    const headingStyle = {
        "color": "#ff7900",
        "fontWeight": "600",
    }

    const userNumber = getUserPhoneAccountNumber()

    const location = useLocation();

    const [animate, setAnimate] = useState(false)

    const [loaded, setLoaded] = useState(false)

    const [contributionProcess, setContributionProcess] = useState({
        OmAccountNumber:  userNumber ? userNumber : "",
        processing: false,
        step: 0,
        accessToken: "",
        amount: "1",
    })

    const [projectJoining, setProjectJoining] = useState({
        requestSent: null,
        status: null,
    });

    const joinProject = () => {
        setProjectJoining({...projectJoining, requestSent: "PENDING"});
        partnerJoinProject(project.id, (response) => {
            setProjectJoining({...projectJoining, requestSent: true});
            // toast.success("Vous avez rejoint ce projet en tant que partenaire.");
        }, (exception) => {
            toast.error("Une erreur a été rencontrée !!!");
            setProjectJoining({...projectJoining, requestSent: null });
        });
    }

    const handleProcessChange = (e) => {
        let contributionTmp = contributionProcess;
        contributionTmp[e.target.name] = e.target.value;
        setContributionProcess({...contributionProcess, contributionTmp});
        console.log(contributionTmp)
        console.log("Input Length : " + e.target.value.length + " is a Number : " + !isNaN(e.target.value))
    }

    const getProject = () => {
        setLoaded(false)
        axios.get(`${apiRoutes.ProjectsURL}/${projetId}`)
        .then( response => {
            setProject(response.data)
            let project = response.data
            // setContributionProcess({...contributionProcess, amount: response.data.contributionPerMember})
            setTimeout( () => setLoaded(true), 1000);
            // setLoaded(true)
            console.log("projectDetail",response.data);
            if( IsConnected() && getRoles().includes("partner") && project.partners.filter(item => (item.id === getConnectedUser().id )).length === 1 ) {
                setProjectJoining({...projectJoining, status: 1});
            }
        }).catch( ({response}) => { console.log(response.data)})
    }

    const preparePayment = () => {
        // alert("OmAccount Number " + contributionProcess.OmAccountNumber);
        // alert("OmAccount Number " + contributionProcess.PIN);
        setContributionProcess({...contributionProcess, processing: true})
        getAccessToken(
            (response) => {
                console.log("front", response.data);
                setContributionProcess({...contributionProcess, accessToken: response.data.data.payToken})
                initProjectPayment(response.data.data.payToken);
                // toast.success("Paiement initié avec succès.")
                setContributionProcess({...contributionProcess, processing: false, step: 1})
                // window.$("#contributionPaymentModal").modal("hide")
            },
            (exception) => {
                console.log(exception?.response);
                toast.error(exception?.response?.data?.error);
                setContributionProcess({...contributionProcess, processing: false})
            }
        );
    }

    const initProjectPayment = (accessToken) => {
        initPayment(accessToken, contributionProcess.OmAccountNumber, contributionProcess.PIN, 
            contributionProcess.amount, project.id,
            (response) => {
                console.log("initPaymentProcess", response.data);
                // toast.success("Paiement initié avec succès. Consultez votre téléphone et validez la transaction.")
                setContributionProcess({...contributionProcess, processing: false, step: 2})
            },
            (exception) => {
                console.log("initPaymentError", exception?.response);
                if(exception.response) {
                    toast.error(exception.response.data.error);
                }
                setContributionProcess({...contributionProcess, processing: false})
            });
    }

    useEffect(() => {
        getProject()
    }, [props])

    useEffect(() => {
        if( _.isEqual(project, {}) === false ) {
            // const animatedDivs = window.document.querySelectorAll(".AnimatedDiv")
            // console.log("div classes to animate in project detail page : ", animatedDivs )
            // console.log(location)
            // animatedDivs.forEach((animDiv) => {
            //     // console.log(animDiv.getBoundingClientRect().top)
            //     const topPosition = animDiv.getBoundingClientRect().top;
            //     // const clN = animDiv.className;

            //     const onScroll = () => {
            //         const scrollPosition = window.scrollY + window.innerHeight - 350;
            //         if( topPosition < scrollPosition ) {
            //             animDiv.classList.replace('AnimatedDiv', 'AnimateDiv');
            //             console.log("Elements animated !")
            //             window.removeEventListener("scroll", onScroll)
            //         }
            //     }
            //     window.addEventListener("scroll", onScroll);
                
            // })
            setTimeout( () => setAnimate(true), 1500);
        }
    }, [project, location])


    const StatCard = (props) => (
        <div className={props.className}>
            <div className="d-flex mx-0 mb-4 justify-content-center align-items-center flex-column" style = {{
                "width": "100%",
                "height": "208px",
                "boxShadow": "0px 0px 3px lightgray"
            }}>
                <div>
                    <h3 className="text-primary fw-bold">{props.title}</h3>
                    <h2 className="fw-bold">{props.number}</h2>
                </div>
            </div>
        </div>
    )

    return (
        <>
        <Helmet title={`${project.title || projetName} - Challenge Solidarité`} />
        { !loaded ? <div style={{ zIndex: "10"}} className="d-flex bg-white fixed position-fixed top-0 start-0 container min-vw-100 min-vh-100 align-items-center justify-content-center">
                <LoadingSpinner />
                <h1 className="h1 ps-3">Chargement...</h1>
            </div> : ""}
          { 
            <>
                <section className={`container relative ${!animate ? "AnimatedDiv" : "AnimateDiv"}`} style={{ "marginTop": "100px" }}>
                    <div className="row my-5">
                        <div className="col-lg-6">
                            <img className="px-3" height="auto" width="100%" alt="" src={project.image === undefined ? Images.heroImg : `${apiRoutes.StorageURL}/${project.image}`} />
                        </div>
                        <div className="col-lg-6 align-self-center">
                            <h2 className="text-primary fw-bold">{project.title}</h2>
                            <h5 className="my-3 AnimatedComponent">Par <NavLink to={`${route.front.communautes.link}/${projet.associationId}-${projet.association}`} className="fw-bold text-decoration-none text-dark">{project.holder?.name}</NavLink></h5>
                            <p className="fs-6 fw-bold">Créé le 17 Juin 2021</p>
                            <ProgressBar percent={!animate ? "0" : project?.stat?.pourcentage?.replace("%", "") } className="AnimatedComponent" />
                            <h4 style={headingStyle} className="fw-bold d-block fs-4">{`${!animate ? "" : ( project?.stat?.pourcentage?.includes("%") ? project?.stat?.pourcentage : project?.stat?.pourcentage + "%") }`}</h4>
                            <div className="py-2 text-">
                                <h4 className="fw-bold mb-1">{ formatThousandsNumber(project.cost - project?.stat?.reste) } F CFA collectés</h4>
                                <h5 className="text-gray fw-normal AnimatedComponent">sur {formatThousandsNumber(project.cost == null ? 0 : project.cost)} F CFA</h5>
                            </div>
                            { ( IsConnected() && hasRole("partner") ) && 
                                <button data-bs-target="#projectJoinPartnerModal" data-bs-toggle="modal" className={`fs-5 FullWidth  mb-2 d-flex align-items-center ${ projectJoining.status !== 1 ? "btn btn-dark" : "border-0 btn bg-supporting-blue" }`} >
                                    { projectJoining.status === 1 && <FontAwesomeIcon className="me-1" icon={faCheck} />}
                                    { projectJoining.status !== 1 ? "J'adhère au projet" : "Vous êtes partenaire à ce projet"}
                                </button>  }
                            { ((hasRole("partner") && projectJoining.status === 1) || isAssocMember(project?.holder?.id) || hasRole("supervisor") ) && <button data-bs-target="#contributionPaymentModal" className="fs-5 FullWidth btn btn-secondary" data-bs-toggle="modal">Je contribue via Orange Money</button>}
                        </div>
                    </div>
                </section>

                <section className="container AnimatedDiv">
                    <div className="row">
                        <StatCard className="col-lg-4"
                            number={`${formatThousandsNumber(project.cost - project?.stat?.reste)} F CFA`}
                            title="Entrées" />
                        <StatCard className="col-lg-4"
                            number={formatThousandsNumber(project?.stat?.contributions)}
                            title="Contributions" />
                        <StatCard className="col-lg-4"
                            number={`${formatThousandsNumber(project?.stat?.reste)} F CFA`}
                            title="Montant manquant" />
                    </div>
                </section>

                <section className="container AnimatedDiv mb-4">
                    <div className="row my-4">
                        <h2 className="fw-bold mb-5 headingFunPrim">Description du projet</h2>
                        <Interweave content={project.description} />
                    </div>
                </section>

                <section className="container AnimatedDiv mb-4">
                    <div className="row my-4">
                        <h2 className="fw-bold mb-5 headingFunPrim">Plan du projet</h2>
                        <Interweave content={project.project_plan} />
                    </div>
                </section>

                <section className="container mb-4 AnimatedDiv">
                    <div className="d-flex flex-column my-5 py-5">
                        <h2 className="fw-bold mb-5 headingFunPrim">Partenaires du projet</h2>
                        <div className="row align-items-center mt-3">
                            { project.partners != null ? project.partners.map((item, index) => (
                                <div className="col-lg-3">
                                    { item.logo != null && item.logo !== "" ?
                                        <img src={`${apiRoutes.StorageURL}/${item.logo}`} className="img-fluid" alt="LogoPartenaire__Admin"/>
                                        : <span className="h2 fw-bold">{item.name}</span>
                                    }
                                </div>
                            )) : ""}
                            {/* <div className="col-lg-3">
                                <span className="h2 fw-bold">Cimencam</span>
                            </div>
                            <div className="col-lg-3">
                                <span className="h2 fw-bold">Orca</span>
                            </div>
                            <div className="col-lg-3">
                                <span className="h2 fw-bold">TAC</span>
                            </div>
                            <div className="col-lg-3">
                                <span className="h2 fw-bold">FOKOU</span> 
                            </div>*/}
                        </div>
                    </div>
                </section>

                <div className="modal fade rounded-none" id="contributionPaymentModal" tabIndex="-1" aria-labelledby="" aria-hidden="true">
                    <div className="modal-dialog rounded-none modal-lg modal-dialog-centered">                
                        <div className="modal-content">
                            <div className="modal-body">
                                <div class="row justify-content-center">
                                    <div className="col-lg-12 d-flex align-items-center justify-content-between">
                                            <h2 className="text-center fw-bold">Paiement sécurisé via Orange Money</h2>
                                            <img src={Images.orangeMoney} width="150" height="auto" alt="Logo Orange Money" />
                                    </div>
                                </div>
                                { contributionProcess.step === 0 && 
                                    <>
                                        <div class="row justify-content-center">
                                            <div className="d-flex flex-column mb-3 mt-4">
                                                <label className="d-block mb-2 h6">Numéro Orange Money</label>
                                                <input className="form-control" readonly={userNumber != undefined} type="text" name="OmAccountNumber" value={userNumber || ""} placeholder="" />
                                                <p></p>
                                            </div>
                                            <div className="d-flex flex-column mb-3">
                                                <label className="d-block mb-2 h6">Montant</label>
                                                <input className="form-control" onChange={handleProcessChange} type="number" min="0" name="amount" value={contributionProcess.amount} placeholder="Montant de votre choix" />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                            <button type="button" className="btn btn-OM d-flex align-items-center" 
                                                disabled={contributionProcess.processing === true } 
                                                onClick={preparePayment}>
                                                    { (contributionProcess.processing === true ) && (<LoadingSpinner className="me-2" style={{width: "25px", height: "25px"}} />) } Confirmer le paiement</button>
                                        </div>
                                    </>
                                }
                                { contributionProcess.step === 1 && 
                                    <>
                                        <div class="row justify-content-center">
                                            <h2 className="text-center fw-bold col-lg-6">Initiation du paiement</h2><br />
                                            <h6 className="text-center">Numéro : <span className="text-OM fw-bold">{contributionProcess.OmAccountNumber}</span></h6>
                                            <h6 className="text-center">Montant : <span className="text-OM fw-bold">{contributionProcess.amount} F CFA</span></h6>
                                            <div className="text-center">
                                                <LoadingSpinner />
                                            </div><br/>
                                            <p className="col-lg-6">Consultez votre téléphone, vous allez recevoir une alerte pour confirmer la transaction. Merci.</p>
                                        </div>
                                    </>
                                }
                                { contributionProcess.step === 2 && 
                                    <>
                                        <div class="row justify-content-center">
                                            <h2 className="text-center fw-bold col-lg-6">Paiement initié avec succès</h2>
                                            <h6 className="text-center">Numéro : <span className="text-OM fw-bold">{contributionProcess.OmAccountNumber}</span></h6>
                                            <h6 className="text-center">Montant : <span className="text-OM fw-bold">{contributionProcess.amount} F CFA</span></h6>
                                            <p className="col-lg-6">Confirmer la transaction Orange Money en saisissant votre code secret. Merci.</p>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Terminer</button>
                                            <button type="button" className="btn btn-OM" onClick={()=>{ setContributionProcess({...contributionProcess, step : 0}) }}>Initier un nouveau paiement</button>
                                            {/* <button type="button" className="btn btn-OM d-flex align-items-center" 
                                                disabled={contributionProcess.processing === true || contributionProcess.OmAccountNumber.length !== 9 || isNaN(parseInt(contributionProcess.OmAccountNumber)) } 
                                                onClick={preparePayment}>
                                                    { (contributionProcess.processing === true ) && (<LoadingSpinner className="me-2" style={{width: "25px", height: "25px"}} />) } Confirmer le paiement</button> */}
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="modal fade rounded-none" id="contributionPaymentModal" tabIndex="-1" aria-labelledby="" aria-hidden="true">
                    <div className="modal-dialog rounded-none modal-lg modal-dialog-centered">                
                        <div className="modal-content">
                            <div className="modal-body">
                                <div class="row justify-content-center">
                                    <div className="col-lg-12 d-flex align-items-center justify-content-between">
                                            <h2 className="text-center fw-bold">Paiement sécurisé via Orange Money</h2>
                                            <img src={Images.orangeMoney} width="150" height="auto" alt="Logo Orange Money" />
                                    </div>
                                </div>
                                { contributionProcess.step === 0 && 
                                    <>
                                        <div class="row justify-content-center">
                                            <div className="d-flex flex-column mb-3 mt-4">
                                                <label className="d-block mb-2 h6">Numéro Orange Money</label>
                                                <input className="form-control" readonly type="text" name="OmAccountNumber" value={userNumber} placeholder="" />
                                                <p></p>
                                            </div>
                                            <div className="d-flex flex-column mb-3">
                                                <label className="d-block mb-2 h6">Montant</label>
                                                <input className="form-control" onChange={handleProcessChange} type="number" min="0" name="amount" value={contributionProcess.amount} placeholder="Montant de votre choix" />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                            <button type="button" className="btn btn-OM d-flex align-items-center" 
                                                disabled={contributionProcess.processing === true || contributionProcess.OmAccountNumber.length !== 9 || isNaN(parseInt(contributionProcess.OmAccountNumber)) } 
                                                onClick={preparePayment}>
                                                    { (contributionProcess.processing === true ) && (<LoadingSpinner className="me-2" style={{width: "25px", height: "25px"}} />) } Confirmer le paiement</button>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="modal fade rounded-none" id="projectJoinPartnerModal" tabIndex="-1" aria-labelledby="" aria-hidden="true">
                    <div className="modal-dialog rounded-none modal-lg modal-dialog-centered">                
                        <div className="modal-content">
                            <div className="modal-body">
                                {
                                    projectJoining.requestSent === null ?
                                    (
                                        <div class="row justify-content-center">
                                            <div className="col-lg-12 d-flex flex-column align-items-center justify-content-center">
                                                    <h2 className="text-center mb-0 fw-bold">Accord de partenariat pour le projet :</h2>
                                                    <h3 className="text-center text-primary fw-bold">{ project.title }</h3>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12 overflow-auto" style={{ height: "300px"}}>
                                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum, veniam quam animi necessitatibus, 
                                                        consequuntur aspernatur ex laboriosam impedit quidem error nemo accusantium laudantium porro aliquid magnam. 
                                                        Rerum, beatae fuga dicta repudiandae eaque provident in consectetur exercitationem consequatur dolor. 
                                                        Nobis deleniti, sint eveniet maiores laborum placeat accusantium explicabo repellendus alias nesciunt quaerat iure praesentium aliquam iusto totam, 
                                                        repellat facilis maxime earum id modi fugit voluptas voluptatem ex. Aperiam consequatur sit soluta nisi vel, 
                                                        nobis ullam reprehenderit provident deserunt mollitia necessitatibus inventore, itaque totam. 
                                                        Dolores quia rerum nesciunt amet impedit magnam debitis delectus eos sint, ex esse, dolor sapiente cum, 
                                                        hic quod? Ipsum ut voluptas, magni quia qui, dolorum nisi harum nostrum natus odit corporis molestias, 
                                                        provident rerum hic perspiciatis nulla quis iusto dolor possimus! Similique dolore, odio iusto modi quo sit 
                                                        fugiat sequi nisi maiores, minus natus delectus cupiditate in? Esse, deleniti culpa consequatur nihil perspiciatis 
                                                        soluta dolorem ab aspernatur doloribus ut repudiandae sequi voluptatibus, illum dolore natus cum deserunt obcaecati amet sapiente 
                                                        dignissimos fugit tempore! Saepe delectus praesentium temporibus sint! 
                                                        Odit tempore sint modi consectetur nemo voluptate nesciunt voluptatem quod, 
                                                        a vel unde odio. Sapiente, officiis. Praesentium ipsum quae delectus molestiae ea facere. </p>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                                <button disabled={projectJoining.requestSent === "PENDING"} onClick={ projectJoining.status === 1 || joinProject} className={`d-flex align-items-center btn btn-primary`} >
                                                    { projectJoining.requestSent === true && <LoadingSpinner className="me-1 fs-6" />}
                                                    Confirmer
                                                </button> 
                                            </div>
                                        </div>
                                ):
                                (
                                    <div className="row justify-content-center">
                                        <div className="col-lg-12 d-flex flex-column py-2 align-items-center justify-content-center">
                                                <FontAwesomeIcon icon={faCheckCircle} className="text-primary fa-3x" />
                                                <h5 className="text-center mb-0 fw-bold">Votre demande de partenariat dans le projet { project.title } a été enregistrée. Nous reviendrons vers vous dans de brefs délais.</h5>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">OK</button>
                                        </div>
                                    </div>
                                )
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </>
          }
        </>
    )
}

export default ProjectDetail