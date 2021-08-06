import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import apiRoutes from '../../../../config/apiConfig';
import { formatThousandsNumber } from '../../../../config/constants';
import { getProject } from '../../../../services/API';

function ProjectDetail(props) {

    const {communaute_id, project_id} = useParams()

    let history = useHistory();

    const [project, setProject] = useState({
        project_plan: "",
        description: "",
        partners: [],
        association_id: communaute_id
    });

    const [loaded, setLoaded] = useState(false)

    let getProjectSuccess = (response) => {
        console.log(response.data)
        setProject(response.data)
        setLoaded(true)
    }

    let getProjectError = (response) => {
        console.log(response.data)
        setLoaded(true)
    }

    useEffect(() => {
        getProject(project_id, getProjectSuccess, getProjectError);
    }, [props])


    return (
        <div className="d-flex flex-column">
            <h4 className="fw-bold mb-4">Détails du projet</h4>
            <div className="row bg-white shadow-sm px-2 py-4 mb-3 mx-0">
                { 
                    loaded ? 
                    <>
                        <div className="row">
                            <div className="col-lg-6 mb-3">
                            </div>
                            <h2>{project.title}</h2>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 mb-3">
                                <img src={`${apiRoutes.StorageURL}/${project.image}`} className="SampleImage mt-3" alt={project.title} title={project.title} />
                            </div>
                        </div>


                    <div className="row my-5">
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Coût du projet</label>
                            <h3>{formatThousandsNumber(project.cost)} F CFA</h3>
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Contribution par membre</label>                           
                            <h3>{formatThousandsNumber(project.contributionPerMember)} F CFA</h3>
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
