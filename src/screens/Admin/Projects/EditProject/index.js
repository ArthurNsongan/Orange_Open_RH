import { faImage, faTimes, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
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
import moment from "moment"
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { changeProjectStatus, getAllCategories, getAllPartners, getProject, removeProjectPartner } from '../../../../services/API';
import { checkAuth, getSupervisorAssociationId, hasRole, isAdmin, isSupervisor } from '../../../../services/Auth';

let route = require("../../../../utils/route.json")

function EditProject(props) {

    const {project_id} = useParams()
    const params = useParams()

    var redirect_route = ""
    var communaute_id = null

    if( isSupervisor() && !isAdmin()) {
       communaute_id = getSupervisorAssociationId()
       redirect_route = route.supervisor.link
    } else if( isAdmin() ) {
        communaute_id = params.communaute_id
        redirect_route = route.admin.communautes.link + "/" + communaute_id
    }

    let history = useHistory();

    const initialErrors = {
        title: [],
        image: [],
        project_plan: [],
        description: [],
        cost: [],
        contributionPerMember: [],
        deadlines: [],
        start_date: [],
        category_id: [],
    }

    const [requestSent, setRequestSent] = useState(false)

    const [project, setProject] = useState({
        project_plan: "",
        description: "",
        partners: [],
        errors: { ...initialErrors },
        association_id: communaute_id
    });

    const [loaded, setLoaded] = useState(null)

    const handleAddNewTextInputChange = (e) => {
        let { name, value } = e.target
        let projectTemp = { ...project }
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

    const handleSubmitEditNewProject = (e) => {
        e.preventDefault()
        setRequestSent(true)
        let inputListNames = ["partenaires_list", "doc_file", "image"]
        let firstInvalidItem = null
        let isValid = true
        let projectErrors = initialErrors
        let form = document.querySelector("#EditNewProjetForm")
        Array.from(form.elements === undefined ? [] : form.elements).forEach( item => {
            item.classList.remove("is-invalid")
            if(!inputListNames.includes(item.name) && !item.classList.contains("ck-hidden") && ( item.tagName === "INPUT" || item.tagName === "SELECT" ) )
            {
                let itemIsValid = true
                const isNonValidated = () => {
                    isValid = false;
                    itemIsValid = false;
                }
                if (!inputListNames.includes(item.name) && !item.classList.contains("ck-hidden") && (item.tagName === "INPUT" || item.tagName === "SELECT")) {
                    projectErrors[item.name] = []
                    if(item.value.length === 0) {
                        isNonValidated()
                        projectErrors[item.name].push("Le champ est requis.")
                    }
                    // else if(item.name.includes("email") && !checkEmail(item.value) ) {
                    //     isNonValidated()
                    //     projectErrors[item.name].push("E-mail invalide.")
                    // } else if(item.name.includes("phone") && !checkPhoneNumber(item.value) ) {
                    //     isNonValidated()
                    //     projectErrors[item.name].push("Le numéro de téléphone n'est pas valide.")
                    // }
                    if(itemIsValid === false) {
                        item.classList.add("is-invalid")
                    }
                }
            }
            if(firstInvalidItem === null) { firstInvalidItem = item}
        })
        if (project.description === "" || project.description == null) {
            projectErrors["description"] = []
            projectErrors.description.push("L'éditeur est vide.")
        }
        if (project.project_plan === "" || project.project_plan == null) {
            projectErrors["project_plan"] = []
            projectErrors.project_plan.push("L'éditeur est vide.")
        }
        if(isValid === false || form === null) {
            window.scrollTo(0, firstInvalidItem.getBoundingClientRect().top + 200)
            toast.error(<div className="d-flex align-items-center fs-6">Erreur rencontrée au niveau des champs surlignés !!!</div>, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
            })
            console.log("Errors : ", projectErrors)
            setProject({ ...project, errors: projectErrors })
            setRequestSent(false)
            return false;        
        }

        console.log(project)

        console.log("projectToShow", project)

        var projectFormData = new FormData();

        projectFormData.append("title", project.title)
        // projectFormData.append("association_id", communaute_id)
        if( typeof(project.image) === "object") {
            projectFormData.append("image", project.image)
        }
        projectFormData.append("cost", project.cost)
        projectFormData.append("status", project.status)
        projectFormData.append("contributionPerMember", project.contributionPerMember)
        projectFormData.append("deadlines", project.deadlines)
        projectFormData.append("start_date", project.start_date)
        projectFormData.append("project_plan", project.project_plan)
        projectFormData.append("description", project.description)
        projectFormData.append("category_id", parseInt(project.category_id))

        checkAuth()

        axios.post(`${apiRoutes.ProjectsURL}/${project_id}`, projectFormData)
        .then( response => {
            console.log(response.data)
            let projectPartnersTmp = {
                project_id: project_id,
                partners: project.partners.map( item => (item.id))
            }
            toast.success(
                (<div className="d-flex flex-column">{ "Projet modifié avec succès !" }</div>)
            )
            console.log(projectPartnersTmp)
            axios.post(`${apiRoutes.ProjectAddPartenaireURL}`, projectPartnersTmp).then(res => console.log(res.data) )
            .catch(({response}) => {
                console.log(response?.data)
            })
            changeProjectStatus(project.status, project_id, communaute_id, 
                (res) => { console.log("changeProjectStatus", res)},
                (exception) => { 
                    console.log(exception?.response)
                    if(exception?.response) {
                    toast.error(
                        (<div className="d-flex flex-column">{ exception?.response?.data.error }</div>)
                    )        
                }}
            )
            history.goBack()
        }).catch( (exception) => {
            console.log(exception?.response?.data)
            var errors = exception?.response?.data?.errors
            if(errors) {
                setProject({ ...project, errors: {...projectErrors, ...errors} })
                Object.keys(errors).forEach(item => {
                    form.querySelector(`[name="${item}"]`).classList.add("is-invalid");
                })
                toast.error(
                    <div className="d-flex align-items-center fs-6">
                        Erreur rencontrée au niveau des champs surlignés !!!
                        <br/>
                        {Object.values(errors).length} erreur(s) rencontrée(s)
                    </div>, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,  
                })
            }
            // errors == null && Object.values(errors).map(item => {
            //     toast.error(<><div className="d-flex align-items-center fs-6 ">{(<>{item[0]}</>)}</div></>, {
            //         position: "top-right",
            //         autoClose: 5000,
            //         hideProgressBar: true,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //     })
            // })
            setRequestSent(false)
        })
        
    }

    const removeProjectPartnerItem = (index) => {
        let projectPartnersTmp = project.partners
        removeProjectPartner({
            project_id: project.id,
            partners: [projectPartnersTmp[index].id]
        }, (response) => {
            toast.success(<div className="d-flex flex-column">{ "Partenaire supprimé avec succès !!" }</div>)
        })
        projectPartnersTmp.splice(index, 1)
        setProject({
            ...project,
            partners: projectPartnersTmp
        })
        console.log(projectPartnersTmp)
    }

    const [partenaires, setPartenaires] = useState([]);

    const [categories, setCategories] = useState([]);

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

    // const getProject = (id) => {
    //     setLoaded(false)
    //     axios.get(`${apiRoutes.ProjectsURL}/${project_id}`)
    //     .then( response => {
    //         console.log(response.data)
    //         setProject(response.data)
    //         setLoaded(true)
    //     }).catch( ({response}) => { console.log(response.data)})
    // }

    let getProjectSuccess = (response) => {
        console.log(response.data)
        setProject({
            ...project,
            ...response.data,
            category_id: response.data.category.id
        })
        setLoaded(true)
    }

    let getProjectError = (exception) => {
        console.log(exception?.response.data)
        setLoaded(true)
    }

    useEffect(() => {
        // getAllCategories((res) => {
        //     setCategories(res.data);
        // }, (res) => { console.log(res.data)} );

        getAllPartners( res => { setPartenaires(res.data) },
            res => console.log(res.data) )
        getProject(project_id, getProjectSuccess, getProjectError);
        axios.get(`${apiRoutes.CategoriesURL}`)
        .then( response => {
            setCategories(response.data);
            console.log(response.data)
        }).catch(exception => console.log(exception))
    }, [])

    // useEffect(() => {
    //     console.log("project", project)
    // }, [project])

    return (
        <div className="d-flex flex-column">
            <h4 className="fw-bold mb-4">Editer un projet</h4>
            <div className="row bg-white shadow-sm px-2 py-4 mb-3 mx-0">
                { loaded ? <form id="EditNewProjetForm" onSubmit={handleSubmitEditNewProject}>
                    <div className="row">
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Titre</label>
                            <input className="form-control" onChange={handleAddNewTextInputChange} id="projectTitle" 
                                aria-describedby="projectTitleFeedback" type="text" name="title" value={project.title} placeholder="Titre du projet"  />
                            <div class="invalid-feedback" id="projectTitleFeedback">
                                {project.errors.title.map(item => (
                                    <span className="fw-bold">{item}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="row my-5">
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Statut (Etat) du Projet</label>
                            <select className="form-select" id="Statut" name="status" onChange={handleAddNewTextInputChange}>
                                {/* <option>Sélectionner un statut</option> */}
                                <option value="EN_ATTENTE" selected={ "EN_ATTENTE" === project.status}>En Attente</option>
                                <option value="EN_COURS" selected={ "EN_COURS" === project.status}>En cours</option>
                                <option value="TERMINE" selected={ "TERMINE" === project.status}>Terminé</option>
                            </select>
                        </div>
                    </div>

                    <div className="row my-5">
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Image</label>
                            <input className="form-control" type="file" name="image" accept="image/*" id="Image" onChange={handleAddNewFileInputChange}  
                                placeholder="Image représentative du projet"/>
                            <div class="invalid-feedback" id="ImageFeedback">
                                {project.errors.image.map(item => (
                                    <span className="fw-bold">{item}</span>
                                ))}
                            </div>
                            {
                                project.image !== undefined ? 
                                   (
                                        <img loading="lazy" src={ project.image ? ( typeof(project.image) === "object" ? URL.createObjectURL(project.image) : `${apiRoutes.StorageURL}/${project.image}` ): faImage.iconName }
                                         alt="Représentative du projet" className="SampleImage mt-3" />
                                     ) 
                                    : ""
                            }
                        </div>
                    </div>

                    <div className="row my-5">
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Coût du projet</label>
                            <input type="number" className="form-control" name="cost" id="Cost" onChange={handleAddNewTextInputChange} placeholder="Coût du projet"
                                 value={project.cost}  />
                            <div class="invalid-feedback" id="CostFeedback">
                                {project.errors.cost.map(item => (
                                    <span className="fw-bold">{item}</span>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Contribution par membre</label>
                            <input type="number" className="form-control" name="contributionPerMember" id="ContributionPerMember" onChange={handleAddNewTextInputChange} 
                                placeholder="Contribution par membre"  value={project.contributionPerMember}/>
                            <div class="invalid-feedback" id="ContributionPerMemberFeedback">
                                {project.errors.contributionPerMember.map(item => (
                                    <span className="fw-bold">{item}</span>
                                ))}
                            </div> 
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Date de fin des contributions</label>
                            <input type="date" className="form-control" name="deadlines" id="deadLines" onChange={handleAddNewTextInputChange} 
                                placeholder="Date de fin des contributions"  format="yyyy-mm-dd" value={moment(project.deadlines).format("yyyy-MM-Do")} />
                            <div class="invalid-feedback" id="deadLinesFeedback">
                                {project.errors.deadlines.map(item => (
                                    <span className="fw-bold">{item}</span>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Date de début du projet</label>
                            <input type="date" className="form-control" name="start_date" id="startDate" onChange={handleAddNewTextInputChange} 
                                placeholder="Date de début du projet"  format="yyyy-mm-dd" value={moment(project.start_date).format("yyyy-MM-Do")} />
                            <div class="invalid-feedback" id="startDateFeedback">
                                {project.errors.start_date.map(item => (
                                    <span className="fw-bold">{item}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="row my-5">
                        <div className="col-lg-12 mb-3">
                            <label className="d-block mb-2">Plan du Projet</label>
                            <div className="text-danger my-2" id="projectPlanFeedback">
                                {project.errors.project_plan.map(item => (
                                    <span className="fw-bold"><FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />{item}</span>
                                ))}
                            </div>
                            <RichTextEditor data={project.project_plan} onChange={(e) => RichTextEditorDescription(e, "project_plan")} className="form-control" id="projectPlan" />
                        </div>
                    </div>

                    <div className="row">
                        
                        <div className="col-lg-6 mb-3">
                            <label className="d-block mb-2">Catégorie</label>
                            <select name="category_id" className="form-select" onChange={handleAddNewTextInputChange}>
                                <option value="">Sélectionner la catégorie</option>
                                {
                                    categories.map((item, index) => {
                                        return ( <option selected={project.category.id === item.id} value={item.id}>{item.name}</option> )
                                    })
                                }
                            </select>
                            <div class="invalid-feedback" id="CategoryFeedback">
                                {project.errors.category_id.map(item => (
                                    <span className="fw-bold">{item}</span>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <label className="d-block mb-2">Partenaires</label>
                            <select name="partenaires_list" onChange={handleAddNewProjectPartner} className="form-select">
                                <option value="">Sélectionner vos partenaires</option>
                                { partenaires.map((item, index) => {
                                    return ( <option value={item.id}>{item.name}</option> )
                                })}
                            </select>     
                            <div className="d-flex mt-3">
                                { project.partners !== undefined ? project.partners.map( (item, index) => (
                                    <span className="d-inline-block btn btn-secondary rounded m-2">
                                        <button className="border-0 p-2 fw-bold" onClick={() => removeProjectPartnerItem(index)}><FontAwesomeIcon icon={faTimes} className="me-3" role="button" />{item.name}</button>
                                    </span>
                                 ) ) : null}
                            </div>            
                        </div>
                    </div>
                    

                    <div className="row my-5">
                        <div className="col-lg-12 mb-3">
                            <label className="d-block mb-2">Description du projet</label>
                            <div className="text-danger my-2" id="descriptionFeedback">
                                {project.errors.description.map(item => (
                                    <span className="fw-bold"><FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />{item}</span>
                                ))}
                            </div> 
                            <RichTextEditor data={project.description} onChange={(e) => RichTextEditorDescription(e, "description")} className="form-control" id="Description" />
                        </div>
                    </div>

                    <div className="float-start">
                        <button type="button" className="btn btn-secondary m-2">Fermer</button>
                        <Button type="submit" className="btn btn-primary m-2" disabled={requestSent}>{
                            requestSent && <LoadingSpinner className="me-1" />
                        }Enregistrer</Button>                    </div>
                </form>
            : <LoadingSpinner /> }
            </div>
        </div>
    )
}

export default EditProject
