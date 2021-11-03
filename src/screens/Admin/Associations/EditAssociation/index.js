import React, { useEffect, useRef, useState } from 'react'

import { faExclamationTriangle, faFile, faImage, faPlus, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import apiRoutes from "../../../../config/apiConfig"
// import Button from '../../../components/Button'

import $ from "jquery"
import { toast } from 'react-toastify';
import RichTextEditor from '../../../../components/RichTextEditor';
import { useHistory, useParams } from 'react-router';
import { Helmet } from 'react-helmet';
import { checkAuth } from '../../../../services/Auth';
import { checkEmail, checkPhoneNumber } from '../../../../config/constants';
// import '@popperjs/core';
// import 'bootstrap'

var _ = require("lodash")

let associationTypesStatic = require("../../../../utils/associationTypes.json")

function EditAssociation(props) {
    
    // const [associations, setAssociations] = useState([]);

    let history = useHistory()

    const initialErrors = {
        name: [],
        description: [],
        address: [],
        logo: [],
        type_id: [],
        email: [],
        bankAccountNumber: [],
        bank_domiciliation: [],
        memberNumber: [],
        phone: [],
        first_representative: [],
        first_representative_phone: [],
        second_representative: [],
        second_representative_phone: [],
        potentialMemberNumber: [],
        create_date: [],
    }

    const { communaute_id } = useParams();

    const [association, setAssociation] = useState({
    })

    const [associationErrors, setAssociationErrors] = useState(initialErrors)

    const [assocDocs, setAssocDocs] = useState([])

    const assocDescription = useRef()

    const [associationDoc, setAssociationDoc] = useState({})

    const [associationTypes, setAssociationTypes] = useState([]);

    const taille = 10;

    const handleFilter = (e) => {
        
    }

    const IsRightAssociation = (item, search) => {
        return ( item.name.includes(`${search}`) || item.description.includes(`${search}`) )
    }

    let route = require("../../../../utils/route.json")

    useEffect(() => {
        axios.get(`${apiRoutes.AssociationTypesURL}`)
        .then( response => {
            setAssociationTypes(response.data)
            console.log(response.data)
            // let select = document.querySelector("select[name='type_id']");
            // console.log(select)
            // select.change();
            window.$("select[name='type_id']").trigger("change");
        })

        
        axios.get(`${apiRoutes.AssociationsURL}/${communaute_id}`)
        .then( response => {
            setAssociation({...response.data, type_id: response.data.associationType.id})
            console.log(response.data)
        })

        console.log(`${apiRoutes.AssociationsURL}/${communaute_id}`)

        // axios.get(`${apiRoutes.AssociationsURL}/paginate/${taille}`)
        // .then( response => {
        //     setAssociations(response.data.data)
        //     console.log(response.data)
        // })
    }, [props])

    const handleSubmitNewAssociation = (e) => {
        e.preventDefault();

        let inputListNames = ["doc_name", "doc_file", "logo"]
        let firstInvalidItem = null
        let assocErrors = associationErrors
        let isValid = true
        let form = document.querySelector("#editForm");
        Array.from(form.elements === undefined ? [] : form.elements).forEach(item => {
            item.classList.remove("is-invalid")
            let itemIsValid = true
            const isNonValidated = () => {
                isValid = false;
                itemIsValid = false;
            }
            if (!inputListNames.includes(item.name) && !item.classList.contains("ck-hidden") && (item.tagName === "INPUT" || item.tagName === "SELECT")) {
                assocErrors[item.name] = []
                if(item.value.length === 0) {
                    isNonValidated()
                    assocErrors[item.name].push("Le champ est requis.")
                } else if(item.name.includes("email") && !checkEmail(item.value) ) {
                    isNonValidated()
                    assocErrors[item.name].push("E-mail invalide.")
                } else if(item.name.includes("phone") && !checkPhoneNumber(item.value) ) {
                    isNonValidated()
                    assocErrors[item.name].push("Le numéro de téléphone n'est pas valide.")
                }
                if(itemIsValid === false) {
                    item.classList.add("is-invalid")
                }
            }
            if (firstInvalidItem === null) { firstInvalidItem = item }
        })
        assocErrors["description"] = []
        if (association.description == "" || association.description == null) {
            assocErrors.description.push("L'éditeur est vide.")
            // assocDescription.current.classList.add("is-invalid")
            // console.log("assocDescription", assocDescription)
        }
        if (isValid === false || form === null) {
            window.scrollTo(0, firstInvalidItem.getBoundingClientRect().top + 200)
            toast.warning(<div className="d-flex align-items-center fs-6 text-dark">Vérifiez bien tous les champs !!!</div>, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            console.log("Errors : ", assocErrors)
            setAssociationErrors({ ...assocErrors })
            return false;
        }
        // console.log(document.querySelector("#editForm"))
        console.log("Association Object : \n");
        let assocTemp = association
        let assocDocsTemp = assocDocs
        console.log(assocTemp);
        console.log("Association FormData");
        var assocFormData = new FormData();
        assocFormData.append("name", assocTemp.name)
        assocFormData.append("description", assocTemp.description)
        if(typeof(assocTemp.logo) === "object") {
            assocFormData.append("logo", assocTemp.logo)
            // alert("Nouveau logo");
        } else {
            // alert("Ancien logo");
        }
        console.log(assocFormData.getAll("logo"))
        assocFormData.append("bankAccountNumber", assocTemp.bankAccountNumber)
        assocFormData.append("type_id", assocTemp.type_id)
        assocFormData.append("bank_domiciliation", assocTemp.bank_domiciliation)
        assocFormData.append("address", assocTemp.address)
        assocFormData.append("memberNumber", parseInt(assocTemp.memberNumber))
        assocFormData.append("potentialMemberNumber", parseInt(assocTemp.potentialMemberNumber))
        assocFormData.append("phone", parseInt(assocTemp.phone))
        assocFormData.append("first_representative", assocTemp.first_representative)
        assocFormData.append("second_representative", assocTemp.second_representative)
        assocFormData.append("first_representative_phone", parseInt(assocTemp.first_representative_phone))
        assocFormData.append("second_representative_phone", parseInt(assocTemp.second_representative_phone))
        assocFormData.append("create_date", assocTemp.create_date)
        assocFormData.append("email", assocTemp.email)
    
        checkAuth()

        // let axiosRequest = axios.create();
        axios.post(`${apiRoutes.AssociationsURL}/${communaute_id}`, assocFormData)
            .then(response => {
                console.log(response.data)
                toast.success(<><div className="d-flex align-items-center fs-6 ">Association éditée avec succès !!!</div></>, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                assocDocsTemp.forEach((item) => {
                    var docFormData = new FormData();
                    docFormData.append("name", item.doc_name)
                    docFormData.append("path", item.doc_file)
                    docFormData.append("association_id", association.id)
                    axios.post(`${apiRoutes.DocumentURL}`, docFormData)
                    .then((response) => {
                        console.log(response.data)
                    })
                })
                setTimeout(() => history.push(route.admin.communautes.link), 500)
            }).catch( (exception) => {
                console.log(exception?.response?.data)
                var errors = exception?.response?.data?.errors
                if(errors) { 
                    setAssociationErrors({...initialErrors, ...errors})
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
                // typeof(response?.data) === "object" ? Object.values(response?.data.errors || []).map(item => {
                //     toast.error(<><div className="d-flex align-items-center fs-6 ">{(<>{item[0]}</>)}</div></>, {
                //         position: "top-right",
                //         autoClose: 5000,
                //         hideProgressBar: true,
                //         closeOnClick: true,
                //         pauseOnHover: true,
                //         draggable: true,
                //         progress: undefined,
                //     })
                // }) : toast.error(<><div className="d-flex align-items-center fs-6 ">{(<>{response.data}</>)}</div></>, {
                //     position: "top-right",
                //     autoClose: 5000,
                //     hideProgressBar: true,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                // })
            })
        
        // console.log(axiosRequest)

    }

    console.log(assocDocs)

    const handleAddNewTextInputChange = (e) => {
        const { name, value } = e.target
        let assocTemp = association
        assocTemp[name] = value
        setAssociation({...assocTemp})
        console.log(association)
    }

    const handleAddNewFileInputChange = (e) => {
        // console.log("Logo : ", e.target.files[0])
        const { name, files } = e.target
        let assocTemp = association
        assocTemp[name] = files[0]
        setAssociation({...assocTemp})
        console.log(association)
    }

    const handleAddNewMultiFileInputChange = (e) => {
        console.log("Documents : ", e.target.files)
        console.log(e.target.files[0])
        const { name, files } = e.target
        let assocTemp = association
        assocTemp[name] = files
        setAssociation({...assocTemp})
        console.log(association)
    }

    const handleAddNewFileDocumentChange = (e) => {
        e.preventDefault();
        const { name, files } = e.target
        let assocDocTemp = {
            ...associationDoc,
        }
        assocDocTemp[name] = files[0]
        setAssociationDoc(assocDocTemp)
        console.log(assocDocTemp)
        console.log(assocDocs)
    }
    
    const handleAddNewTextDocumentChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target
        let associationDocTmp = {
            ...associationDoc,
        }
        associationDocTmp[name] = value
        setAssociationDoc(associationDocTmp)
        console.log(association)
        console.log(assocDocs)
    }
    
    const handleAddAssociationDocument = (e) => {
        e.preventDefault();
        
        // let associationTmp = association
        let assocDocsTemp = assocDocs
        console.log(assocDocsTemp);
        assocDocsTemp.push(associationDoc);
        console.log("assocDoc", associationDoc)
        console.log(assocDocsTemp);
        document.querySelector("input[name='doc_file']").value=null
        document.querySelector("input[name='doc_name']").value=null
        setAssocDocs([...assocDocsTemp])
        setAssociationDoc({})
    }

    const RichTextEditorDescription = (e) => {

        let assocTemp = association
    
        assocTemp["description"] = e.getData()
        setAssociation({...assocTemp})
        console.log(association)
    
    }

    const handleDeleteAssocDoc = (index) => {
        let associationTmp = {
            ...association,
        }
        let assocDocsTemp = assocDocs
        assocDocsTemp.splice(index, 1);
        setAssocDocs({...assocDocsTemp})
        console.log(assocDocsTemp)
    }

    const handleDeleteAssocDocDb = (index) => {
        let associationTmp = {
            ...association,
        }
    
        associationTmp.documents.splice(index, 1);
        setAssociation(associationTmp)
        console.log(associationTmp.documents)
    }


    return (
        <div className="d-flex flex-column">
            {/* <h2>Communautés</h2> */}
            { !_.isEqual({}, association) ? <Helmet title={association.name + " - Edition - Communautés"} /> : "" }
            <div className="row bg-white shadow-sm px-2 py-4 mb-3 mx-0">
                <h5 className="fw-bold mb-4">Editer une Communauté</h5>
                { !(_.isEqual({}, association)) ? 
                    <form id="editForm" onSubmit={handleSubmitNewAssociation}>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-lg-6 mb-3">
                                <label className="d-block mb-2">Nom</label>
                                <input className="form-control" onChange={handleAddNewTextInputChange} id="associationName" aria-describedby="associationNameFeedback" type="text" name="name" value={association.name} placeholder="Nom de la communauté" />
                                <div class="invalid-feedback" id="associationNameFeedback">
                                    {associationErrors.name.map(item => (
                                        <span className="fw-bold">{item}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label className="d-block mb-2">Adresse</label>
                                <input className="form-control" type="text" id="associationAddress" name="address" onChange={handleAddNewTextInputChange} value={association.address} placeholder="Adresse de la communauté" />
                                <div class="invalid-feedback" id="associationAddressFeedback">
                                    {associationErrors.address.map(item => (
                                        <span className="fw-bold">{item}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label className="d-block mb-2">Numéro de Compte Bancaire</label>
                                <input className="form-control" type="number" id="associationBankAccount" name="bankAccountNumber" onChange={handleAddNewTextInputChange} value={association.bankAccountNumber} placeholder="Compte Bancaire" />
                                <div class="invalid-feedback" id="associationBankAccountFeedback">
                                    {associationErrors.bankAccountNumber.map(item => (
                                        <span className="fw-bold">{item}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label className="d-block mb-2">Domiciliation Bancaire</label>
                                <input className="form-control" type="text" id="associationDomBank" name="bank_domiciliation" onChange={handleAddNewTextInputChange} value={association.bank_domiciliation} placeholder="Domiciliation Bancaire" />
                                <div class="invalid-feedback" id="associationDomBankFeedback">
                                    {associationErrors.bank_domiciliation.map(item => (
                                        <span className="fw-bold">{item}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label className="d-block mb-2">Date de Création</label>
                                <input className="form-control" type="date" id="associationDateCreation" format="yyyy-mm-dd" name="create_date" onChange={handleAddNewTextInputChange} value={association.create_date} placeholder="Date de Création" />
                                <div class="invalid-feedback" id="associationDateCreationFeedback">
                                    {associationErrors.create_date.map(item => (
                                        <span className="fw-bold">{item}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label className="d-block mb-2">Type</label>
                                <select className="form-select" name="type_id" onChange={handleAddNewTextInputChange} value={association.type_id} id="associationType"  >
                                    {associationTypes.map((item, index) => {
                                        return (
                                            <option key={index} selected={item.id === association.type_id} value={item.id}>{item.name}</option>
                                        );
                                    })}
                                </select>
                                <div class="invalid-feedback" id="associationTypeFeedback">
                                    {associationErrors.type_id.map(item => (
                                        <span className="fw-bold">{item}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="row my-5">
                            <div className="col-lg-6 mb-3">
                                <label className="d-block mb-2">Nombre de membres</label>
                                <input className="form-control" type="text" id="memberNumber" name="memberNumber" onChange={handleAddNewTextInputChange} value={association.memberNumber} placeholder="Nombre de membres" />
                                <div class="invalid-feedback" id="associationTypeFeedback">
                                    {associationErrors.memberNumber.map(item => (
                                        <span className="fw-bold">{item}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label className="d-block mb-2">Nombre potentiel de membres</label>
                                <input className="form-control" type="text" id="potMemberNumber" name="potentialMemberNumber" onChange={handleAddNewTextInputChange} value={association.potentialMemberNumber} placeholder="Nombre potentiel de membres" />
                                <div class="invalid-feedback" id="associationTypeFeedback">
                                    {associationErrors.potentialMemberNumber.map(item => (
                                        <span className="fw-bold">{item}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="row my-5">
                            <div className="col-lg-6 mb-3">
                                <label className="d-block mb-2">E-mail de l'association</label>
                                <input className="form-control" type="text" id="Email" name="email" onChange={handleAddNewTextInputChange} value={association.email} placeholder="Email de la communauté" />
                                <div class="invalid-feedback" id="associationTypeFeedback">
                                    {associationErrors.email.map(item => (
                                        <span className="fw-bold">{item}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label className="d-block mb-2">Numéro de Téléphone</label>
                                <input className="form-control" type="number" id="NumTel" name="phone" onChange={handleAddNewTextInputChange} value={association.phone} placeholder="Numéro de Téléphone" />
                                <div class="invalid-feedback" id="associationTypeFeedback">
                                    {associationErrors.phone.map(item => (
                                        <span className="fw-bold">{item}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label className="d-block mb-2">Premier Représentant</label>
                                <input className="form-control" type="text" id="PremRep" name="first_representative" onChange={handleAddNewTextInputChange} value={association.first_representative} placeholder="Numéro de Téléphone" />
                                <div class="invalid-feedback" id="associationTypeFeedback">
                                    {associationErrors.first_representative.map(item => (
                                        <span className="fw-bold">{item}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label className="d-block mb-2">Numéro de Téléphone du Premier Représentant</label>
                                <input className="form-control" type="number" id="PremRepTel" name="first_representative_phone" onChange={handleAddNewTextInputChange} value={association.first_representative_phone} placeholder="Numéro de Téléphone" />
                                <div class="invalid-feedback" id="associationTypeFeedback">
                                    {associationErrors.first_representative_phone.map(item => (
                                        <span className="fw-bold">{item}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label className="d-block mb-2">Second Représentant</label>
                                <input className="form-control" type="text" id="SecRep" name="second_representative" onChange={handleAddNewTextInputChange} value={association.second_representative} placeholder="Numéro de Téléphone" />
                                <div class="invalid-feedback" id="associationTypeFeedback">
                                    {associationErrors.second_representative.map(item => (
                                        <span className="fw-bold">{item}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label className="d-block mb-2">Numéro de Téléphone du Second Représentant</label>
                                <input className="form-control" type="number" id="SecRepTel" name="second_representative_phone" onChange={handleAddNewTextInputChange} value={association.second_representative_phone} placeholder="Numéro de Téléphone" />
                                <div class="invalid-feedback" id="associationTypeFeedback">
                                    {associationErrors.second_representative_phone.map(item => (
                                        <span className="fw-bold">{item}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 mb-3">
                                <label className="d-block mb-2">Logo</label>
                                <input className="form-control" type="file" name="logo" id="Logo" onChange={handleAddNewFileInputChange} placeholder="Logo" id="associationName" />
                                <div class="invalid-feedback" id="associationTypeFeedback">
                                    {associationErrors.logo.map(item => (
                                        <span className="fw-bold">{item}</span>
                                    ))}
                                </div>
                                {
                                    association.logo !== undefined ? 
                                    (
                                            <img loading="lazy" src={ association.logo ? ( typeof(association.logo) === "object" ? URL.createObjectURL(association.logo) : `${apiRoutes.StorageURL}/${association.logo}` ): faImage.iconName }
                                            alt="Logo Association" className="SampleImage mt-3" />
                                        ) 
                                        : ""
                                }
                            </div>
                            <div className="d-flex align-items-center mb-3">
                                <label className="d-block m-2">Documents</label>
                                <button className="btn btn-primary" id="addAssocDocFormLabel" type="button" data-bs-target="#addAssocDocForm" data-bs-toggle="modal">Ajouter</button>
                                {/* <input className="form-control" type="file" multiple name="assocDocs" onChange={handleAddNewMultiFileInputChange}  placeholder="Documents de l'association" /> */}
                            </div>
                            <div className="d-flex flex-column mb-3">
                                { association.documents.map((item, index) => {
                                    <div className="d-flex my-2 align-items-center">
                                    <span className="d-flex align-items-center btn btn-light">
                                        <button title="Supprimer le document" className="btn py-0" type="button" onClick={() => handleDeleteAssocDocDb(index)}><FontAwesomeIcon icon={faTimes} /></button>
                                        <h6 className="mb-0">{item.doc_name}</h6>
                                    </span>
                                </div>
                                })}
                                {assocDocs != null ?
                                    (assocDocs.map((item, index) => (
                                        <div className="d-flex my-2 align-items-center">
                                            <span className="d-flex align-items-center btn btn-light">
                                                <button title="Supprimer le document" className="btn py-0" type="button" onClick={() => handleDeleteAssocDoc(index)}><FontAwesomeIcon icon={faTimes} /></button>
                                                <h6 className="mb-0">{item.doc_name}</h6>
                                            </span>
                                        </div>
                                    ))) : null
                                }
                            </div>
                            <div className="col-lg-12 mb-3">
                                <label className="d-block mb-2">Description</label>
                                <div className="text-danger my-2" id="descriptionFeedback">
                                    {associationErrors.description.map(item => (
                                        <span className="fw-bold"><FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />{item}</span>
                                    ))}
                                </div>
                                {/* <textarea className="form-control" name="description" onChange={handleAddNewTextInputChange} value={association.description} placeholder="Description de la communauté"></textarea> */}
                                <RichTextEditor ref={assocDescription} data={association.description} onChange={RichTextEditorDescription} className="p-0" id="Description" />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={ () => history.push(route.admin.communautes.link) }>Fermer</button>
                        <button type="submit" className="btn btn-primary">Enregistrer</button>
                    </div>
                    <div className="modal fade" id="addAssocDocForm" tabIndex="-1" aria-labelledby="addAssocDocFormLabel" aria-hidden="true">
                        <div className="modal-dialog modal-xl">
                            <div className="modal-content">
                                <form id="AddAssociationDocumentForm">
                                    <div className="modal-header">
                                        <h5 className="modal-title fw-bold h3" id="addAssociationFormLabel">Ajouter un document à cette association</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div class="row">
                                            <div className="d-flex flex-column mb-3">
                                                <label className="d-block mb-2">Nom du Document</label>
                                                <input className="form-control" onChange={handleAddNewTextDocumentChange} type="text" name="doc_name" placeholder="Nom du document" />
                                            </div>
                                            <div className="d-flex flex-column mb-3">
                                                <label className="d-block mb-2">Fichier</label>
                                                <input className="form-control" type="file" name="doc_file" onChange={handleAddNewFileDocumentChange}  placeholder="Document" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                    <button type="submit" className="btn btn-primary"  data-bs-dismiss="modal" disabled={associationDoc.doc_file == null || associationDoc.doc_name == null || associationDoc.doc_name == ""} onClick={handleAddAssociationDocument}>Ajouter</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </form>        
                : null }
            </div>
        </div>
    )
}

export default EditAssociation;
