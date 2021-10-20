import React, { useEffect, useState } from 'react'

import { faArrowLeft, faBell, faEdit, faEllipsisV, faEye, faPlus, faFileExport, faUserLock } from '@fortawesome/free-solid-svg-icons'
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
import { activateMember, getAssociationInactiveMembers, getAssociationMembers, getAssociationProjects } from '../../../../services/API';
import { exportMembers } from '../../../../services/associationService';
import { defaultUserRoles, getRoles, getSupervisorAssociationId } from '../../../../services/Auth';
import { Pagination } from 'antd';
import DataTable from '../../../../components/DataTable';
import Button from '../../../../components/Button';
import { formatThousandsNumber } from '../../../../config/constants';

// import '@popperjs/core';
// import 'bootstrap'

// let associationTypesStatic = require("../../../../utils/associationTypes.json")
let route = require('../../../../utils/route.json')

var _ = require('lodash');


function SupervisorAssociationDetail(props) {
    // const [associations, setAssociations] = useState([]);

    const [association, setAssociation] = useState({})

    const [lastProjects, setLastProjects] = useState([])

    const [inactiveMembers, setInactiveMembers] = useState([])

    const [loaded, setLoaded] = useState(false)

    const [inactiveMembersLoaded, setInactiveMembersLoaded] = useState(false)
    
    const [members, setMembers] = useState([])

    // const [associationTypes, setAssociationTypes] = useState([]);

    // const taille = 10;

    const communaute_id = getSupervisorAssociationId()

    useEffect(() => {

        // alert(getRoles().find(item => item.name === defaultUserRoles.SUPERVISOR_ROLE ).pivot.association_id)

        axios.get(`${apiRoutes.AssociationsURL}/${communaute_id}`)
        .then( response => {
            setAssociation(response.data)
            console.log(response.data)
        })

        getAssociationProjects(communaute_id, (res) => {
            setLastProjects(res.data)
            console.log(res.data)
        }, (res) => { console.log(res.data)})

        getAssociationMembers(communaute_id, (res) => {
            setMembers(res.data)
            console.log(res.data)
        }, (exception) => { console.log(exception?.response?.data) })


        setTimeout(() => {
            setLoaded(true);
        }, 3000)

    }, [communaute_id])

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

    // const getAssociationProjects = (association_id) => {
    //     axios.get(`${apiRoutes.AssociationProjectsURL}/${association_id}`)
    //     .then( response => { 
    //         setLastProjects(response.data)
    //         console.log(response.data)
    //     })
    // }

    // const { communaute_id } = useParams();

    const paginationOptions = {
        total: 0,
        perPage: 5,
        currentPage: 1
    }

    const [notifyRequest, setNotifyRequest] = useState({
        processing: false,
        content: ""
    })

    const exportMembersAssociations = () => {
        exportMembers(association.id, (response) => {
            if(exportProgress === false) {
                setExportProgress(true);
                console.log("exportMembersAssociations", response);
                const resLink = URL.createObjectURL(response.data);
                console.log("exportMembersFileURL", resLink);
                const a = window.document.createElement("a");
                a.setAttribute("href", resLink);
                a.download = `${association.name}_membres.xlsx`;
                a.click();
                setExportProgress(false);
                a.remove();
            }
        }, (exception) => {

        })
    }

    const notifyMembers = () => {
        setNotifyRequest({...notifyRequest, processing: true});
        setTimeout(() => { setNotifyRequest({...notifyRequest, processing: false}); })
        toast.success(`Tous les utilisateurs de l'association ${association.name} ont été relancées`)
    }


    const [projectsPaginationOptions, setProjectsPaginationOptions] = useState(paginationOptions)

    const [membersPaginationOptions, setMembersPaginationOptions] = useState(paginationOptions)

    const [exportProgress, setExportProgress] = useState(false);

    const onProjectsPaginationChange = (currentPage, perPage) => {
        // getProjects(currentPage, perPage);
    }

    const onMembersPaginationChange = (currentPage, perPage) => {
        // getProjects(currentPage, perPage);
    }

    function getAssocInactiveMembers() {
        getAssociationInactiveMembers(communaute_id, (response) => {
            console.log(response.data)
            setInactiveMembers(response.data)
            setInactiveMembersLoaded(true);
        }, exception => {
            console.log(exception?.response?.data)
        })
    }

    

    const memberActivation = (member_id, index) => {
        activateMember( member_id, communaute_id, (response) => {
            let membersTemp = members
            console.log(membersTemp[index])
            let memberIsActive = ( membersTemp[index].pivot.is_active === 1 ? 0 : 1 )
            console.log(membersTemp[index])
            membersTemp[index].pivot.is_active = memberIsActive
            setMembers([...membersTemp])
            memberIsActive === 1 ? 
                toast.success(`L'utilisateur ${membersTemp[index].email} est maintenant actif !`) :
                toast.error(`L'utilisateur ${membersTemp[index].email} est maintenant désactivé !`)

        }, (exception) => {
            console.log(exception?.response)
        })
    }

    return (
        <div className="row bg-white shadow-sm px-2 py-4 mb-3 mx-0">
            {/* <h2>Communautés</h2> */}
            { !_.isEqual({}, association) ? <Helmet title={association.name + " - Communautés"} /> : "" }
            <div className="d-flex flex-column">
                {/* <NavLink className="d-flex align-items-center mb-3" to={`${route.admin.communautes.link}`}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <span className="d-block mx-2 fs-6 mb-0">Revenir à la liste</span>
                </NavLink> */}
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
                    <div className="m-2">
                        <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#projectMembersNotifyingModal"><FontAwesomeIcon icon={faBell} className="d-inline-block me-3"></FontAwesomeIcon>Relancer les membres</button>
                    </div>    
                    <div className="m-2">
                        <button className="btn btn-secondary-2 text-white" data-bs-toggle="modal" data-bs-target="#inactiveAssociationMembersModal" onClick={getAssocInactiveMembers}><FontAwesomeIcon icon={faUserLock} className="d-inline-block me-3"></FontAwesomeIcon>Membres inactifs</button>
                    </div>
                </div>
            </div>
            { association.projets != null ?
                (<>
                    <hr className="my-4"/>
                    <div className="d-flex flex-column">
                        <h4 className="fw-bold">Projet en cours</h4>
                        <h4 className="mt-3 fw-bold mx-3">{ association.projets.title }</h4>
                        <div className="my-3 mx-3">
                            <ProgressBar percent={association.projets.stat.pourcentage.replace("%","")} />
                            <div className="row">
                                <span className="d-block fw-bold col-4 fs-5 my-2">{association.projets.stat.pourcentage}</span>
                                <span className="d-block fs-5 col-4 my-2"><b>{formatThousandsNumber(association.projets.cost - association.projets.stat.reste)} acquis</b><br/>sur {formatThousandsNumber(association.projets.cost)} F</span>
                                <span className="d-block fs-5 col-4 my-2"><b>{formatThousandsNumber(association.projets.stat.contributions)}</b> contributions</span>
                            </div>
                        </div>
                        <NavLink className="my-2" exact to={`${route.admin.communautes.link}/${communaute_id}/projet/${association.projets.id}`}>
                            <button className="btn btn-secondary-2 text-white"><FontAwesomeIcon icon={faEye} className="d-inline-block me-3"></FontAwesomeIcon>Voir le projet</button>
                        </NavLink>
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
                
                <DataTable className="Admin__Table__Fixed" emptyMessage="Aucun projet trouvé !" loaded={loaded} datas={lastProjects} columns={[
                    {title: "#", renderData: (item, index) => { return <span className="fw-bold px-2">{ index + 1 }</span> }, sortable: false},
                    {title: "Nom", dataTitle: "title"},
                    // {title: "Description", dataTitle:"description", renderData: (item) => (item.description.length > 100 ? <span className="alert-info text-primary fw-bold">Texte enrichi</span> : item.description)},
                    {title: "Etat du projet", dataTitle:"status", renderData: (item) => ( _.capitalize(item.status.replaceAll("_"," ") ) ) },
                    {title: "Date de fin des contributions",dataTitle:"deadlines",  renderData: (item) => ( moment(item.deadlines).format("Do MMMM YYYY")) },
                    {title: "Actions", renderData: (item) => (
                        <>
                            <button type="button" className="btn bn-white" id="threeDotsDropDown" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                            <div className="dropdown-menu left-0" aria-labelledby="threeDotsDropDown">
                                <Link to={`${route.admin.communautes.link}/${communaute_id}/projet/${item.id}`} className="dropdown-item">Voir</Link>
                                <Link to={`${route.admin.communautes.link}/${communaute_id}/projet/${item.id}/edit`} className="dropdown-item">Editer</Link>
                                {/* <Link className="dropdown-item">Supprimer</Link> */}
                            </div>
                        </>
                    ), sortable: false},
                ]}/>
                {/* <div className="row my-4 fs-6 justify-content-between">
                    <div className="col-lg-6">
                    Affichage de .. résultats
                    </div>
                    <div className="col-lg-6">
                        <div className="float-end">Pagination</div>
                    </div>
                </div> */}
                <div className="row my-4 fs-6 justify-content-between"> 
                    <div className="col-lg-6">
                    Affichage de { projectsPaginationOptions.perPage} résultats
                    </div>
                    <div className="col-lg-6">
                        <Pagination
                            className="d-flex justify-content-end"
                            total={projectsPaginationOptions.total}
                            pageSize={projectsPaginationOptions.perPage}
                            current={projectsPaginationOptions.currentPage}
                            showSizeChanger
                            onChange={onProjectsPaginationChange}
                        />
                    </div>
                </div>
            </div>
            <hr className="my-4"/>
            <div className="d-flex flex-column">
                <h4 className="fw-bold">Membres</h4>
                <div className="row align-items-center mt-4">
                    <div className="col-lg-6">
                        <div className="d-flex align-items-center mb-3 text-dark">
                            {/* <FontAwesomeIcon icon={faSearch} className="d-inline-block me-2"/> */}
                            <input className="form-control" placeholder="Rechercher" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-primary m-2" onClick={exportMembersAssociations}><FontAwesomeIcon icon={faFileExport} className="d-inline-block me-3"></FontAwesomeIcon> Exporter Tout</button>
                        </div>
                    </div>
                </div>
                <DataTable emptyMessage="Aucun membre pour le moment !" loaded={loaded} datas={members} columns={[
                    {title: "#", dataTitle: "id", sortable: false, renderData: (item, index) => ( index + 1 )},
                    {title: "Nom", dataTitle: "name"},
                    {title: "E-mail", dataTitle: "email" },
                    {title: "Date de création", renderData: (item) => ( moment(item.created_at).format("Do MMMM YYYY HH:mm")) },
                    {title: "Statut", renderData: (item) => ( <span className={`badge fw-normal h7 ${item.pivot.is_active === 1 ? "bg-success" : "bg-danger"}`}>{item.pivot.is_active === 1 ? "Activé" : "Inactif"}</span> ), sortable: false},
                    {title: "Actions", renderData: (item, index) => (
                        <>
                            <button type="button" className="btn bn-white" id="threeDotsDropDown" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                            <div className="dropdown-menu left-0" aria-labelledby="threeDotsDropDown">
                                {/* <Link to={`${route.admin.users.link}/${item.id}`} className="dropdown-item">Voir</Link> */}
                                { item.pivot.is_active === 0 
                                    && <button href="#" className="dropdown-item" onClick={() => memberActivation(item.id, index )}>Activer</button> }
                                <Link to={`${route.admin.users.link}/edit/${item.id}`} className="dropdown-item">Editer</Link>
                                {/* <Link className="dropdown-item">Supprimer</Link> */}
                            </div>
                        </>
                    ), sortable: false},
                ]}/>
                <div className="row my-4 fs-6 justify-content-between">
                    <div className="col-lg-6">
                    Affichage de { membersPaginationOptions.perPage} résultats
                    </div>
                    <div className="col-lg-6">
                        <Pagination 
                            className="d-flex justify-content-end"
                            total={membersPaginationOptions.total}
                            pageSize={membersPaginationOptions.perPage}
                            current={membersPaginationOptions.currentPage}
                            showSizeChanger
                            onChange={onMembersPaginationChange}
                        />
                    </div>
                </div>

                <div className="modal fade" id="projectMembersNotifyingModal" tabIndex="-1" aria-labelledby="" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">                
                        <div className="modal-content">
                            <div className="modal-body">
                                <div class="row justify-content-center">
                                    <div className="col-lg-6">
                                        <h2 className="text-center fw-normal headingFunPrim contentCenter">Notifier les membres de <b>{ association.name }</b></h2>
                                    </div>
                                    <div className="d-flex flex-column mt-4 mb-3">
                                        <textarea className="form-control" rows="6" onChange={(e) => { setNotifyRequest({...notifyRequest, content: e.target.value}) }} value={notifyRequest.content} placeholder="Contenu du message de relance"></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                    <button type="button" className="btn btn-primary d-flex align-items-center"
                                        disabled={notifyRequest.processing === true } 
                                        onClick={notifyMembers}>
                                            { ( notifyRequest.processing === true ) && (<LoadingSpinner className="me-2" style={{width: "25px", height: "25px"}} />) } Envoyer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="modal fade" id="inactiveAssociationMembersModal" tabIndex="-1" aria-labelledby="" aria-hidden="true">
                    <div className="modal-dialog modal-fullscreen modal-dialog-centered">                
                        <div className="modal-content">
                            {/* <div className="modal-header">
                                
                            </div> */}
                            <div className="modal-body">
                                <div className="d-flex  justify-content-between">
                                    <div className="d-flex flex-column">
                                        <h3 className="fw-bold">{association.name}</h3>
                                    </div>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="row mt-3 justify-content-center">
                                    <h4 className="text-center">Liste des membres non autorisés à l'association</h4>
                                    <div className="d-flex flex-column mx-3" style={{overflow: "auto", maxHeight: "calc(100vh - 150px)"}}>
                                        <DataTable emptyMessage="Aucun membre inactif pour le moment !" loaded={inactiveMembersLoaded} datas={inactiveMembers} columns={[
                                            {title: "#", dataTitle: "id", sortable: false, renderData: (item, index) => ( index + 1 )},
                                            {title: "Nom", dataTitle: "name"},
                                            {title: "E-mail", dataTitle: "email" },
                                            {title: "Date de création", renderData: (item) => ( moment(item.created_at).format("Do MMMM YYYY HH:mm")) },
                                            {title: "Statut", renderData: (item) => ( <span className={`badge fw-normal h7 ${item.pivot.is_active === 1 ? "bg-success" : "bg-danger"}`}>{item.pivot.is_active === 1 ? "Activé" : "Inactif"}</span> ), sortable: false},
                                            {title: "Actions", renderData: (item, index) => (
                                                <>
                                                    <button type="button" className="btn bn-white" id="threeDotsDropDown" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <FontAwesomeIcon icon={faEllipsisV} />
                                                    </button>
                                                    <div className="dropdown-menu left-0" aria-labelledby="threeDotsDropDown">
                                                        {/* <Link to={`${route.admin.users.link}/${item.id}`} className="dropdown-item">Voir</Link> */}
                                                        { item.pivot.is_active === 0 
                                                            && <button className="dropdown-item" onClick={() => { memberActivation(item.id, index) }}>Activer</button> }
                                                        <Link to={`${route.admin.users.link}/edit/${item.id}`} className="dropdown-item">Editer</Link>
                                                        {/* <Link className="dropdown-item">Supprimer</Link> */}
                                                    </div>
                                                </>
                                            ), sortable: false},
                                        ]}/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
    }

export default SupervisorAssociationDetail;
