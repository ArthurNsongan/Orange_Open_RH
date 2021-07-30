import { faImage, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';
import Button from '../../../../components/Button';
import RichTextEditor from '../../../../components/RichTextEditor';
import apiRoutes from '../../../../config/apiConfig';
import Images from '../../../../utils/images';
import Partenaires from '../../Partenaires';

let route = require("../../../../utils/route.json")

function EditProject(props) {

    const {communaute_id, project_id} = useParams()

    let history = useHistory();

    const [project, setProject] = useState({
        project_plan: "",
        description: "",
        partners: [],
        association_id: communaute_id
    });

    const [loaded, setLoaded] = useState(null)

    const handleAddNewTextInputChange = (e) => {
        let { name, value } = e.target
        let projectTemp = project
        projectTemp[name] = value
        setProject(projectTemp)
        console.log(projectTemp)
    }

    const RichTextEditorDescription = (e, objectProp) => {
        let projectTemp = project
        projectTemp[objectProp] = e.getData();
        setProject(projectTemp)
        console.log(projectTemp)
    }

    const handleAddNewFileInputChange = (e) => {
        // setLoaded(false)
        let { name, files } = e.target
        let projectTemp = { ...project }
        projectTemp[name] = files[0]
        setProject(projectTemp)
        console.log(projectTemp) 
        // setLoaded(true)
    }

    const handleSubmitAddNewProject = (e) => {
        e.preventDefault()
        console.log(project)

        var projectFormData = new FormData();

        projectFormData.append("title", project.title)
        projectFormData.append("association_id", project.association_id)

        projectFormData.append("image", project.image)
        projectFormData.append("cost", project.cost)
        projectFormData.append("contributionPerMember", project.contributionPerMember)
        projectFormData.append("deadlines", project.deadlines)
        projectFormData.append("start_date", project.start_date)
        projectFormData.append("project_plan", project.project_plan)
        projectFormData.append("description", project.description)
        projectFormData.append("category_id", parseInt(project.category_id))


        axios.post(`${apiRoutes.ProjectsURL}`, projectFormData)
        .then( response => {
            console.log(response.data)
            

            toast.success(
                (<div className="d-flex flex-column">Projet créé avec succès</div>)
            )

            let projectPartnersTmp = {
                project_id: response.data.id,
                partners: project.partners.map( item => (item.id))
            }
            axios.post(`${apiRoutes.ProjectAddPartenaireURL}`, projectPartnersTmp).then(res => console.log(res.data) )
            .catch(({response}) => {
                console.log(response.data)
            })
            history.push(route.admin.communautes + "/" + communaute_id)
        }).catch( ({response}) => {
            console.log(response.data)
        })
    }

    const removeProjectPartner = (index) => {
        setProject({
            ...project,
            partners: project.partners.splice(index, 1)
        })
    }

    const [partenaires, setPartenaires] = useState([
        {"id" : 1, "name": "Cimencam"},
        {"id" : 2, "name": "Sorepco"}
    ]);

    const handleAddNewProjectPartner = (e) => {
        let projectTemp = {
            ...project,
        }

        if( projectTemp.partners.filter(item => ( item.id == e.target.value )).length === 0  )
            projectTemp.partners.push(partenaires.find( item => ( item.id == e.target.value ) ) )
        e.target.value = ""
        setProject(projectTemp)
        console.log(projectTemp.partners)
    }

    const getProject = (id) => {
        axios.get(`${apiRoutes.ProjectsURL}/${project_id}`)
        .then( response => {
            console.log(response.data)
            setProject(response.data)
        }).catch( ({response}) => { console.log(response.data)})
    }

    useEffect(() => {
        setLoaded(true)
        getProject(project_id)
    }, [props])

    return (
        <div className="d-flex flex-column">
            <h4 className="fw-bold mb-4">Créer un nouveau projet</h4>
            <div className="row bg-white shadow-sm px-2 py-4 mb-3 mx-0">
                <form id="AddNewProjetForm" onSubmit={handleSubmitAddNewProject}>
                    <div className="row">
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Titre</label>
                            <input className="form-control" onChange={handleAddNewTextInputChange} id="projectTitle" 
                                aria-describedby="projectTitleFeedback" type="text" name="title" value={project.title} placeholder="Titre du projet"  />
                            <div className="invalid-feedback" id="projectTitleFeedback"></div>
                        </div>
                    </div>

                    <div className="row my-5">
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Image</label>
                            <input className="form-control" type="file" name="image" accept="image/*" id="Image" onChange={handleAddNewFileInputChange}  
                                placeholder="Image représentative du projet"/>
                            {/* { *
                                // project.image !== undefined ? 
                                    {/* ( */}
                                        <img loading="lazy" src={ project.image ? URL.createObjectURL(project.image) : faImage.iconName }
                                         alt="Représentative du projet" className="SampleImage mt-3" />
                                    {/* ) 
                                    // : ""
                            {/* } */}
                        </div>
                    </div>

                    <div className="row my-5">
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Coût du projet</label>
                            <input type="number" className="form-control" name="cost" id="Cost" onChange={handleAddNewTextInputChange} placeholder="Coût du projet"
                                 value={project.cost}  />
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Contribution par membre</label>
                            <input type="number" className="form-control" name="contributionPerMember" id="ContributionPerMember" onChange={handleAddNewTextInputChange} 
                                placeholder="Contribution par membre"  value={project.contributionPerMember}/>
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Date de fin des contributions</label>
                            <input type="date" className="form-control" name="deadlines" id="deadLines" onChange={handleAddNewTextInputChange} 
                                placeholder="Date de fin des contributions"  format="yyyy-mm-dd" value={project.deadlines} />
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Date de début du projet</label>
                            <input type="date" className="form-control" name="start_date" id="startDate" onChange={handleAddNewTextInputChange} 
                                placeholder="Date de début du projet"  format="yyyy-mm-dd" value={project.start_date} />
                        </div>
                    </div>

                    <div className="row my-5">
                        <div className="col-lg-12 mb-3">
                            <label className="d-block mb-2">Plan du Projet</label>
                            {/* <textarea className="form-control" name="description" onChange={handleAddNewTextInputChange} value={association.description} placeholder="Description de la communauté"></textarea> */}
                            <RichTextEditor data={project.project_plan} onChange={(e) => RichTextEditorDescription(e, "project_plan")} className="form-control" id="projectPlan" />
                        </div>
                    </div>

                    <div className="row">
                        
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Catégorie</label>
                            <select name="category_id" className="form-select" onChange={handleAddNewTextInputChange}>
                                {
                                    [{"id": 2, nom: "Social"},{"id": 2, nom: "Social"}].map((item, index) => {
                                        return ( <option value={item.id}>{item.nom}</option> )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-lg-6">
                            <label className="d-block mb-2">Partenaires</label>
                            <select name="partenaires_list" onChange={handleAddNewProjectPartner} className="form-select">
                                { partenaires.map((item, index) => {
                                    return ( <option value={item.id}>{item.name}</option> )
                                })}
                            </select>     
                            <div className="d-flex mt-3">
                                { project.partners !== undefined ? project.partners.map( (item, index) => (
                                    <span className="d-inline-block bg-secondary rounded m-2 text-gray">
                                        <button className="border-0 p-2 fw-bold" onClick={() => removeProjectPartner(index)}><FontAwesomeIcon icon={faTimes} className="me-3" role="button" />{item.name}</button>
                                    </span>
                                 ) ) : null}
                            </div>            
                        </div>
                    </div>
                    

                    <div className="row my-5">
                        <div className="col-lg-12 mb-3">
                            <label className="d-block mb-2">Description du projet</label>
                            {/* <textarea className="form-control" name="description" onChange={handleAddNewTextInputChange} value={association.description} placeholder="Description de la communauté"></textarea> */}
                            <RichTextEditor data={project.description} onChange={(e) => RichTextEditorDescription(e, "description")} className="form-control" id="Description" />
                        </div>
                    </div>

                    <div className="float-start">
                        <Button type="button" className="btn-secondary m-2">Fermer</Button>
                        <Button type="submit" className="btn-primary m-2">Enregistrer</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProject
