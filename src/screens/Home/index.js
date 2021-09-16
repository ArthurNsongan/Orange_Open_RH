import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation } from 'swiper/core'
import 'swiper/swiper-bundle.min.css';

import Button from '../../components/Button';
import Equipe from '../../components/Equipe';
import HeroImageSection from '../../components/HeroImageSection';
import apiRoutes from "../../config/apiConfig"
import Partenaires from '../../components/Partenaires';
// import ProgressBar from '../../components/ProgressBar';
import ProjectTile from '../../components/ProjectTile';
import './styles.css';
import Images from '../../utils/images.js'

let route = require('../../utils/route.json')
let legalFiles = require('../../utils/legalFiles.json')

SwiperCore.use([Autoplay, Navigation]);

function Home(props) {

    const headingStyle = {
        // "color": "#0e71b4",
        // "fontWeight": "600"
    }

    const hiwStyle = {
        "backgroundColor": "#0e71b4",
        "fontWeight": "600",
        "color": "black",
        "height": "50px",
        "width": "50px",
        "borderRadius": "100%"
    }

    const StatCard = (props) => {

        const [countUp, setCountUp] = useState(0);

        useEffect(() => {
            if(countUp < props.number ) { setTimeout(() => (setCountUp(props.number)), 2000 ) }
        }, [countUp])

        return (<div className={"StatCard AnimatedComponent " + props.className}>
            <div className="d-flex mx-0 mb-4 text-white justify-content-center align-items-center flex-column" style = {{
                "width": "100%",
                "height": "250px",
            }}>
                {/* <div className="d-flex justify-content-center"> */}
                    { props.icon !== undefined ? ( <img alt="" width="100px"  height="100px" src={props.icon} />) : (<></>) }
                    <div className="svg">{ props.iconComp }</div>
                    <h1 className="text-center text-white fw-bold">{countUp}</h1>
                    <h5 className="text-center text-white">{props.title}</h5>
                {/* </div> */}
            </div>
        </div>)
    }

    return (
        <>
            <Helmet title="Challenge Solidarité - Accueil"/>
            <Swiper
                navigation={true}
                loop
                autoplay={{
                    delay: 4500
                }}
            >    
                <SwiperSlide>
                    { ( { isActive } ) => (
                        <HeroImageSection animate={isActive} image={Images.heroImg3}>
                                                    {/* {console.log(isActive)} */}
                        <div className="HeroHeading container">
                            <div className="justify-content-center d-flex">
                                <div className="col-lg-12 col-xl-10 com-md-10 text-center">
                                    <h1 className="text-secondary-2 fw-bold text-center">New Challenge</h1>
                                    <h1 className="text-white text-center">Bienvenue sur notre plateforme d'autofinancement des projets communautaires</h1>
                                    <NavLink to={route.front.projets.link}><Button className={`btn-primary`}>Visitez nos projets</Button></NavLink>
                                </div>
                            </div>
                        </div>
                    </HeroImageSection>
                    ) }
                </SwiperSlide>
                <SwiperSlide>
                    {({ isActive }) => (
                        <HeroImageSection animate={isActive ? true : false}>
                            <div className="HeroHeading container">
                                <div className="justify-content-center text-center d-flex">
                                    <div className="col-lg-7 col-xl-6 com-md-10">
                                        <h1 className="text-white">Bienvenue sur notre plateforme d'autofinancement des projets communautaires</h1>
                                        <h1 className="text-secondary-2 fw-bold">New Challenge</h1>
                                        <NavLink to={route.front.projets.link}><Button className="btn-primary">Visitez nos projets</Button></NavLink>
                                    </div>
                                </div>
                            </div>
                        </HeroImageSection>
                    )}
                </SwiperSlide>
            </Swiper>

            <section className="container py-5 AnimatedDiv">
                <div className="row justify-content-start">
                    <div className="col-lg-6 align-self-center">
                        <h2 className="h2 mb-5 d-block text-primary-2 fw-bold">Notre solution solidaire au service de l'entrepreunariat</h2>
                        <p className="mb-5 fs-5 d-block">Challenge Solidarité est une communauté de droit camerounais regroupant d'anciens et nouveaux diplômés de grandes écoles et d'universités. 
                            Challenge Solidarité est une communauté de droit camerounais regroupant d'anciens et nouveaux diplômés de grandes écoles et d'universités. </p>
                        <NavLink to={route.front.communautes.link}><Button>Visitez les communautés</Button></NavLink>
                    </div>
                    <div className="col-lg-6">
                       <img alt="" loading="lazy" src={Images.peopleAgreeing} className="img-fluid img-responsive" />
                    </div>
                </div>
            </section>

            <section className="text-white bg-dark py-5 AnimatedDiv">
                <section className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="h1 pb-5 text-center" style={{ "fontWeight": "600"}}>Nous sommes une <span className=" pt-3 text-secondary-2">entreprise sérieuse et intègre</span></div>
                            <p className="text-center fs-5">Challenge Solidarité est une communauté de droit camerounais regroupant d'anciens et nouveaux diplômés de grandes écoles et d'universités. 
                                Challenge Solidarité est une communauté de droit camerounais regroupant d'anciens et nouveaux diplômés de grandes écoles et d'universités. </p>
                            <div className="d-flex justify-content-center"><Button data-bs-toggle="modal" className="btn-primary text-center" data-bs-target="#ChallengeSolDocsModal">Voir nos documents</Button></div>

                            <div className="modal" id="ChallengeSolDocsModal">
                                <div className="modal-dialog modal-lg modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="fw-bold mb-0">Nos documents légaux et administratifs</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body px-3">
                                            <div className="row">
                                                <div className="d-flex flex-wrap">
                                                    { legalFiles.map(item => (
                                                        <a className="me-2 mb-2" target="_blank" rel="noreferrer" href={`${apiRoutes.StorageURL}/${item.path}`}>
                                                            <Button><FontAwesomeIcon icon={faFile} className="me-2"/>{item.title}</Button>
                                                        </a>
                                                    ))}
                                                    {/* <a className="me-2 mb-2" target="_blank" rel="noreferrer" href="https://www.orange.cm/particuliers/resources/other/2019-02-Formulaire-de-souscription_CSOM.pdf">
                                                        <Button><FontAwesomeIcon icon={faFile} className="me-2"/>Nos Status.pdf</Button>
                                                    </a>
                                                    <a className="me-2 mb-2" target="_blank" rel="noreferrer" href="https://www.orange.cm/particuliers/resources/other/2019-02-Formulaire-de-souscription_CSOM.pdf">
                                                        <Button><FontAwesomeIcon icon={faFile} className="me-2"/>Patente.pdf</Button>
                                                    </a> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>

            <section className="AnimatedDiv">
            <div className="container d-flex flex-column align-items-center  py-5">
                <h1 className="fw-bold headingFunPrim contentCenter">Comment <span className="text-primary-2">ça marche</span> ?</h1>
                    <div className="row mt-5 pt-3">
                        <div className="col-lg-4 elevate">
                            <div className="d-flex justify-content-center">
                                <span className="d-flex align-items-center justify-content-center fs-1 fw-bold itemFunSec p-2">1</span>
                            </div>
                            <p className="h4 text-center fw-bold my-3">Créez votre <br />communauté</p>
                            <p className="fs-5 text-center lh-2">Challenge solidarité est une communauté de droit camerounais regroupant d'anciens et nouveaux diplômés de grandes écoles et d'universités.</p>
                        </div>
                        <div className="col-lg-4 elevate">
                            <div className="d-flex justify-content-center">
                                <span className="d-flex align-items-center justify-content-center fs-1 fw-bold p-2 itemFunSec">2</span>
                            </div>
                            <p className="h4 text-center fw-bold my-3">Invitez votre membres <br />à contribuer à vos projets</p>
                            <p className="fs-5 text-center lh-2">Challenge solidarité est une communauté de droit camerounais regroupant d'anciens et nouveaux diplômés de grandes écoles et d'universités.</p>
                        </div>
                        <div className="col-lg-4 elevate">
                            <div className="d-flex justify-content-center">
                                <span className="d-flex align-items-center justify-content-center fs-1 fw-bold p-2 itemFunSec">3</span>
                            </div>
                            <p className="h4 text-center fw-bold my-3">Contrôlez les contributions <br />au projet</p>
                            <p className="fs-5 text-center lh-2">Challenge solidarité est une communauté de droit camerounais regroupant d'anciens et nouveaux diplômés de grandes écoles et d'universités.</p>
                        </div>
                    </div>
            </div>
            </section>


            <section className="py-3 d-block AnimatedDiv">
                <div className="pt-5 pb-5 bg-primary-2 fw-bold text-white text-center mb-0">
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <h2 className="text-center h2 my-3 text-white headingFunPrim contentCenter ">Nos Top Projets</h2>
                    </div>
                </div>

                <div className="container pb-5">
                    <div className="row justify-content-start" style={{ "marginTop": "0"}}>
                        {/* <ProjectTile className="col-lg-4 my-4 justify-content-center" owner="L'ordre des avocats"
                            contribution="40 000 000"
                            contributionNeeded="100 000 000"
                            title="Construction du siège social" 
                            percent="40" 
                            contributors="250"/>
                        <ProjectTile className="col-lg-4 my-4  justify-content-center" owner="L'ordre des médécins"
                            contribution="40 000 000"
                            contributionNeeded="100 000 000"
                            title="Réparation des bureaux de l’ordre" 
                            percent="40" 
                            contributors="250"/> */}
                        
                        <div className="col-lg-4">    
                        </div>
                    </div>
                    <div className="d-flex my-5 justify-content-center">
                        <NavLink to="/projets"><Button>Tous les projets</Button></NavLink>
                    </div>
                </div>
            </section>

            <section className="funBackgroundGradient AnimatedDiv d-block text-white">
                <div className="container py-5">
                <div className="row justify-content-center">
                            <StatCard 
                                className="col-lg-3 col-md-6" 
                                number={10}
                                iconComp={<Images.Communities width="100px" height="100px" />}
                                title="Communautés"/>
                            <StatCard 
                                className="col-lg-3 col-md-6 " 
                                number={10}
                                iconComp={<Images.ProjectManag  width="100px" height="100px"/>}
                                title="Réalisations"/>
                            <StatCard 
                                className="col-lg-3 col-md-6" 
                                number={5}
                                iconComp={<Images.Project  width="100px" height="100px" />}
                                title="Projets"/>
                            <StatCard 
                                className="col-lg-3 col-md-6" 
                                number={10000}
                                iconComp={<Images.Members width="100px" height="100px"/>}
                                title="Membres"/>
                        </div>
                </div>
            </section>

            <section className="relative d-block AnimatedDiv my-5">
                <div className="container">
                    <div className="d-flex flex-column align-items-center mb-5">
                        <h1 className="text-center fw-bold fun mb-5 headingFunPrim contentCenter" style={headingStyle}>Notre équipe</h1>
                    </div>
                    <Equipe />
                </div>
            </section>

            <section className="relative d-block AnimatedDiv">
                <div className="container">
                    <div className="d-flex flex-column align-items-center mb-5">
                        <h1 className="text-center mb-5 fw-bold headingFunPrim contentCenter">Nos partenaires</h1>
                    </div>
                    <Partenaires />
                </div>
            </section>

            <section className="relative d-block my-5 AnimatedDiv">
                <div className="container my-5 py-5">
                    <div className="d-flex flex-column align-items-center mb-5">
                        <h1 className="text-center fw-bold headingFunPrim contentCenter">Contactez-Nous</h1>
                    </div>
                    <div className="row justify-content-center AnimatedComponent">
                        <div className="col-lg-6">
                            <div className="d-flex flex-column pb-3">
                                <label className="form-label fw-bold">E-mail*</label>
                                <input type="text" value="" placeholder="Entrez votre adresse e-mail" className="form-control p-2" />
                            </div>
                            <div className="d-flex flex-column pb-3">
                                <label className="form-label fw-bold">Nom*</label>
                                <input type="text" value="" placeholder="Votre nom" className="form-control p-2" />
                            </div>
                            <div className="d-flex flex-column pb-3">
                                <label className="form-label fw-bold">Objet*</label>
                                <input type="text" value="" placeholder="Quel est l'objet du message ?" className="form-control p-2" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="d-flex flex-column pb-3">
                                <label className="form-label fw-bold">Description*</label>
                                <textarea placeholder="Description" className="form-control p-2" rows="6" ></textarea>
                            </div>
                            <Button buttonType="fullWidth">Envoyer</Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;