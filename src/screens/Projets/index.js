import React, { useState, useEffect } from 'react'
import apiRoutes from '../../config/apiConfig'

import axios from 'axios'

import { Pagination } from 'antd'
import { Helmet } from 'react-helmet'
import { HeroImageHeader } from '../../components/HeroImageSection'
import ProjectTile from '../../components/ProjectTile'
import LoadingSpinner from '../../components/LoadingSpinner'

import { formatThousandsNumber } from '../../config/constants'
import { getAllInProgressProjects } from '../../services/API'


function Projects(props) {

    const [projects, setProjects] = useState([])

    const [paginationOptions, setPaginationOptions] = useState({
        total: 0,
        perPage: 5,
        currentPage: 1
    })

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllInProgressProjects(paginationOptions.currentPage, paginationOptions.perPage, 
            (response) => {
                setIsLoading(false)
                setPaginationOptions(
                    {
                        total: response.data.total,
                        perPage: response.data.per_page,
                        currentPage: response.data.current_page,
                    }
                )
                setProjects(response.data.data)
                console.log(response.data)
            }, (res) => { console.log(res) }, 
            () => { setIsLoading(true)})    
    }, [props])

    const onPaginationChange = (currentPage, perPage) => {
        getAllInProgressProjects(currentPage, perPage, 
            (response) => {
                setIsLoading(false)
                setPaginationOptions(
                    {
                        total: response.data.total,
                        perPage: response.data.per_page,
                        currentPage: response.data.current_page,
                    }
                )
                setProjects(response.data.data)
                console.log(response.data)
            }, (res) => { console.log(res) }, 
            () => { setIsLoading(true)})
    }

    // const getProjects = (currentPage, perPage) => {
    //     setIsLoading(true)
    //     axios.get(`${apiRoutes.ProjectsURL}/paginate/${perPage}?page=${currentPage}`)
    //     .then( response => {
    //         setIsLoading(false)
    //         setPaginationOptions(
    //             {
    //                 total: response.data.meta.total,
    //                 perPage: response.data.meta.per_page,
    //                 currentPage: response.data.meta.current_page,
    //             }
    //         )
    //         setProjects(response.data.data)
    //         console.log(response.data)
    //     })    
    // }

    
    return (
        <>
            <Helmet title="Tous les projets - Challenge Solidarité" />
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
                    { isLoading ? <LoadingSpinner /> :
                    projects.map((item, index) => (
                        <ProjectTile project={item} key={index} className="col-lg-4 justify-content-center" owner={item.holder}
                        contribution={formatThousandsNumber(item.cost)}
                        image={item.image}
                        contributionNeeded={formatThousandsNumber(100000000)}
                        title={item.title} 
                        percent="40" 
                        contributors="250"/>
                    ))}
                    {/* <ProjectTile className="col-lg-4 justify-content-center" owner="L'ordre des avocats"
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
                        contributors="250"/> */}
                </div>
                <div className="row">
                    <Pagination 
                        className="d-flex fs-5 justify-content-center"
                        total={paginationOptions.total}
                        pageSize={paginationOptions.perPage}
                        current={paginationOptions.currentPage}
                        showSizeChanger
                        onChange={onPaginationChange}
                    />
                </div>
            </section>
        </>
    )
}

export default Projects
