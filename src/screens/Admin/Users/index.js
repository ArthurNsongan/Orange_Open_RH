import { faEllipsisV, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Pagination } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from '../../../components/Button'
import DataTable from '../../../components/DataTable'
import { formatThousandsNumber } from '../../../config/constants'
import { getUsers, getUsersPagination } from '../../../services/API'


let route = require('../../../utils/route.json');

function Users(props) {

    const [users, setUsers] = useState([])

    const [paginationOptions, setPaginationOptions] = useState({
        total: 0,
        perPage: 5,
        currentPage: 1
    })

    const [loaded, setLoaded] = useState(false)

    const onPaginationChange = (currentPage, perPage) => {
        setLoaded(false);
        getUsersPagination( currentPage, perPage, (response) => {
            setPaginationOptions(
                {
                    total: response.data.total,
                    perPage: response.data.per_page,
                    currentPage: response.data.current_page,
                }
            )
            setUsers(response.data.data)
            setLoaded(true);
        }, (exception) => {
            if(exception.response) { console.log(exception.response) }
            else if(exception.request) { console.log(exception.request) }
            else { console.log(exception.message) }
            setLoaded(true);
        })
    }

    useEffect(() => {
        getUsersPagination( paginationOptions.currentPage, paginationOptions.perPage, (response) => {
            setPaginationOptions(
                {
                    total: response.data.total,
                    perPage: response.data.per_page,
                    currentPage: response.data.current_page,
                }
            )
            setUsers(response.data.data)
            setLoaded(true);
        }, (exception) => {
            if(exception.response) { console.log(exception.response) }
            else if(exception.request) { console.log(exception.request) }
            else { console.log(exception.message) }
            setLoaded(true);
        })
    }, [props])

    return (
        <div className="d-flex flex-column">
            {/* <h2>Communautés</h2> */}
            <div className="d-flex align-items-center justify-content-between bg-white shadow-sm py-3 px-2 mb-3">
                <h4 className="fw-bold pe-3 my-0">Nouvel Utilisateur</h4>
                <div>
                    <NavLink exact to={`${route.admin.users.link}/add`}><button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addAssociationForm"><FontAwesomeIcon icon={faPlus} className="d-inline-block me-3"></FontAwesomeIcon>Ajouter</button></NavLink>
                </div>
            </div>
            <div className="row bg-white shadow-sm px-2 py-4 mb-3 mx-0">
                <h5 className="fw-bold mb-4">Utilisateurs</h5>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="d-flex align-items-center mb-3 text-dark">
                            <FontAwesomeIcon icon={faSearch} className="d-inline-block me-2"/>
                            <input className="form-control" placeholder="Rechercher" />
                        </div>
                    </div>
                </div>
                <DataTable emptyMessage="Aucun résultat" loaded={loaded} datas={users} columns={[
                    {title: "#", dataTitle: "id", sortable: false, renderData: (item, index) => ( index + 1 )},
                    {title: "Nom", dataTitle: "name"},
                    // {title: "Role", renderData: (item) => ( item.role.map((role, roleIndex) => {
                    //     return( <span className="alert fw-bold alert-success">{role.name})</span> );
                    // }))},
                    {title: "E-mail", dataTitle: "email" },
                    {title: "Date de création", dataTitle: "created_at", renderData: (item) => ( moment(item.created_at).format("Do MMMM YYYY HH:mm")) },
                    {title: "Statut", renderData: (item) => ( <span className={`badge fw-normal h7 ${item.active === 1 ? "bg-success" : "bg-danger"}`}>{item.active === 1 ? "Activé" : "Inactif"}</span> ), sortable: false},
                    {title: "Actions", renderData: (item) => (
                        <>
                            <button type="button" className="btn bn-white" id="threeDotsDropDown" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                            <div className="dropdown-menu left-0" aria-labelledby="threeDotsDropDown">
                                {/* <Link to={`${route.admin.users.link}/${item.id}`} className="dropdown-item">Voir</Link> */}
                                { item.active === 0 
                                    && <a href="#" className="dropdown-item">Activer</a> }
                                <Link to={`${route.admin.users.link}/edit/${item.id}`} className="dropdown-item">Editer</Link>
                                {/* <Link className="dropdown-item">Supprimer</Link> */}
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
            </div>
        </div>
    
    )
}

export default Users