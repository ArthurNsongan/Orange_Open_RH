import { faEye, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom';
import Button from '../../../components/Button';
import { HeroImageHeader } from '../../../components/HeroImageSection'
import ProgressBar from '../../../components/ProgressBar';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ProjectTile from '../../../components/ProjectTile';
import apiRoutes from '../../../config/apiConfig';
import Interweave from "interweave";
import { slugify } from '../../../config/constants';

var route = require("../../../utils/route.json")

function AssociationDetail(props) {

    const {associationId, associationName} = useParams();
    const [loading, setLoading] = useState(true);
    const [association, setAssociation] = useState(null);

    console.log(associationName);

    const formatThousandsNumber = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    const headingStyle = {
        "color": "#0e71b4",
        "fontWeight": "600"
    }

    const associationDoom = {
        "name": associationName,
        "description": "",
        "members": 5000,
        "projet": {
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
        }
    }

    useEffect(() => {
        axios.get(`${apiRoutes.AssociationsURL}/${associationId}`)
        .then(response => {
            console.log(response.data);
            setAssociation(response.data)
            setTimeout(() => setLoading(false), 3000);
        })
    }, [associationId]);


    return (
        <>
            <Helmet title={`${associationName} - Challenge Solidarité`} />
            <section className="my-5">
                <HeroImageHeader image={loading ? "" : `${apiRoutes.StorageURL}/${association.logo}` } height="100px">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <h1 className="text-center text-white fw-bold">{ associationName }</h1>
                            </div>
                        </div>
                    </div>
                </HeroImageHeader>
                <div className="mt-5 container">
                   
                    <div className="my-5 fs-6">
                        { loading ? <LoadingSpinner /> :
                            // <p style={{"lineHeight":"35px"}}>{association.description }</p> 
                            <>
                                <h1 className="fw-bold pb-1" style={headingStyle}>{ association.name }</h1>
                                <h3 className="fw-bold pb-5">{ formatThousandsNumber(association.memberNumber) } membres</h3>
                            </> }
                        <h3 className="mb-5 fw-bold headingFunPrim contentLeft d-block">Présentation</h3>
                        { loading ? <LoadingSpinner /> :
                            // <p style={{"lineHeight":"35px"}}>{association.description }</p> 
                            <>
                                <Interweave content={association.description} />
                            </> }
                    </div>

                    { loading ? <LoadingSpinner /> :
                        <>
                            <div className="row mb-5">
                                <div className="col-lg-12">
                                    <div className="px-5 py-5 shadow bg-white">
                                        { association.projets ? (<>
                                            <h5 className="fw-bold mb-5">PROJET EN COURS</h5>
                                            <h3 className="fw-bold mb-2">{ association.projets.title }</h3>
                                            {/* <p className="fs-6">{associationDoom.projet.description}</p> */}
                                            <span style={headingStyle} className="fw-bold d-block h4">{association.projets.stat.pourcentage?.includes("%") ? association.projets.stat.pourcentage : association.projets.stat.pourcentage + "%"}</span>
                                            <ProgressBar percent={association.projets.stat.pourcentage?.replace("%", "") }/>
                                            <h4 className="fw-bold mt-5">{formatThousandsNumber(association.projets.cost - association.projets.stat.reste)} F CFA acquis</h4>
                                            <h5>sur {formatThousandsNumber(association.projets.cost)} FCFA</h5>
                                            <NavLink className="my-2" exact to={`${route.front.projets.link}/${association.projets.id}-${ slugify(association.projets.title) }`}>
                                                <button className="btn btn-secondary-2 text-white"><FontAwesomeIcon icon={faEye} className="d-inline-block me-3"></FontAwesomeIcon>Voir le projet</button>
                                            </NavLink>    
                                        </>) : (<h5 className="fw-bold my-2">AUCUN PROJET EN COURS</h5>)}
                                    </div>
                                </div>
                            </div>
                        </>
                    }

                    { loading ? <></> :
                        <>
                            <div className="my-5">
                                <h3 className="mb-5 fw-bold headingFunPrim contentLeft d-block">Documents légaux</h3>
                                    {/* <p style={{"lineHeight":"35px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
                                    <div className="d-flex flex-wrap">
                                        { association.documents.map((doc) => (
                                            <a className="me-2 mb-2 bg-primary" target="_blank" title="Cliquer pour ouvrir le document dans un nouvel onglet" rel="noreferrer" href={`${apiRoutes.StorageURL}/${doc.path}`}>
                                                <Button><FontAwesomeIcon icon={faFile} className="me-2"/>{doc.name}</Button>
                                            </a>
                                        ))}
                                        {/* <a className="me-2 mb-2" target="_blank" title="Cliquer pour ouvrir le document dans un nouvel onglet"  rel="noreferrer" href="https://www.orange.cm/particuliers/resources/other/2019-02-Formulaire-de-souscription_CSOM.pdf">
                                            <Button><FontAwesomeIcon icon={faFile} className="me-2"/>Nos Status.pdf</Button>
                                        </a>
                                        <a className="me-2 mb-2" target="_blank" title="Cliquer pour ouvrir le document dans un nouvel onglet"  rel="noreferrer" href="https://www.orange.cm/particuliers/resources/other/2019-02-Formulaire-de-souscription_CSOM.pdf">
                                            <Button><FontAwesomeIcon icon={faFile} className="me-2"/>Patente.pdf</Button>
                                        </a> */}
                                    </div>
                                
                            </div>
                        </>
                    }
                    {/* <div className="my-5">
                        <h3 className="mb-3 fw-bold">Notre association</h3>
                        { loading ? <LoadingSpinner /> :
                            <p style={{"lineHeight":"35px"}}>{association.description }</p> }                    
                    </div> */}
                    { loading ? <LoadingSpinner /> :
                        <div className="my-5">
                            <h3 className="mb-5 fw-bold headingFunPrim contentLeft d-block">Nos derniers projets</h3>
                            <div className="row mb-5">
                                {/* <ProjectTile className="col-lg-4 justify-content-center" owner={association.name}
                                    contribution="40 000 000"
                                    contributionNeeded="100 000 000"
                                    title="Construction du siège social" 
                                    percent="40" 
                                    contributors="250"/> */}
                            </div>
                            <div className="d-flex my-5 justify-content-center">
                                <NavLink to="/projets"><Button>Tous les projets</Button></NavLink>
                            </div>
                        </div> 
                    }
                </div>
        </section>
    
        </>    
    )
}

export default AssociationDetail
