import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../components/Button';
import Equipe from '../../components/Equipe';
import HeroImageSection from '../../components/HeroImageSection';
import Partenaires from '../../components/Partenaires';
import ProgressBar from '../../components/ProgressBar';
import ProjectTile from '../../components/ProjectTile';
import './styles.css';

function Home(props) {

    const headingStyle = {
        "color": "#ff6501",
        "fontWeight": "600"
    }

    const hiwStyle = {
        "backgroundColor": "#ff6501",
        "fontWeight": "600",
        "color": "black",
        "height": "50px",
        "width": "50px",
        "borderRadius": "100%"
    }

    const StatCard = (props) => (
        <div className={props.className}>
            <div className="d-flex mx-0 mb-4 justify-content-center align-items-center flex-column" style = {{
                "width": "100%",
                "height": "208px",
                "boxShadow": "1px 1px 6px lightgray"
            }}>
                <div>
                    <h2 className="fw-bold">{props.number}</h2>
                    <h3 style={headingStyle}>{props.title}</h3>
                </div>
            </div>
        </div>
    )

    return (
        <>
            <HeroImageSection>
                <div className="HeroHeading container">
                    <div className="justify-content-start d-flex">
                        <div className="col-lg-8">
                            <h1 className="text-white">Bienvenue sur notre plateforme d'autofinancement des projets communautaires</h1>
                            <h1 style={headingStyle}>Challenge Solidarité</h1>
                            <Button>Visitez les associations / corporations</Button>
                        </div>
                    </div>
                </div>
            </HeroImageSection>

            <section className="container py-5">
                <div className="row justify-content-start">
                    <div className="col-lg-6 align-self-center">
                        <h2 className="h2 mb-5 d-block" style={headingStyle}>Notre solution solidaire au service de l'entrepreunariat</h2>
                        <p className="mb-5 d-block">Challenge Solidarité est une association de droit camerounais regroupant d'anciens et nouveaux diplômés de grandes écoles et d'universités. 
                            Challenge Solidarité est une association de droit camerounais regroupant d'anciens et nouveaux diplômés de grandes écoles et d'universités. </p>
                        <Button>Visitez les associations / corporations</Button>
                    </div>
                    <div className="col-lg-6">
                        <div className="row justify-content-center">
                            <StatCard 
                                className="col-lg-6 col-md-6" 
                                number="+15"
                                title="Associations"/>
                            <StatCard 
                                className="col-lg-6 col-md-6" 
                                number="+10"
                                title="Réalisations"/>
                            <StatCard 
                                className="col-lg-6 col-md-6" 
                                number="+5"
                                title="Projets"/>
                            <StatCard 
                                className="col-lg-6 col-md-6" 
                                number="+10000"
                                title="Membres"/>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="h1 pb-5" style={{ "fontWeight": "600"}}>Nous sommes une <br/> <span className="ps-5 pt-3 d-block" style={headingStyle}>entreprise sérieuse et intègre</span></div>
                        <p>Challenge Solidarité est une association de droit camerounais regroupant d'anciens et nouveaux diplômés de grandes écoles et d'universités. 
                            Challenge Solidarité est une association de droit camerounais regroupant d'anciens et nouveaux diplômés de grandes écoles et d'universités. </p>
                        <Button>Visitez les associations / corporations</Button>
                    </div>
                </div>
            </section>

            <section className="container py-5">
                <h1 className="text-center fw-bold">Comment <span style={headingStyle}>ça marche</span> ?</h1>
                <div className="row mt-5 pt-3">
                    <div className="col-lg-4">
                        <div className="d-flex justify-content-center">
                            <span className="d-flex align-items-center justify-content-center p-2" style={hiwStyle}>1</span>
                        </div>
                        <p className="h4 text-center fw-bold my-3">Créez votre <br />association</p>
                        <p className="h6 lh-lg">Challenge solidarité est une association de droit camerounais regroupant d'anciens et nouveaux diplômés de grandes écoles et d'universités.</p>
                    </div>
                    <div className="col-lg-4">
                        <div className="d-flex justify-content-center">
                            <span className="d-flex align-items-center justify-content-center p-2" style={hiwStyle}>2</span>
                        </div>
                        <p className="h4 text-center fw-bold my-3">Invitez votre membres <br />à contribuer à vos projets</p>
                        <p className="h6 lh-lg">Challenge solidarité est une association de droit camerounais regroupant d'anciens et nouveaux diplômés de grandes écoles et d'universités.</p>
                    </div>
                    <div className="col-lg-4">
                        <div className="d-flex justify-content-center">
                            <span className="d-flex align-items-center justify-content-center p-2" style={hiwStyle}>3</span>
                        </div>
                        <p className="h4 text-center fw-bold my-3">Contrôlez les contributions <br />au projet</p>
                        <p className="h6 lh-lg">Challenge solidarité est une association de droit camerounais regroupant d'anciens et nouveaux diplômés de grandes écoles et d'universités.</p>
                    </div>
                </div>
            </section>

            <section className="pt-3 d-block">
                <div className="pt-5 pb-5 bg-dark fw-bold text-white text-center h2 mb-0">
                    <div className="pb-5">
                        Nos Top Projects
                    </div>
                </div>

                <div className="container pb-5">
                    <div className="row justify-content-start" style={{ "marginTop": "-50px"}}>
                        <ProjectTile className="col-lg-4 justify-content-center" owner="L'ordre des avocats"
                            contribution="40 000 000"
                            contributionNeeded="100 000 000"
                            title="Construction du siège social" 
                            percent="40" 
                            contributors="250"/>
                        <ProjectTile className="col-lg-4 justify-content-center" owner="L'ordre des médécins"
                            contribution="40 000 000"
                            contributionNeeded="100 000 000"
                            title="Réparation des bureaux de l’ordre" 
                            percent="40" 
                            contributors="250"/>
                        
                        <div className="col-lg-4">    
                        </div>
                    </div>
                    <div className="d-flex my-5 justify-content-center">
                        <NavLink to="/projets"><Button>Tous les projets</Button></NavLink>
                    </div>
                </div>
            </section>

            <section className="relative d-block my-5">
                <div className="container">
                    <div className="d-flex mb-5">
                        <h1 className="text-left fw-bold mb-5" style={headingStyle}>Notre équipe</h1>
                    </div>
                    <Equipe />
                </div>
            </section>

            <section className="relative d-block">
                <div className="container">
                    <div className="d-flex mb-5">
                        <h1 className="text-left mb-5 fw-bold" style={headingStyle}>Nos Partenaires</h1>
                    </div>
                    <Partenaires />
                </div>
            </section>

            <section className="relative d-block my-5">
                <div className="container my-5 py-5">
                    <div className="d-flex mb-5">
                        <h1 className="text-center fw-bold" style={headingStyle}>Contactez-Nous</h1>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="d-flex flex-column pb-3">
                                <label className="form-label fw-bold">E-mail*</label>
                                <input type="text" value="" placeholder="E-mail du message" className="form-control p-2" />
                            </div>
                            <div className="d-flex flex-column pb-3">
                                <label className="form-label fw-bold">Nom*</label>
                                <input type="text" value="" placeholder="Nom du message" className="form-control p-2" />
                            </div>
                            <div className="d-flex flex-column pb-3">
                                <label className="form-label fw-bold">Objet*</label>
                                <input type="text" value="" placeholder="Objet du message" className="form-control p-2" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="d-flex flex-column pb-3">
                                <label className="form-label fw-bold">Description*</label>
                                <textarea placeholder="Description du message" className="form-control p-2" rows="6" ></textarea>
                            </div>
                            <Button buttonType="fullWidth">ENVOYER LE MESSAGE</Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;