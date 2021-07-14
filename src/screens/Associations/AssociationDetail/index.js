import React from 'react'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom';
import Button from '../../../components/Button';
import { HeroImageHeader } from '../../../components/HeroImageSection'
import ProgressBar from '../../../components/ProgressBar';
import ProjectTile from '../../../components/ProjectTile';

function AssociationDetail() {

    const {associationId, associationName} = useParams();

    console.log(associationName);

    const headingStyle = {
        "color": "#ff6501",
        "fontWeight": "600"
    }

    const association = {
        "name": associationName,
        "description": "",
        "members": 5000,
        "projet": {
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
        }
    }


    return (
        <section className="my-5">
             <HeroImageHeader height="100px">
                    {/* <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <h1 className="text-center text-white fw-bold">Toutes les associations qui nous font confiance</h1>
                            </div>
                        </div>
                    </div> */}
                </HeroImageHeader>
                <div className="mt-5 container">
                    <h1 className="fw-bold pb-1" style={headingStyle}>{ associationName }</h1>
                    <h3 className="fw-bold pb-5">{ association.members } membres</h3>
                    <div className="row mb-5">
                        <div className="col-lg-12">
                            <div className="px-5 py-5 shadow bg-white">
                                <h5 className="fw-bold mb-5">PROJET EN COURS</h5>
                                <h3 className="fw-bold mb-2">Construction du siège social</h3>
                                <p>{association.projet.description}</p>
                                <span style={headingStyle} className="fw-bold d-block h4">{`${50} %`}</span>
                                <ProgressBar percent={50}/>
                                <h4 className="fw-bold mt-5">4 000 000 acquis</h4>
                                <h5>sur 12 000 000 FCFA</h5>
                            </div>
                        </div>
                    </div>
                    <div className="my-5">
                        <h3 className="mb-3 fw-bold">Présentation</h3>
                        <p style={{"lineHeight":"35px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="my-5">
                        <h3 className="mb-3 fw-bold">Documents légaux</h3>
                        <p style={{"lineHeight":"35px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="my-5">
                        <h3 className="mb-3 fw-bold">Notre association</h3>
                        <p style={{"lineHeight":"35px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="my-5">
                        <h3 className="mb-5 fw-bold">Nos derniers projets</h3>
                        <div className="row mb-5">
                            <ProjectTile className="col-lg-4 justify-content-center" owner={associationName}
                                contribution="40 000 000"
                                contributionNeeded="100 000 000"
                                title="Construction du siège social" 
                                percent="40" 
                                contributors="250"/>
                        </div>
                        <div className="d-flex my-5 justify-content-center">
                            <NavLink to="/projets"><Button>Tous les projets</Button></NavLink>
                        </div>
                    </div>
                </div>
        </section>
    )
}

export default AssociationDetail
