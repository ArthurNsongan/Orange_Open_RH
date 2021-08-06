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

let route = require('../../../utils/route.json')
const _ = require("lodash")

function ProjectDetail(props) {

    const { projetId, projetName } = useParams();

    const [project, setProject] = useState({})

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
        "color": "#98c013",
        "fontWeight": "600",
    }

    const location = useLocation();

    const [animate, setAnimate] = useState(false)

    const [loaded, setLoaded] = useState(false)

    const getProject = () => {
        setLoaded(false)
        axios.get(`${apiRoutes.ProjectsURL}/${projetId}`)
        .then( response => {
            setProject(response.data)
            setTimeout( () => setLoaded(true), 1000)
            // setLoaded(true)
            console.log(response.data)
        }).catch( ({response}) => { console.log(response.data)})
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
        <div 
        className={props.className}>
            <div className="d-flex mx-0 mb-4 justify-content-center align-items-center flex-column" style = {{
                "width": "100%",
                "height": "208px",
                "boxShadow": "0px 0px 3px lightgray"
            }}>
                <div>
                    <h3 className="text-primary-2 fw-bold">{props.title}</h3>
                    <h2 className="fw-bold">{props.number}</h2>
                </div>
            </div>
        </div>
    )

    return (
        <>
        <Helmet title={`${projetName} - Challenge Solidarité`} />
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
                            <h2 className="text-primary-2 fw-bold">{project.title}</h2>
                            <h5 className="my-3 AnimatedComponent">Par <NavLink to={`${route.front.communautes.link}/${projet.associationId}-${projet.association}`} className="fw-bold text-decoration-none text-dark">{project.holder}</NavLink></h5>
                            <p className="fs-6 fw-bold">Créé le 17 Juin 2021</p>
                            <ProgressBar percent={!animate ? "0" : projet.percent} className="AnimatedComponent" />
                            <h4 style={headingStyle} className="fw-bold d-block fs-4">{`${!animate ? "" : projet.percent + " %"}`}</h4>
                            <div className="py-2 text-">
                                <h4 className="fw-bold mb-1">{projet.contributions} F CFA collectés</h4>
                                <h5 className="text-gray fw-normal AnimatedComponent">sur {formatThousandsNumber(project.cost == null ? 0 : project.cost)} F CFA</h5>
                            </div>
                            <Button buttonType="fullWidth">Je participe de {formatThousandsNumber(project.contributionPerMember)} F CFA</Button>
                        </div>
                    </div>
                </section>

                <section className="container AnimatedDiv">
                    <div className="row">
                        <StatCard className="col-lg-4"
                            number={`${formatThousandsNumber(projet.contributions)} F CFA`}
                            title="Entrées" />
                        <StatCard className="col-lg-4"
                            number={formatThousandsNumber(projet.contributors)}
                            title="Contributeurs" />
                        <StatCard className="col-lg-4"
                            number={`${formatThousandsNumber(parseInt(projet.contributionNeeded.replaceAll(" ", "")) - parseInt(projet.contributions.replaceAll(" ", "")))} F CFA`}
                            title="Montant manquant" />
                    </div>
                </section>

                <section className="container AnimatedDiv mb-4">
                    <div className="row my-4">
                        <h2 className="fw-bold mb-5 headingFunPrim">Description du projet</h2>
                        <p className="lh-3 fs-6 mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <Interweave content={project.description} />
                    </div>
                </section>

                <section className="container AnimatedDiv mb-4">
                    <div className="row my-4">
                        <h2 className="fw-bold mb-5 headingFunPrim">Plan du projet</h2>
                        <p className="lh-3 fs-6 mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <Interweave content={project.project_plan} />
                    </div>
                </section>

                <section className="container mb-4 AnimatedDiv">
                    <div className="d-flex flex-column my-5 py-5">
                        <h2 className="fw-bold mb-5 headingFunPrim">Partenaires du projet</h2>
                        <div className="row mt-3">
                            { project.partners != null ? project.partners.map((item, index) => (
                                <div className="col-lg-3">
                                    <span className="h2 fw-bold">{item.name}</span>
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

            </>
          }
        </>
    )
}

export default ProjectDetail