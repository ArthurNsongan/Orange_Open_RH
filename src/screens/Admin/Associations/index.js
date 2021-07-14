import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
// import Button from '../../../components/Button'
import $ from "jquery"
import '@popperjs/core';
import 'bootstrap'

let associationTypes = require("../../../utils/associationTypes.json")

function Associations() {
    
    return (
        <div className="d-flex flex-column">
            {/* <h2>Communautés</h2> */}
            <div className="d-flex align-items-center bg-white shadow-sm py-3 px-2 mb-3">
                <h4 className="fw-bold pe-3 my-0">Nouvelle communauté</h4>
                <div>
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addAssociationForm"><FontAwesomeIcon icon={faPlus} className="d-inline-block me-3"></FontAwesomeIcon>Ajouter</button>
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
                            <th scope="col">Nom</th>
                            <th scope="col">Description</th>
                            <th scope="col">Membres</th>
                            <th scope="col">Enregistré le</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry the Bird</td>
                            <td>Larry the Bird</td>
                            <td>@twitter</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
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
                <div className="modal fade" id="addAssociationForm" tabIndex="-1" aria-labelledby="addAssociationFormLabel" aria-hidden="true">
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
                                    <input className="form-control" type="text" name="name" value="" placeholder="Nom de la communauté" />
                                </div>
                                <div className="d-flex flex-column mb-3">
                                    <label className="d-block mb-2">Description</label>
                                    <textarea className="form-control" name="description" placeholder="Nom de la communauté"></textarea>
                                </div>
                                <div className="d-flex flex-column mb-3">
                                    <label className="d-block mb-2">Addresse</label>
                                    <input className="form-control" type="text" name="name" value="" placeholder="Adresse de la communauté" />
                                </div>
                                <div className="d-flex flex-column mb-3">
                                    <label className="d-block mb-2">Type</label>
                                    <select className="form-control">
                                        { associationTypes.map((item) => {
                                            return (
                                                <option>{item.title}</option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="d-flex flex-column mb-3">
                                    <label className="d-block mb-2">Documents</label>
                                    <input className="form-control" type="file" multiple name="assocDocs"  placeholder="Nom de la communauté" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                            <button type="button" className="btn btn-primary">Enregistrer</button>
                        </div>
                        </div>
                    </div>
                    </div>
            </div>
        </div>
    )
}

export default Associations
