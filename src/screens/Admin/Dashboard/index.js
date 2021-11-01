import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatThousandsNumber } from '../../../config/constants'
import React, { useEffect, useState } from 'react'
import { getAllInProgressProjects, getDashboardContributionsStats } from '../../../services/API';
import './styles.css'
import DataTable from '../../../components/DataTable';
import moment from 'moment';
import { Pagination } from 'antd';

function Dashboard() {

    const [contributionsStats, setContributionsStats] = useState({
        today: 0, week: 0, month: 0, semester: 0,
    });

    const [currentProjects, setCurrentProjects] = useState([])

    const [paginationOptions, setPaginationOptions] = useState({
        total: 0,
        perPage: 10,
        currentPage: 1
    })

    const dashboardStatCard = ({ className, cardLabel, cardValue}) => {
        return(
            <div className="dashboardStatCard my-2">
                    <div className="bg-dark text-white d-flex flex-column py-5 px-2 rounded">
                        <div className={ className + " d-flex align-items-center justify-content-center"}>
                            <FontAwesomeIcon icon={faMoneyCheck} className="fa-3x pe-3" />
                            <span className="fs-4 fw-medium text-center d-block">{ cardValue }</span>
                        </div>
                        <span className="fs-4 fw-medium text-center d-block">{cardLabel}</span>
                    </div>
            </div>
        )
    }

    // const [projectsStats, setProjectsStats] = useState([]);

    useEffect(() => {
        getDashboardContributionsStats(
            (response) => {
                setContributionsStats({
                    ...response.data
                });
            },
            (exception) => {
                setContributionsStats({
                    today: 1000,
                    week: 25000,
                    month: 1000000,
                    semester_1: 25000000,
                    semester_2: 25000000,
                });
            }
        )

        getCurrentProjects(paginationOptions.currentPage, paginationOptions.perPage)


    }, [])

    const [isLoading, setIsLoading] = useState(true);

    const onPaginationChange = (currentPage, perPage) => {
        getCurrentProjects(currentPage, perPage);
    }

    const getCurrentProjects = (currentPage, perPage) => {
        getAllInProgressProjects(currentPage, perPage, (response => {
            console.log(response.data)
            setIsLoading(false)
            setPaginationOptions(
                {
                    total: response.data.meta.total,
                    perPage: response.data.meta.per_page,
                    currentPage: response.data.meta.current_page,
                }
            )
            setCurrentProjects(response.data.data)
            console.log(response.data)        
        }),
        (exception) => {

        })
    }
    
    return (
        <>
            <h3 className="fw-bold pe-3 mt-1 mb-3">Tableau de bord</h3>
            {/* <div className="d-flex align-items-center justify-content-between bg-white shadow-sm py-3 px-2 mb-3">
                
                
            </div> */}
            {/* <div className="row">
                <div className="dashboardStatCard my-2">
                    <div className="bg-primary text-white d-flex flex-column py-5 px-2 rounded">
                        <div className="d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faMoneyCheck} className="fa-3x pe-3" />
                            <span className="fs-3 fw-medium text-center d-block">100</span>
                        </div>
                        <span className="fs-4 fw-medium text-center d-block">Contributions du jour</span>
                    </div>
                </div>
                <div className="dashboardStatCard my-2">
                    <div className="bg-primary text-white d-flex flex-column py-5 px-2 rounded">
                        <div className="d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faMoneyCheck} className="fa-3x pe-3" />
                            <span className="fs-3 fw-medium text-center d-block">6</span>
                        </div>
                        <span className="fs-4 fw-medium text-center d-block">Projets en cours</span>
                    </div>
                </div>
            </div>  */}
            
            <h4 className="fw-bold my-3 headingFunPrim contextCenter">Sommes collectées</h4>
            
            <div className="row pt-3">
                <div className="dashboardStatCard my-2">
                    <div className="bg-dark text-white d-flex flex-column py-5 px-2 rounded">
                        <div className="d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faMoneyCheck} className="fa-3x pe-3" />
                            <span className="fs-4 fw-medium text-center d-block">{ formatThousandsNumber(contributionsStats.today) } F CFA</span>
                        </div>
                        <span className="fs-4 fw-medium text-center d-block">Jour</span>
                    </div>
                </div>
                <div className="dashboardStatCard my-2">
                    <div className="bg-primary text-white d-flex flex-column py-5 px-2 rounded">
                        <div className="d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faMoneyCheck} className="fa-3x pe-3" />
                            <span className="fs-4 fw-medium text-center d-block">{ formatThousandsNumber(contributionsStats.week) } F CFA</span>
                        </div>
                        <span className="fs-4 fw-medium text-center d-block">Semaine</span>
                    </div>
                </div>
                <div className="dashboardStatCard my-2">
                    <div className="bg-secondary text-white d-flex flex-column py-5 px-2 rounded">
                        <div className="d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faMoneyCheck} className="fa-3x pe-3" />
                            <span className="fs-4 fw-medium text-center d-block">{ formatThousandsNumber(contributionsStats.month) } F CFA</span>
                        </div>
                        <span className="fs-4 fw-medium text-center d-block">Mois</span>
                    </div>
                </div>
                <div className="dashboardStatCard my-2">
                    <div className="bg-primary text-white d-flex flex-column py-5 px-2 rounded">
                        <div className="d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faMoneyCheck} className="fa-3x pe-3" />
                            <span className="fs-4 fw-medium text-center d-block">{ formatThousandsNumber(new Date().getMonth() <= 6 ? contributionsStats.semester_1 : contributionsStats.semester_2) } F CFA</span>
                        </div>
                        <span className="fs-4 fw-medium text-center d-block">Semestre</span>
                    </div>
                </div>
            </div>

            <h4 className="fw-bold my-3 headingFunPrim contextCenter">Projets en cours</h4>
            <div className="row pt-3">
                <div className="col-12">
                    <DataTable className="Admin__Table__Fixed shadows fw-bold " emptyMessage="Aucun projet trouvé !" loaded={!isLoading} datas={currentProjects} columns={[
                        {title: "#", renderData: (item, index) => { return <span className="fw-bold px-2">{ index + 1 }</span> }, sortable: false},
                        {title: "Nom", dataTitle: "title"},
                        {title: "Communauté", dataTitle: "holder"},
                        {title: "Montant collecté", dataTitle: "stat.collected", renderData: (item) => ( <h5 className="fw-bold text-success">{item.stat.collected + " F CFA"}</h5>)},
                        {title: "Montant restant", dataTitle: "stat.reste", renderData: (item) => ( <h5 className="fw-bold text-danger">{formatThousandsNumber(item.stat.reste) + " F CFA"}</h5>)},
                        {title: "Pourcentage atteint", dataTitle: "stat.pourcentage", renderData: (item) => ( <h5 className="fw-bold text-primary">{item.stat.pourcentage}</h5>)},
                        // {title: "Description", dataTitle:"description", renderData: (item) => (item.description.length > 100 ? <span className="alert-info text-primary fw-bold">Texte enrichi</span> : item.description)},
                        {title: "Date de fin des contributions",dataTitle:"deadlines",  renderData: (item) => ( moment(item.deadlines).format("Do MMMM YYYY")) },
                    ]}/>
                </div>
                <div className="row">
                    <Pagination
                        className="d-flex fs-5 justify-content-center"
                        total={paginationOptions.total}
                        pageSize={paginationOptions.perPage}
                        current={paginationOptions.currentPage}
                        showSizeChanger
                        onChange={onPaginationChange}
                    />
                </div>
            </div>

            <h4 className="fw-bold my-3 headingFunPrim contextCenter">Communautés</h4>
            <div className="row pt-3">
                <div className="dashboardStatCard my-2">
                    <div className="bg-primary text-white d-flex flex-column py-5 px-2 rounded">
                        <div className="d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faMoneyCheck} className="fa-3x pe-3" />
                            <span className="fs-3 fw-medium text-center d-block">6</span>
                        </div>
                        <span className="fs-4 fw-medium text-center d-block">Associations</span>
                    </div>
                </div>
                <div className="dashboardStatCard my-2">
                    <div className="bg-primary text-white d-flex flex-column py-5 px-2 rounded">
                        <div className="d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faMoneyCheck} className="fa-3x pe-3" />
                            <span className="fs-3 fw-medium text-center d-block">6</span>
                        </div>
                        <span className="fs-4 fw-medium text-center d-block">Communautés</span>
                    </div>
                </div>
                <div className="dashboardStatCard my-2">
                    <div className="bg-primary text-white d-flex flex-column py-5 px-2 rounded">
                        <div className="d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faMoneyCheck} className="fa-3x pe-3" />
                            <span className="fs-3 fw-medium text-center d-block">6</span>
                        </div>
                        <span className="fs-4 fw-medium text-center d-block">Corporations</span>
                    </div>
                </div>
            </div> 
        
        </>
    )
}

export default Dashboard
