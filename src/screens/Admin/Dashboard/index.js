import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatThousandsNumber } from '../../../config/constants'
import React, { useEffect, useState } from 'react'
import { getDashboardContributionsStats } from '../../../services/API';
import './styles.css'

function Dashboard() {

    const [contributionsStats, setContributionsStats] = useState({
        today: 0, week: 0, month: 0, semester: 0,
    });

    const dashboardStatCard = ({ className, cardLabel, cardValue}) => {
        return(
            <div className="dashboardStatCard my-2">
                    <div className="bg-secondary-2 text-white d-flex flex-column py-5 px-2 rounded">
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
    }, [])
    
    return (
        <>
            <h3 className="fw-bold pe-3 mt-1 mb-3">Tableau de bord</h3>
            <div className="d-flex align-items-center justify-content-between bg-white shadow-sm py-3 px-2 mb-3">
                {/* <div>
                    <NavLink exact to={`${route.admin.projets.link}/add`}><button className="btn btn-primary"><FontAwesomeIcon icon={faPlus} className="d-inline-block me-3"></FontAwesomeIcon>Ajouter</button></NavLink>
                </div> */}
                
            </div>
            {/* <div className="row">
                <div className="dashboardStatCard my-2">
                    <div className="bg-primary-2 text-white d-flex flex-column py-5 px-2 rounded">
                        <div className="d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faMoneyCheck} className="fa-3x pe-3" />
                            <span className="fs-3 fw-medium text-center d-block">100</span>
                        </div>
                        <span className="fs-4 fw-medium text-center d-block">Contributions du jour</span>
                    </div>
                </div>
                <div className="dashboardStatCard my-2">
                    <div className="bg-primary-2 text-white d-flex flex-column py-5 px-2 rounded">
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
                    <div className="bg-secondary-2 text-white d-flex flex-column py-5 px-2 rounded">
                        <div className="d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faMoneyCheck} className="fa-3x pe-3" />
                            <span className="fs-4 fw-medium text-center d-block">{ formatThousandsNumber(contributionsStats.today) } F CFA</span>
                        </div>
                        <span className="fs-4 fw-medium text-center d-block">Jour</span>
                    </div>
                </div>
                <div className="dashboardStatCard my-2">
                    <div className="bg-primary-2 text-white d-flex flex-column py-5 px-2 rounded">
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

            <h4 className="fw-bold my-3 headingFunPrim contextCenter">Communautés</h4>
            <div className="row pt-3">
                <div className="dashboardStatCard my-2">
                    <div className="bg-primary-2 text-white d-flex flex-column py-5 px-2 rounded">
                        <div className="d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faMoneyCheck} className="fa-3x pe-3" />
                            <span className="fs-3 fw-medium text-center d-block">6</span>
                        </div>
                        <span className="fs-4 fw-medium text-center d-block">Associations</span>
                    </div>
                </div>
                <div className="dashboardStatCard my-2">
                    <div className="bg-primary-2 text-white d-flex flex-column py-5 px-2 rounded">
                        <div className="d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faMoneyCheck} className="fa-3x pe-3" />
                            <span className="fs-3 fw-medium text-center d-block">6</span>
                        </div>
                        <span className="fs-4 fw-medium text-center d-block">Communautés</span>
                    </div>
                </div>
                <div className="dashboardStatCard my-2">
                    <div className="bg-primary-2 text-white d-flex flex-column py-5 px-2 rounded">
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
