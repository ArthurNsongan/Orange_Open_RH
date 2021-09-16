import { faEllipsisV, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Pagination } from 'antd';
import axios from 'axios'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import DataTable from '../../../components/DataTable';
import LoadingSpinner from '../../../components/LoadingSpinner';
import apiRoutes from '../../../config/apiConfig'
import { createPartner, updatePartner } from '../../../services/API';


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

    const [tableHeadFilter, setTableHeadFilter] = useState({ ascending : true, column:""})

    const [partenaires, setPartenaires] = useState([])

    const [loaded, setLoaded] = useState(false)

    const [editPartenaire, setEditPartenaire] = useState(null)

    const [formPartenaire, setFormPartenaire] = useState({ name: "", logo: ""})

    const [paginationOptions, setPaginationOptions] = useState({
        total: 0,
        perPage: 5,
        currentPage: 1
    })

    const handleTableHeadFilter = (name) => {
        let tableHeadFilterTmp =  { ...tableHeadFilter}
        if(tableHeadFilterTmp.column === name) {
            tableHeadFilterTmp.ascending = !tableHeadFilterTmp.ascending
        } else {
            tableHeadFilterTmp.column = name
            tableHeadFilterTmp.ascending = true
        }
        setTableHeadFilter(tableHeadFilterTmp)
        // alert(name)
    }

    const [searchKey, setSearchKey] = useState("")

    useEffect(() => {
        getPartenaires()
        return () => {
            
        }

    }, [props])

    const CreatePartenaire = () => {
        let formPartenaireData = new FormData();
        formPartenaireData.append("name", formPartenaire.name)
        formPartenaireData.append("logo", formPartenaire.logo)
        createPartner( formPartenaireData, response => {
            console.log(response.data)
            toast.success(<div className="d-flex align-items-center">Partenaire créé avec succès.</div>)
            history.push(history.location.pathname)
            setFormPartenaire({name: "", logo: ""})
        }, ( exception ) => {
            console.log(exception?.response)
        })
    }

    const UpdatePartenaire = () => {
        let formPartenaireData = new FormData();
        formPartenaireData.append("name", editPartenaire.name)
        // if( typeof(editPartenaire.logo) === "object")
        formPartenaireData.append("logo", editPartenaire.logo)
        updatePartner( editPartenaire.id, formPartenaireData,
            (response) => {
                console.log(response.data)
                toast.success(<div className="d-flex align-items-center">Partenaire modifié avec succès.</div>)
                history.push(history.location.pathname)
                setEditPartenaire(null);
            }, ( exception ) => {
                console.log(exception?.response)
            }
        )
    }

    const onPaginationChange = () => {

    }

    let partenairesToShow = searchKey !== "" ? partenaires.filter( item => (item.name.toLowerCase().includes(searchKey.toLowerCase()) ) ) : partenaires
    partenairesToShow = tableHeadFilter.ascending ? 
        _.sortBy(partenairesToShow, (item) => { return item[tableHeadFilter.column]})
        : _.sortBy(partenairesToShow, (item) => { return item[tableHeadFilter.column]}).reverse();
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
                            <h5 className="modal-title fw-bold h3" id="addPartenaireFormLabel">Ajouter un partenaire</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div class="row">
                                <div className="d-flex flex-column mb-3">
                                        <label className="d-block mb-2">Nom :</label>
                                        <input className="form-control" onChange={(e)=> setFormPartenaire({...formPartenaire, name: e.target.value }) } type="text" name="name" accept="image/*" value={formPartenaire.name} placeholder="Nom du Partenaire" />
                                    </div>
                                    <div className="d-flex flex-column mb-3">
                                        <label className="d-block mb-2">Image :</label>
                                        <input className="form-control" onChange={(e)=> setFormPartenaire({...formPartenaire, logo: e.target.files[0] }) } type="file" accept="image/*" name="logo" placeholder="Image du Partenaire" />
                                        {
                                            typeof(formPartenaire.logo) !== "undefined" && (
                                                <img src={ typeof(formPartenaire.logo) === "string" ? `${apiRoutes.StorageURL}/${formPartenaire.image}` 
                                                    : URL.createObjectURL(formPartenaire.logo) } alt="Logo du Partenaire"
                                                    className="img-fluid" style={{ width: "60px" }} />
                                            )
                                        }
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
            <div className="modal fade" id="editPartenaireForm" tabIndex="-1" aria-labelledby="" aria-hidden="true">
                <div className="modal-dialog">                
                    { ( editPartenaire !== null ) &&
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold h3" id="editPartenaireFormLabel">Editer un partenaire</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div class="row">
                                <div className="d-flex flex-column mb-3">
                                    <label className="d-block mb-2">Nom :</label>
                                    <input className="form-control" onChange={(e)=>{ setEditPartenaire({...editPartenaire, name: e.target.value }); console.log(editPartenaire); } } type="text" name="name" value={editPartenaire.name} placeholder="Nom du Partenaire" />
                                </div>
                                <div className="d-flex flex-column mb-3">
                                    <label className="d-block mb-2">Image :</label>
                                    <input className="form-control" onChange={(e)=>{ setEditPartenaire({...editPartenaire, logo: e.target.files[0] }); console.log(editPartenaire) }} type="file" name="logo" placeholder="Image du Partenaire" />
                                    {
                                        typeof(editPartenaire.logo) !== "undefined" && (
                                            <img src={ typeof(editPartenaire.logo) === "string" ? `${apiRoutes.StorageURL}/${editPartenaire.logo}` 
                                                : URL.createObjectURL(editPartenaire.logo) } alt="Logo du Partenaire - Edit"
                                                className="img-fluid" style={{ width: "60px" }} />
                                        )
                                    }
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" disabled={editPartenaire.name.length  < 2 && editPartenaire.image == null} 
                                    onClick={UpdatePartenaire}>Enregistrer</button>
                            </div>
                        </div>
                    </div>
                    }
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
                <DataTable emptyMessage="Aucun résultat" loaded={loaded} datas={partenairesToShow} columns={[
                    {title: "#", dataTitle: "id", sortable: false, renderData: (item, index) => ( index + 1 )},
                    {title: "Nom", dataTitle: "name"},
                    {title: "Date de création", dataTitle: "created_at", renderData: (item) => ( moment(item.created_at).format("Do MMMM YYYY HH:mm")) },
                    {title: "Logo", renderData: (item) => ( item.logo !== "" && item != undefined 
                        ? <img src={`${apiRoutes.StorageURL}/${item.logo}`} alt="LogoPartenaire" className="LogoPartenaire__Admin" /> : <span>Aucun</span> )},
                    {title: "Actions", renderData: (item, index) => (
                        <>
                            <button type="button" className="btn bn-white" id="threeDotsDropDown" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                            <div className="dropdown-menu left-0" aria-labelledby="threeDotsDropDown">
                                <a href="#" className="dropdown-item" 
                                    onClick={(e) => { e.preventDefault(); setEditPartenaire(item); window.$("#editPartenaireForm").modal("show"); }} >Editer</a>
                            </div>
                        </>
                    ), sortable: false},
                ]}/>
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
                {/* <table className="Admin__Table px-0">
                    <thead>
                        <tr>
                            <th scope="col" onClick={() => { handleTableHeadFilter("id") }}><span className={`d-block ${tableHeadFilter.column === "id" ? "dropdown-toggle" :""} ${tableHeadFilter.ascending === false ? "return" :""}`}>#</span></th>
                            <th scope="col" onClick={() => { handleTableHeadFilter("name") }}><span className={`d-block ${tableHeadFilter.column === "name" ? "dropdown-toggle" :""} ${tableHeadFilter.ascending === false ? "return" :""}`}>Nom</span></th>
                            {/* <th scope="col" width="400px">Description</th> */}
                            {/* <th scope="col">Date de Création</th>
                            <th scope="col" onClick={() => { handleTableHeadFilter("created_at") }}><span className={`d-block ${tableHeadFilter.column === "created_at" ? "dropdown-toggle" :""}  ${tableHeadFilter.ascending === false ? "return" :""}`}>Date de création</span></th>
                            <th scope="col" width="100px">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="fs-6">
                        { loaded ? (
                            partenairesToShow.length > 0 ? partenairesToShow.map( (item, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{moment(item.created_at).format("Do MMMM YYYY HH:mm")}</td>
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
                </table> */}
            </div>
        </div>
    )
}

export default Partenaires
