import React, { useEffect, useState } from 'react'

import { faArrowLeft, faEdit, faEllipsisV, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import apiRoutes from "../../../../config/apiConfig"
// import Button from '../../../components/Button'

import $ from "jquery"
import { toast } from 'react-toastify';
import { Link, NavLink, useParams } from 'react-router-dom';
import ProgressBar from '../../../../components/ProgressBar';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import moment from 'moment';
import { Helmet } from 'react-helmet';

// import '@popperjs/core';
// import 'bootstrap'

// let associationTypesStatic = require("../../../../utils/associationTypes.json")
let route = require('../../../../utils/route.json')

var _ = require('lodash');


function AssociationDetail(props) {
    // const [associations, setAssociations] = useState([]);

    const [association, setAssociation] = useState({})

    const [lastProjects, setLastProjects] = useState([])

    const [loaded, setLoaded] = useState(false)

    const [associationMembers, setAssociationMembers] = useState([])

    // const [associationTypes, setAssociationTypes] = useState([]);

    // const taille = 10;

    useEffect(() => {

        axios.get(`${apiRoutes.AssociationsURL}/${communaute_id}`)
        .then( response => {
            setAssociation(response.data)
            console.log(response.data)
        })

        getAssociationProjects(communaute_id)

        setTimeout(() => {
            setLoaded(true);
        }, 3000)

    }, [props])

    // const handleSubmitNewAssociation = () => {
    //     console.log("Association Object : \n");
    //     const { assocDocs , ...assocTemp} = association
    //     console.log(assocTemp);
    //     console.log("Association FormData");
    //     var assocFormData = new FormData();
    //     assocFormData.append("name", assocTemp.name)
    //     assocFormData.append("description", assocTemp.description)
    //     assocFormData.append("logo", assocTemp.logo)
    //     assocFormData.append("bankAccountNumber", parseInt(assocTemp.bankAccountNumber))
    //     assocFormData.append("address", assocTemp.address)
    //     assocFormData.append("memberNumber", parseInt(assocTemp.memberNumber))
    //     assocFormData.append("potentialMemberNumber", parseInt(assocTemp.potentialMemberNumber))
    //     assocFormData.append("phoneNumber", parseInt(assocTemp.phoneNumber))
    //     assocFormData.append("type_id", parseInt(assocTemp.type_id))
    //     // console.log(assocFormData.getAll("name"))

    //     let axiosRequest = axios.create();
    //     axiosRequest.post(apiRoutes.AssociationsURL, assocFormData)
    //         .then(response => {
    //             console.log(response.data)
    //             toast(<><h1>Heure</h1></>, {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: true,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //             })
    //         }).catch( ({ response }) => {
    //             console.log(response)
    //         })
        
    //     console.log(axiosRequest)
    // }

    // const handleAddNewTextInputChange = (e) => {
    //     const { name, value } = e.target
    //     let assocTemp = {
    //         ...association,
    //     }
    //     assocTemp[name] = value
    //     setAssociation(assocTemp)
    //     console.log(association)
    // }

    // const handleAddNewFileInputChange = (e) => {
    //     // console.log("Logo : ", e.target.files[0])
    //     const { name, files } = e.target
    //     let assocTemp = {
    //         ...association,
    //     }
    //     assocTemp[name] = files[0]
    //     setAssociation(assocTemp)
    //     console.log(association)
    // }

    // const handleAddNewMultiFileInputChange = (e) => {
    //     console.log("Documents : ", e.target.files)
    //     console.log(e.target.files[0])
    //     const { name, files } = e.target
    //     let assocTemp = {
    //         ...association,
    //     }
    //     assocTemp[name] = files
    //     setAssociation(assocTemp)
    //     console.log(association)
    // }

    const getAssociationProjects = (association_id) => {
        axios.get(`${apiRoutes.AssociationProjectsURL}/${association_id}`)
        .then( response => { 
            setLastProjects(response.data)
            console.log(response.data)
        })
    }

    const { communaute_id } = useParams();


    return (
        <div className="row bg-white shadow-sm px-2 py-4 mb-3 mx-0">
            {/* <h2>Communautés</h2> */}
            { !_.isEqual({}, association) ? <Helmet title={association.name + " - Communautés"} /> : "" }
            <div className="d-flex flex-column">
                <NavLink className="d-flex align-items-center mb-3" to={`${route.admin.communautes.link}`}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <span className="d-block mx-2 fs-6 mb-0">Revenir à la liste</span>
                </NavLink>
                <h3 className="fw-bold mb-4">{association.name}</h3>
                <div className="d-flex">
                    <NavLink className="m-2" exact to={`${route.admin.communautes.link}/edit/${communaute_id}`} >
                        <button className="btn btn-primary rounded-0">
                            <FontAwesomeIcon icon={faEdit} className="d-inline-block me-3"></FontAwesomeIcon>Editer
                        </button>
                    </NavLink>
                    <NavLink className="m-2" exact to={`${route.admin.communautes.link}/${communaute_id}/projet/add`}>
                        <button className="btn btn-secondary"><FontAwesomeIcon icon={faPlus} className="d-inline-block me-3"></FontAwesomeIcon>Ajouter un projet</button>
                    </NavLink>
                </div>
            </div>
            { association.currentProject != null ?
                (<>
                    <hr className="my-4"/>
                    <div className="d-flex flex-column">
                        <h4 className="fw-bold">Projet en cours</h4>
                        <h4 className="mt-3 fw-bold mx-3">Construction du siège social</h4>
                        <div className="my-3 mx-3">
                            <ProgressBar percent="30" />
                            <div className="row">
                                <span className="d-block fw-bold col-4 fs-5 my-2">30%</span>
                                <span className="d-block fs-5 col-4 my-2"><b>4 000 000 acquis FCFA</b><br/>sur 12 000 000 F</span>
                                <span className="d-block fs-5 col-4 my-2"><b>250</b> contributeurs</span>
                            </div>
                        </div>
                    </div>
                </>) : null }
            <hr className="my-4"/>
            <div className="d-flex flex-column">
                <h4 className="fw-bold">Derniers projets</h4>
                <div className="row mt-4">
                    <div className="col-lg-4">
                        <div className="d-flex align-items-center mb-3 text-dark">
                            {/* <FontAwesomeIcon icon={faSearch} className="d-inline-block me-2"/> */}
                            <input className="form-control" placeholder="Rechercher" />
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
                                lastProjects.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="col">#</th>
                                        <td width="300px">{item.title}</td>
                                        <td width="400px">{item.description}</td>
                                        <td>{_.capitalize(item.status.replaceAll("_"," ")) }</td>
                                        <td>{ moment(item.deadlines).format("D MMMM YYYY") }</td>
                                        <td width="100px">
                                            <button type="button" className="btn bn-white" id="threeDotsDropDown" data-bs-toggle="dropdown" aria-expanded="false">
                                                <FontAwesomeIcon icon={faEllipsisV} />
                                            </button>
                                            <div className="dropdown-menu left-0" aria-labelledby="threeDotsDropDown">
                                                <Link to={`${route.admin.communautes.link}/${item.id}/projet/${item.id}`} className="dropdown-item">Voir</Link>
                                                <Link to={`${route.admin.communautes.link}/${communaute_id}/projet/${item.id}/edit`} className="dropdown-item">Editer</Link>
                                                {/* <Link className="dropdown-item">Supprimer</Link> */}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
                <div className="row my-4 fs-6 justify-content-between">
                    <div className="col-lg-6">
                    Affichage de .. résultats
                    </div>
                    <div className="col-lg-6">
                        <div className="float-end">Pagination</div>
                    </div>
                </div>
            </div>
            <hr className="my-4"/>
            <div className="d-flex flex-column">
                <h4 className="fw-bold">Membres</h4>
                <div className="row mt-4">
                    <div className="col-lg-4">
                        <div className="d-flex align-items-center mb-3 text-dark">
                            {/* <FontAwesomeIcon icon={faSearch} className="d-inline-block me-2"/> */}
                            <input className="form-control" placeholder="Rechercher" />
                        </div>
                    </div>
                </div>
                <table className="Admin__Table px-0">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Prénom</th>
                            <th scope="col">Téléphone</th>
                            <th scope="col">Date d'Inscription</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { loaded ?
                            ( associationMembers.length === 0 ?
                                (<tr>
                                    {/* <td colSpan="6" className="text-center"> Aucun membre trouvé</td> */}
                                    <th scope="row">1</th>
                                    <td>Anga</td>
                                    <td>John</td>
                                    <td>699 999 999</td>
                                    <td>{ moment().format("D MMMM YYYY H:mm") }</td>
                                    <td></td>
                                </tr>)
                                : 
                                associationMembers.map( (item, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.memberNumber}</td>
                                        <td>{ moment(item.created_at).format("D MMMM YYYY H:mm") }</td>
                                        <td></td>
                                    </tr>
                                ))
                            ) :
                            (<tr>
                                <td colSpan="6" className="text-center">
                                    <LoadingSpinner />
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
                <div className="row my-4 fs-6 justify-content-between">
                    <div className="col-lg-6">
                    Affichage de .. résultats
                    </div>
                    <div className="col-lg-6">
                        <div className="float-end">Pagination</div>
                    </div>
                </div>
            </div>
        </div>
    )
    }

export default AssociationDetail;
