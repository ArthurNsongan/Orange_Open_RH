import React, { useEffect, useState } from 'react'

import { faEllipsisV, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import apiRoutes from "../../../config/apiConfig"
import { Pagination } from "antd"
import 'antd/dist/antd.css'
// import Button from '../../../components/Button'

import $ from "jquery"
import { Link, NavLink } from 'react-router-dom';
import LoadingSpinner from '../../../components/LoadingSpinner';
import moment from 'moment';
// import '@popperjs/core';
// import 'bootstrap'

let associationTypesStatic = require("../../../utils/associationTypes.json");

let route = require('../../../utils/route.json');

function Associations(props) {

    const [associations, setAssociations] = useState([]);

    const [association, setAssociation] = useState({})

    const [loaded, setLoaded] = useState(false)

    const [associationTypes, setAssociationTypes] = useState([]);

    // const taille = 10;
    const handleFilter = (e) => {
        
    }

    const IsRightAssociation = (item, search) => {
        return ( item.name.includes(`${search}`) || item.description.includes(`${search}`) )
    }

    const [paginationOptions, setPaginationOptions] = useState({
        total: 0,
        perPage: 5,
        currentPage: 1
    })

    useEffect(() => {
        axios.get(`${apiRoutes.AssociationTypesURL}`)
        .then( response => {
            setAssociationTypes(response.data)
            console.log(response.data)
            // let select = document.querySelector("select[name='type_id']");
            // console.log(select)
            // select.change();
            window.$("select[name='type_id']").trigger("change");
        })

        axios.get(`${apiRoutes.AssociationsURL}/paginate/${paginationOptions.perPage}?page=${paginationOptions.currentPage}`)
        .then( response => { 
            setPaginationOptions(
                {
                    total: response.data.meta.total,
                    perPage: response.data.meta.per_page,
                    currentPage: response.data.meta.current_page,
                }
            )
            setAssociations(response.data.data)
            console.log(response.data)
        })

        setTimeout(() => setLoaded(true), 500)

    }, [props])

    const onPaginationChange = (currentPage, perPage) => {
        setLoaded(false);
        axios.get(`${apiRoutes.AssociationsURL}/paginate/${perPage}?page=${currentPage}`)
        .then( response => { 
            setPaginationOptions(
                {
                    total: response.data.meta.total,
                    perPage: response.data.meta.per_page,
                    currentPage: response.data.meta.current_page,
                }
            )
            setAssociations(response.data.data)
            setLoaded(true)
            console.log(response.data)
        })
    }

    const handleSubmitNewAssociation = () => {
        console.log("Association Object : \n");
        const { assocDocs , ...assocTemp} = association
        console.log(assocTemp);
        console.log("Association FormData");
        var assocFormData = new FormData();
        assocFormData.append("name", assocTemp.name)
        assocFormData.append("description", assocTemp.description)
        assocFormData.append("logo", assocTemp.logo)
        assocFormData.append("bankAccountNumber", parseInt(assocTemp.bankAccountNumber))
        assocFormData.append("address", assocTemp.address)
        assocFormData.append("memberNumber", parseInt(assocTemp.memberNumber))
        assocFormData.append("potentialMemberNumber", parseInt(assocTemp.potentialMemberNumber))
        assocFormData.append("phoneNumber", parseInt(assocTemp.phoneNumber))
        assocFormData.append("type_id", parseInt(assocTemp.type_id))
        // console.log(assocFormData.getAll("name"))

        let axiosRequest = axios.create();
        axiosRequest.post(apiRoutes.AssociationsURL, assocFormData)
            .then(response => {
                console.log(response.data)
            }).catch( ({ response }) => {
                console.log(response)
            })
        
        console.log(axiosRequest)
    }

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
    
    return (
        <div className="d-flex flex-column">
            {/* <h2>Communautés</h2> */}
            <div className="d-flex align-items-center justify-content-between bg-white shadow-sm py-3 px-2 mb-3">
                <h4 className="fw-bold pe-3 my-0">Nouvelle communauté</h4>
                <div>
                    <NavLink exact to={`${route.admin.communautes.link}/add`}><button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addAssociationForm"><FontAwesomeIcon icon={faPlus} className="d-inline-block me-3"></FontAwesomeIcon>Ajouter</button></NavLink>
                </div>
            </div>
            <div className="row bg-white shadow-sm px-2 py-4 mb-3 mx-0">
                <h5 className="fw-bold mb-4">Communautés</h5>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="d-flex align-items-center mb-3 text-dark">
                            <FontAwesomeIcon icon={faSearch} className="d-inline-block me-2"/>
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
                            <th scope="col">Membres</th>
                            <th scope="col">Date de Création</th>
                            <th scope="col" width="100px">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="fs-6">
                        { loaded ? associations.map( (item, index) => (
                            <tr key={index}>
                                <NavLink className="d-contents" to={`${route.admin.communautes.link}/${item.id}`}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td width="200px">{item.description.length > 100 ? item.description.slice(0, 100) + "..." : item.description}</td>
                                    <td>{item.memberNumber}</td>
                                    <td>{moment(item.create_date).format("Do MMMM YYYY")}</td>
                                    <td>
                                        <button type="button" className="btn bn-white" id="threeDotsDropDown" data-bs-toggle="dropdown" aria-expanded="false">
                                            <FontAwesomeIcon icon={faEllipsisV} />
                                        </button>
                                        <div className="dropdown-menu left-0" aria-labelledby="threeDotsDropDown">
                                            <Link to={`${route.admin.communautes.link}/${item.id}`} className="dropdown-item">Voir</Link>
                                            <Link to={`${route.admin.communautes.link}/edit/${item.id}`} className="dropdown-item">Editer</Link>
                                            <Link className="dropdown-item">Supprimer</Link>
                                        </div>
                                    </td>
                                </NavLink>
                                </tr>
                        )) : (
                            <tr>
                                <td colSpan="8" className="text-center">
                                    <LoadingSpinner />
                                </td>
                            </tr>
                        )}
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
                {/* <div className="modal fade" id="addAssociationForm" tabIndex="-1" aria-labelledby="addAssociationFormLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold h3" id="addAssociationFormLabel">Ajouter une communauté</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div class="row">
                                <div className="d-flex flex-column mb-3">
                                    <label className="d-block mb-2">Nom</label>
                                    <input className="form-control" onChange={handleAddNewTextInputChange} type="text" name="name" value={association.name} placeholder="Nom de la communauté" />
                                </div>
                                <div className="d-flex flex-column mb-3">
                                    <label className="d-block mb-2">Description</label>
                                    <textarea className="form-control" name="description" onChange={handleAddNewTextInputChange} value={association.description} placeholder="Description de la communauté"></textarea>
                                </div>
                                <div className="d-flex flex-column mb-3">
                                    <label className="d-block mb-2">Addresse</label>
                                    <input className="form-control" type="text" name="address" onChange={handleAddNewTextInputChange} value={association.address} placeholder="Adresse de la communauté" />
                                </div>
                                <div className="d-flex flex-column mb-3">
                                    <label className="d-block mb-2">Numéro de Compte Bancaire</label>
                                    <input className="form-control" type="number" name="bankAccountNumber" onChange={handleAddNewTextInputChange} value={association.bankAccountNumber} placeholder="Compte Bancaire" />
                                </div>
                                <div className="d-flex flex-column mb-3">
                                    <label className="d-block mb-2">Nombre de membres</label>
                                    <input className="form-control" type="text" name="memberNumber" onChange={handleAddNewTextInputChange} value={association.memberNumber} placeholder="Nombre de membres" />
                                </div>
                                <div className="d-flex flex-column mb-3">
                                    <label className="d-block mb-2">Nombre potentiel de membres</label>
                                    <input className="form-control" type="text" name="potentialMemberNumber" onChange={handleAddNewTextInputChange} value={association.potentialMemberNumber} placeholder="Nombre potentiel de membres" />
                                </div>
                                <div className="d-flex flex-column mb-3">
                                    <label className="d-block mb-2">Numéro de Téléphone</label>
                                    <input className="form-control" type="text" name="phoneNumber" onChange={handleAddNewTextInputChange} value={association.phoneNumber } placeholder="Numéro de Téléphone" />
                                </div>
                                <div className="d-flex flex-column mb-3">
                                    <label className="d-block mb-2">Logo</label>
                                    <input className="form-control" type="file" name="logo" onChange={handleAddNewFileInputChange}  placeholder="Logo" />
                                </div>
                                <div className="d-flex flex-column mb-3">
                                    <label className="d-block mb-2">Type</label>
                                    <select className="form-control" name="type_id" onChange={handleAddNewTextInputChange} value={association.type_id}>
                                        { associationTypes.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>{item.name}</option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="d-flex flex-column mb-3">
                                    <label className="d-block mb-2">Documents</label>
                                    <input className="form-control" type="file" multiple name="assocDocs" onChange={handleAddNewMultiFileInputChange}  placeholder="Documents de l'association" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmitNewAssociation}>Enregistrer</button>
                        </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Associations
