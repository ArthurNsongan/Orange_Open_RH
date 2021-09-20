import React, { useEffect, useState } from 'react'
import { faEllipsisV, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import apiRoutes from "../../../config/apiConfig"
import { Pagination } from "antd"
import 'antd/dist/antd.css'
// import Button from '../../../components/Button'

import { Link, NavLink } from 'react-router-dom';
import LoadingSpinner from '../../../components/LoadingSpinner';
import moment from 'moment';
import DataTable from '../../../components/DataTable';
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
        { value : "EN_COURS", label: "En cours"},
        { value : "TERMINE", label: "Terminé"},
    ]

    const formattedStatus = {
        "EN_COURS" : "En Cours",
        "TERMINE" : "Terminé",
        "EN_ATTENTE": "En Attente"
    }

    const [filterStatus, setfilterStatus] = useState("")

    const [loaded, setLoaded] = useState(false)

    const getProjects = (currentPage, perPage) => {
        setLoaded(false)
        axios.get(`${apiRoutes.ProjectsURL}/paginate/${perPage}?page=${currentPage}`
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
        
        getProjects(paginationOptions.currentPage, paginationOptions.perPage);

    }, [props])

    const onPaginationChange = (currentPage, perPage) => {
        getProjects(currentPage, perPage);
    }

    let projectsToShow = projects

    if(filterStatus !== "") {
        projectsToShow = projectsToShow.filter((item) => ( _.isEqual(item.status, filterStatus) ) )
    }
    
    const [searchKey, setSearchKey] = useState("")

    projectsToShow = searchKey !== "" ? projectsToShow.filter( item => (item.title.toLowerCase().includes(searchKey.toLowerCase()) ) ) : projectsToShow

    return (
        <>
            <div className="d-flex align-items-center justify-content-between bg-white shadow-sm py-3 px-2 mb-3">
                <h4 className="fw-bold pe-3 my-0">Nouveau projet</h4>
                <div>
                    <NavLink exact to={`${route.admin.projets.link}/add`}><button className="btn btn-primary"><FontAwesomeIcon icon={faPlus} className="d-inline-block me-3"></FontAwesomeIcon>Ajouter</button></NavLink>
                </div>
            </div>

            <div className="row bg-white shadow-sm px-2 py-4 mb-3 mx-0">
                <h4 className="fw-bold mb-4">Projets</h4>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="d-flex align-items-center mb-3 text-dark">
                            <FontAwesomeIcon icon={faSearch} className="d-inline-block me-2"/>
                            <input className="form-control" placeholder="Rechercher" onChange={(e)=>{ setSearchKey(e.target.value) }} />
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
                                <span onClick={() => setfilterStatus(item.value)} role="button"
                                className={`d-inline-block text-center col-6 fs-6 py-3 px-3 ${filterStatus === item.value ? "border-bottom border-3 text-primary fw-bold border-primary" : ""}`}>{_.capitalize(item.label)}</span>
                            )
                        })
                    }
                </div>
                    </div>
                </div>
                <DataTable emptyMessage="Aucun projet trouvé !" loaded={loaded} datas={projectsToShow} columns={[
                    {title: "#", dataTitle: "id", sortable: false},
                    {title: "Nom", dataTitle: "title"},
                    {title: "Communauté", renderData: (item) =>( <b>{item.holder}</b>)},
                    // {title: "Description", dataTitle:"description", renderData: (item) => (item.description.length > 100 ? <span className="alert-info text-primary-2 fw-bold">Texte enrichi</span> : item.description)},
                    {title: "Etat du projet", dataTitle:"status", renderData: (item) => ( _.capitalize(formattedStatus[item.status].replaceAll("_"," ") ) ) },
                    {title: "Date de fin des contributions",dataTitle:"deadlines",  renderData: (item) => ( moment(item.deadlines).format("Do MMMM YYYY")) },
                    {title: "Actions", renderData: (item) => (
                        <>
                            <button type="button" className="btn bn-white" id="threeDotsDropDown" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                            <div className="dropdown-menu left-0" aria-labelledby="threeDotsDropDown">
                                <Link to={`${route.admin.communautes.link}/${item.association_id}/projet/${item.id}`} className="dropdown-item">Voir</Link>
                                <Link to={`${route.admin.communautes.link}/${item.association_id}/projet/${item.id}/edit`} className="dropdown-item">Editer</Link>
                                {/* <Link className="dropdown-item">Supprimer</Link> */}
                            </div>
                        </>
                    ), sortable: false},
                ]}/>
                {/* <table className="Admin__Table px-0">
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
                </table> */}
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
