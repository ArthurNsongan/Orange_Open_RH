import { faArrowLeft, faBell, faEdit, faEllipsisV, faFileExcel, faFileExport, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Pagination } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import DataTable from '../../../../components/DataTable';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import ProgressBar from '../../../../components/ProgressBar';
import apiRoutes from '../../../../config/apiConfig';
import { formatThousandsNumber } from '../../../../config/constants';
import { getAllPaymentByProject, getProject, getProjectStat } from '../../../../services/API';
import { exportContributions } from '../../../../services/projectService'
let route = require('../../../../utils/route.json')

var _ = require('lodash');

function ProjectDetail(props) {

    const {communaute_id, project_id} = useParams()

    let history = useHistory();

    const [project, setProject] = useState({
        project_plan: "",
        description: "",
        partners: [],
        association_id: communaute_id
    });

    const [stats, setStats] = useState({
        pourcentage: ""
    })

    const [projectPayments, setProjectPayments] = useState([])

    const [currentPayment, setCurrentPayment] = useState({});

    const [loaded, setLoaded] = useState(false)

    const [notifyRequest, setNotifyRequest] = useState({
        processing: false,
        content: ""
    })

    let getProjectSuccess = (response) => {
        console.log(response.data)
        setProject(response.data)
        setLoaded(true)
    }

    const notifyMembers = () => {
        setNotifyRequest({...notifyRequest, processing: true});
        setTimeout(() => { setNotifyRequest({...notifyRequest, processing: false});         toast.success(`Tous les utilisateurs de l'association ${project.holder.name} ont été relancées`)
    }, 2000)
    }

    let getProjectError = (response) => {
        console.log(response?.data)
        setLoaded(true)
    }

    const [paymentsLoaded, setPaymentsLoaded] = useState(false)
    const [projectStatLoaded, setProjectStatLoaded] = useState(false)
    const [exportProgress, setExportProgress] = useState(false);

    useEffect(() => {
        getProject(project_id, getProjectSuccess, getProjectError);

        getProjectStat(project_id, (response) => {
            console.log("project Stats", response.data)
            setStats(response.data)
            setProjectStatLoaded(true);
        }, (exception) => {
            console.log(exception?.response)
        })

        getAllPaymentByProject(project_id, 
            (response) => {
                console.log("projectPaymentsSuccess", response.data)
                setProjectPayments(response.data);
                setPaymentsLoaded(true);
            },
            (exception) => {
                console.log("projectPayments", exception?.response)
            })
    }, [])

    const [paginationOptions, setPaginationOptions] = useState({
        total: 0,
        perPage: 5,
        currentPage: 1
    })
    
    const onPaginationChange = (currentPage, perPage) => {
        // getProjects(currentPage, perPage);
    }

    const seeCurrentContribution = (contribution)  => {
        setCurrentPayment(contribution);
        window.$("#contributionDetailsModal").modal("show");
    }

    const exportProjectContributions = () => {
        exportContributions(project.holder.id, project.id, (response) => {
            if(exportProgress === false) {
                setExportProgress(true);
                console.log("exportProjectContributions", response);
                const resLink = URL.createObjectURL(response.data);
                console.log("exportContributionsUrl", resLink);
                const a = window.document.createElement("a");
                a.setAttribute("href", resLink);
                a.download = `${project.holder.name}_${project.title}_contributions.xlsx`;
                a.click();
                setExportProgress(false);
                a.remove();
            }
        },(exception) => {
            console.log(exception);
        })
    }  

    // const communaute_id = ""

    const [searchKey, setSearchKey] = useState("")

    let filteredData = searchKey !== "" ? 
        projectPayments.filter( item => ( item.subscriberMsisdn.toLowerCase().includes(searchKey.toLowerCase()) || item.txnid.toLowerCase().includes(searchKey.toLowerCase()) ||
            moment(item.created_at).format("Do MMMM YYYY HH:mm").toLowerCase().includes(searchKey.toLowerCase()) || moment(item.created_at).format("Do-MM-YYYY").toLowerCase().includes(searchKey.toLowerCase()) ) ) : projectPayments

    return (
        <div className="d-flex flex-column">
            <h4 className="fw-bold mb-4">Détails du projet</h4>
            <div className="row bg-white shadow-sm px-2 py-4 mb-3 mx-0">
                { 
                    loaded ? 
                    <>
                        <div className="d-flex">
                            <div className="m-2">
                                <button className="btn btn-secondary m-2" data-bs-toggle="modal" data-bs-target="#projectMembersNotifyingModal"><FontAwesomeIcon icon={faBell} className="d-inline-block me-3"></FontAwesomeIcon>Relancer les membres</button>
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <button className="d-flex justify-content-start border-bottom border-color-dark mb-3 btn" onClick={() => { history.goBack(); }}>
                                <FontAwesomeIcon icon={faArrowLeft} className="fa-2x me-3" />
                                <div className="py-3 text-start">
                                    <h2 className="mb-0 fw-bold ">{project.title}</h2>
                                    <span className="fs-6">Par <b>{ project.holder.name }</b></span>
                                </div>
                            </button>
                            <div className="mx-3">
                                <ProgressBar percent={stats.pourcentage.replace("%","")} />
                                <div className="row">
                                    <span className="d-block fw-bold col-4 fs-5 my-2">{stats.pourcentage}{ !stats.pourcentage.includes("%") && "%" }</span>
                                    <span className="d-block fs-5 col-4 my-2"><b>{formatThousandsNumber(project.cost - stats.reste)} FCFA acquis</b><br/>sur {formatThousandsNumber(project.cost)} F CFA</span>
                                    <span className="d-block fs-5 col-4 my-2"><b>{ stats.contributions }</b> contributions</span>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-primary m-2" onClick={exportProjectContributions}><FontAwesomeIcon icon={faFileExport} className="d-inline-block me-3"></FontAwesomeIcon> Exporter Tout</button>
                        </div>
                        <div className="d-flex flex-column mx-2 mt-5">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="d-flex justify-content-start mb-3 text-dark">
                                        <FontAwesomeIcon icon={faSearch} className="d-inline-block me-2"/>
                                        <input className="form-control" placeholder="Rechercher" onChange={(e) => setSearchKey(e.target.value) }/>
                                    </div>
                                </div>
                            </div>
                            <DataTable emptyMessage="Aucune contribution pour le moment !" loaded={paymentsLoaded} datas={filteredData} columns={[
                                {title: "#", dataTitle: "id", sortable: false, renderData: (item, index) => ( index + 1 )},
                                {title: "Numéro OM", dataTitle: "subscriberMsisdn"},
                                {title: "Montant", renderData: (item) => ( `${formatThousandsNumber(parseInt(item.amount))} F CFA` ) },
                                {title: "N° Transaction", dataTitle: "tnxid"},
                                {title: "Date de contribution", renderData: (item) => ( moment(item.created_at).format("Do MMMM YYYY HH:mm")) },
                                // {title: "Statut", renderData: (item) => ( <span className={`badge fw-normal h7 ${item.status === "FAILED" ? "bg-danger" : "bg-primary"}`}>{ item.status }</span> ), sortable: false},
                                {title: "Actions", renderData: (item) => (
                                    <>
                                        {/* <button type="button" className="btn bn-white" id="threeDotsDropDown" data-bs-toggle="dropdown" aria-expanded="false">
                                            <FontAwesomeIcon icon={faEllipsisV} />
                                        </button> */}
                                        {/* <div className="dropdown-menu left-0" aria-labelledby="threeDotsDropDown"> */}
                                            {/* <Link to={`${route.admin.users.link}/${item.id}`} className="dropdown-item">Voir</Link> */}
                                            <button className="btn btn-primary" onClick={() => { seeCurrentContribution(item) }}>Détails</button>
                                        {/* </div> */}
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

                            <div className="modal fade" id="contributionDetailsModal" tabIndex="-1" aria-labelledby="" aria-hidden="true">
                                <div className="modal-dialog modal-lg modal-dialog-centered">                
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <div class="modal-header row justify-content-center">
                                                <h2 className="text-center fw-bold">Détails de la Contribution</h2>
                                            </div>
                                            <div className="row fs-6">
                                                <div className="col-lg-6 py-3">
                                                    Numéro du contributeur : <b>{currentPayment.subscriberMsisdn}</b>
                                                </div>
                                                <div className="col-lg-6 py-3">
                                                    Montant : <b>{currentPayment.amount} FCFA</b>
                                                </div>
                                                <div className="col-lg-6 py-3">
                                                    Date : <b>{moment(currentPayment.created_at).format("Do MMMM YYYY HH:mm")}</b>
                                                </div>
                                                <div className="col-lg-6 py-3">
                                                    Statut de la transaction : <b>{currentPayment.status}</b>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { setCurrentPayment({}) }}>Fermer</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal fade" id="projectMembersNotifyingModal" tabIndex="-1" aria-labelledby="" aria-hidden="true">
                                <div className="modal-dialog modal-lg modal-dialog-centered">                
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <div class="row justify-content-center">
                                                <div className="col-lg-6">
                                                    <h4 className="text-center fw-normal headingFunPrim contentCenter">Notifier les membres par rapport au projet <br/><b>{project.title}</b> </h4>
                                                </div>
                                                <div className="d-flex flex-column mb-3 mt-4">
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
                        </div>
                </>
            : <LoadingSpinner />
                }
            </div>
        </div>
    )
}

export default ProjectDetail
