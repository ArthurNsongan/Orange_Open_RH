import React from 'react'
import { HeroImageHeader } from '../../components/HeroImageSection'
import ProjectTile from '../../components/ProjectTile'

function Projects() {
    return (
        <>
            <section className="Projets">
                <HeroImageHeader>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <h1 className="text-center text-white fw-bold">Tous les projets en cours</h1>
                            </div>
                        </div>
                    </div>
                </HeroImageHeader>
            </section>
            
            <section className="relative py-5 container">  
                <div className="row">
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
                    <ProjectTile className="col-lg-4 justify-content-center" owner="L'ordre des médécins"
                        contribution="40 000 000"
                        contributionNeeded="100 000 000"
                        title="Réparation des bureaux de l’ordre" 
                        percent="40" 
                        contributors="250"/>
                    <ProjectTile className="col-lg-4 justify-content-center" owner="L'ordre des médécins"
                        contribution="40 000 000"
                        contributionNeeded="100 000 000"
                        title="Réparation des bureaux de l’ordre" 
                        percent="40" 
                        contributors="250"/>
                    <ProjectTile className="col-lg-4 justify-content-center" owner="L'ordre des médécins"
                        contribution="40 000 000"
                        contributionNeeded="100 000 000"
                        title="Réparation des bureaux de l’ordre" 
                        percent="40" 
                        contributors="250"/>
                    <ProjectTile className="col-lg-4 justify-content-center" owner="L'ordre des médécins"
                        contribution="40 000 000"
                        contributionNeeded="100 000 000"
                        title="Réparation des bureaux de l’ordre" 
                        percent="40" 
                        contributors="250"/>
                </div>
            </section>
        </>
    )
}

export default Projects
