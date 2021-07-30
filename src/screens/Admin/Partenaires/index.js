import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../components/LoadingSpinner';
import apiRoutes from '../../../config/apiConfig'


let route = require('../../../utils/route.json');
const _ = require("lodash")

function Partenaires(props) {

    let history = useHistory()

    const getPartenaires = () => {
        setLoaded(false);
        axios.get(`${apiRoutes.PartenairesURL}`)
        .then( response => {
            console.log(response.data)
            setPartenaires(response.data)
            try {
                setPaginationOptions(
                    {
                        total: response.data.meta.total,
                        perPage: response.data.meta.per_page,
                        currentPage: response.data.meta.current_page,
                    }
                )
            } catch (error) { }
            setLoaded(true)
        })
    }

    const [partenaires, setPartenaires] = useState([])

    const [loaded, setLoaded] = useState(false)

    const [formPartenaire, setFormPartenaire] = useState({ name: ""})

    const updatePartenaire = (id) => {
        axios.put(`${apiRoutes.PartenairesURL}`)
        .then(response => {
            console.log(response.data)
        })
    }
    const [paginationOptions, setPaginationOptions] = useState({
        total: 0,
        perPage: 5,
        currentPage: 1
    })

    const [searchKey, setSearchKey] = useState("")

    useEffect(() => {
        getPartenaires()
        return () => {
            
        }

    }, [props])

    const CreatePartenaire = () => {
        axios.post(`${apiRoutes.PartenairesURL}`, formPartenaire)
        .then( response => {
            console.log(response.data)
            toast.success(<div className="d-flex align-items-center">Partenaire créé avec succès.</div>)
            history.push(history.location.pathname)
            setFormPartenaire({name: ""})
        }).catch( exception => {
            console.log(exception.response)
        })
    }

    let partenairesToShow = searchKey !== "" ? partenaires.filter( item => (item.name.toLowerCase().includes(searchKey.toLowerCase()) ) ) : partenaires

    return (
        <div className="d-flex flex-column">
            <div className="d-flex align-items-center justify-content-between bg-white shadow-sm py-3 px-2 mb-3">
                <h4 className="fw-bold pe-3 my-0">Nouveau Partenaire</h4>
                <div>
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addPartenaireForm"><FontAwesomeIcon icon={faPlus} className="d-inline-block me-3"></FontAwesomeIcon>Ajouter</button>
                </div>
            </div>
            <div className="modal fade" id="addPartenaireForm" tabIndex="-1" aria-labelledby="" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold h3" id="addAssociationFormLabel">Ajouter un partenaire</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div class="row">
                                <div className="d-flex flex-column mb-3">
                                    <label className="d-block mb-2">Nom</label>
                                    <input className="form-control" onChange={(e)=> setFormPartenaire({name: e.target.value}) } type="text" name="name" value={searchKey} placeholder="Nom du Partenaire" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" disabled={formPartenaire.name.length < 2} onClick={CreatePartenaire}>Enregistrer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row bg-white shadow-sm px-2 py-4 mb-3 mx-0">
                <h5 className="fw-bold mb-4">Partenaires</h5>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="d-flex align-items-center mb-3 text-dark">
                            <FontAwesomeIcon icon={faSearch} className="d-inline-block me-2"/>
                            <input className="form-control" onChange={(e)=>{ setSearchKey(e.target.value) }} placeholder="Rechercher" />
                        </div>
                    </div>
                </div>
                <table className="Admin__Table px-0">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" >Nom</th>
                            {/* <th scope="col" width="400px">Description</th>
                            <th scope="col">Date de Création</th> */}
                            <th scope="col">Date de création</th>
                            <th scope="col" width="100px">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="fs-6">
                        { loaded ? (
                            partenairesToShow.length > 0 ? partenairesToShow.map( (item, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{moment(item.created_at).format("Do MMMM YYYY")}</td>
                                </tr>
                            )) : 
                            <tr>
                                <td colSpan="4" class="text-center">Pas de partenaires correspondant</td>
                            </tr>
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">
                                    <LoadingSpinner />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Partenaires
