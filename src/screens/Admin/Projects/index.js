import React, { useEffect, useState } from 'react'
import { faEllipsisV, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import apiRoutes from "../../../config/apiConfig"
import { Pagination } from "antd"
import 'antd/dist/antd.css'
// import Button from '../../../components/Button'

import { NavLink } from 'react-router-dom';
import LoadingSpinner from '../../../components/LoadingSpinner';
import moment from 'moment';
// import '@popperjs/core';
// import 'bootstrap'

let route = require('../../../utils/route.json')
var _ = require("lodash")

function Projects(props) {

    const [projects, setProjects] = useState([])

    const [paginationOptions, setPaginationOptions] = useState({
        total: 0,
        perPage: 5,
        currentPage: 1
    })

    const statuses = [
        "EN_COURS",
        "TERMINE"
    ]

    const [filterStatus, setfilterStatus] = useState("")

    const [loaded, setLoaded] = useState(false)

    const getProjects = () => {
        setLoaded(false)
        axios.get(`${apiRoutes.ProjectsURL}/paginate/${paginationOptions.perPage}?page=${paginationOptions.currentPage}`
        )
        .then( response => {
            setProjects(response.data.data)
            console.log(response.data)
            setPaginationOptions(
                {
                    total: response.data.meta.total,
                    perPage: response.data.meta.per_page,
                    currentPage: response.data.meta.current_page,
                }
            )
            setLoaded(true)
            // let select = document.querySelector("select[name='type_id']");
            // console.log(select)
            // select.change();
            // window.$("select[name='type_id']").trigger("change");
        })
    }

    useEffect(() => {
        
        getProjects();
        setTimeout(() => setLoaded(true), 500);

    }, [props])

    const onPaginationChange = (currentPage, perPage) => {
        getProjects();
    }

    let projectsToShow = projects

    if(filterStatus !== "") {
        projectsToShow = projectsToShow.filter((item) => ( _.isEqual(item.status, filterStatus) ) )
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-between bg-white shadow-sm py-3 px-2 mb-3">
                <h4 className="fw-bold pe-3 my-0">Nouveau projet</h4>
                <div>
                    <NavLink exact to={`${route.admin.projets.link}/add`}><button className="btn btn-primary"><FontAwesomeIcon icon={faPlus} className="d-inline-block me-3"></FontAwesomeIcon>Ajouter</button></NavLink>
                </div>
            </div>

            <div className="row bg-white shadow-sm px-2 py-4 mb-3 mx-0">
                <h5 className="fw-bold mb-4">Projets</h5>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="d-flex align-items-center mb-3 text-dark">
                            <FontAwesomeIcon icon={faSearch} className="d-inline-block me-2"/>
                            <input className="form-control" placeholder="Rechercher" />
                        </div>
                    </div>
                </div>
                <div className="d-flex border-bottom mb-2">
                    <div className="col-lg-6">
                    <div className="d-flex">
                        <span role="button" onClick={() => { setfilterStatus("") }}
                        className={`d-inline-block text-center col-6 fs-6 py-3 px-3 ${filterStatus === "" ? "border-bottom border-3 border-primary fw-bold text-primary" : ""}`}>{_.capitalize("Tout")}</span>
                    {
                        statuses.map((item, index) => {
                            return(
                                <span onClick={() => setfilterStatus(item)} role="button"
                                className={`d-inline-block text-center col-6 fs-6 py-3 px-3 ${filterStatus === item ? "border-bottom border-3 text-primary fw-bold border-primary" : ""}`}>{_.capitalize(item.replaceAll("_", " "))}</span>
                            )
                        })
                    }
                </div>
                    </div>
                </div>
                <table className="Admin__Table px-0">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" width="300px">Nom</th>
                            <th scope="col" width="400px">Description</th>
                            <th scope="col">Etat du projet</th>
                            <th scope="col">Date de fin des contributions</th>
                            <th scope="col" width="100px">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loaded === false ?
                            (
                                <tr>
                                    <th scope="row"><LoadingSpinner /></th>
                                </tr>
                            )
                            : 
                            (
                                projectsToShow.length > 0 ? projectsToShow.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="col">#</th>
                                        <td width="300px">{item.title}</td>
                                        <td width="400px">{item.description}</td>
                                        <td>{_.capitalize(item.status.replaceAll("_"," ")) }</td>
                                        <td>Date de fin des contributions</td>
                                        <td width="100px">Actions</td>
                                    </tr>
                                )):
                                <tr>
                                    <td className="text-center" colSpan="6">Pas de projets correspondant pour cette page.</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className="row my-4 fs-6 justify-content-between">
                    <div className="col-lg-6">
                    Affichage de { paginationOptions.perPage} résultats
                    </div>
                    <div className="col-lg-6">
                        <Pagination 
                            className="d-flex justify-content-end"
                            total={paginationOptions.total}
                            pageSize={paginationOptions.perPage}
                            current={paginationOptions.currentPage}
                            showSizeChanger
                            onChange={onPaginationChange}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Projects
