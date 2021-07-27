import React, { useEffect, useState } from 'react'

import { faPlus, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import apiRoutes from "../../../../config/apiConfig"
// import Button from '../../../components/Button'

import $ from "jquery"
import { toast } from 'react-toastify';
import RichTextEditor from '../../../../components/RichTextEditor';
import { useHistory } from 'react-router';
import { Helmet } from 'react-helmet';
// import '@popperjs/core';
// import 'bootstrap'

let route = require("../../../../utils/route.json")

let associationTypesStatic = require("../../../../utils/associationTypes.json")

function AddAssociation(props) {

    let history = useHistory()

    const [associations, setAssociations] = useState([]);

const [association, setAssociation] = useState({
    assocDocs: []
})

const [associationDoc, setAssociationDoc] = useState({})


const [associationTypes, setAssociationTypes] = useState([]);

const taille = 10;

const handleFilter = (e) => {
    
}

const IsRightAssociation = (item, search) => {
    return ( item.name.includes(`${search}`) || item.description.includes(`${search}`) )
}

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

    axios.get(`${apiRoutes.AssociationsURL}/paginate/${taille}`)
    .then( response => {
        setAssociations(response.data.data)
        console.log(response.data)
    })
}, [props])

const handleSubmitNewAssociation = (event) => {
    event.preventDefault();

    let inputListNames = ["doc_name", "doc_file"]
    let firstInvalidItem = null
    let isValid = true
    let form = document.querySelector("#AddAssocForm")
    Array.from(form.elements === undefined ? [] : form.elements).forEach( item => {
        item.classList.remove("is-invalid")
        if(item.value.length === 0 && !inputListNames.includes(item.name) && !item.classList.contains("ck-hidden") && ( item.tagName === "INPUT" || item.tagName === "SELECT" ) )
        {
            item.classList.add("is-invalid");
            console.log(item)
            isValid = false;
        }
        if(firstInvalidItem === null) { firstInvalidItem = item}
    })
    if(isValid === false || form === null) {
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
        return false;
    }
    console.log("Association Object : \n");
    const { assocDocs , ...assocTemp} = association
    console.log(assocTemp);
    console.log("Association FormData");
    var assocFormData = new FormData();
    assocFormData.append("name", assocTemp.name)
    assocFormData.append("description", assocTemp.description)
    assocFormData.append("logo", assocTemp.logo)
    assocFormData.append("bankAccountNumber", assocTemp.bankAccountNumber)
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
    assocFormData.append("type_id", parseInt(assocTemp.type_id))
    assocFormData.append("email", assocTemp.email)
    console.log(assocTemp.first_representative_phone)

    let axiosRequest = axios.create();
    axiosRequest.post(apiRoutes.AssociationsURL, assocFormData)
        .then(response => {
            console.log(response.data)
            const dbAssoc = response.data;

            assocDocs.forEach((item) => {
                var docFormData = new FormData();
                docFormData.append("name", item.doc_name)
                docFormData.append("path", item.doc_file)
                docFormData.append("association_id", dbAssoc.id)
                axios.post(`${apiRoutes.DocumentURL}`, docFormData)
                .then((response) => {
                    console.log(response.data)
                })
            })


            toast.success(<div className="d-flex justify-content-center fs-6">Association ajoutée avec succès !</div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            history.push(route.admin.communautes.link)
        }).catch( ({ response }) => {
            console.log(response)
            toast.error(<><div className="d-flex justify-content-center fs-6">Erreur sur le serveur !</div></>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        })
    
    console.log(axiosRequest)
}

const handleAddNewTextInputChange = (e) => {
    const { name, value } = e.target
    let assocTemp = {
        ...association,
    }
    assocTemp[name] = value
    setAssociation(assocTemp)
    console.log(association)
}

const handleAddNewFileInputChange = (e) => {
    // console.log("Logo : ", e.target.files[0])
    const { name, files } = e.target
    let assocTemp = {
        ...association,
    }
    assocTemp[name] = files[0]
    setAssociation(assocTemp)
    console.log(association)
}

const handleAddNewMultiFileInputChange = (e) => {
    console.log("Documents : ", e.target.files)
    console.log(e.target.files[0])
    const { name, files } = e.target
    let assocTemp = {
        ...association,
    }
    assocTemp[name] = Array.from(files)
    e.target.value = null
    setAssociation(assocTemp)
    console.log(assocTemp)
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
}

const handleAddAssociationDocument = (e) => {
    e.preventDefault();
    
    let associationTmp = {
        ...association,
    }

    console.log(associationTmp.assocDocs)
    associationTmp.assocDocs.push(associationDoc);
    console.log("assocDoc", associationDoc)
    console.log(associationTmp);
    document.querySelector("input[name='doc_file']").value=null
    document.querySelector("input[name='doc_name']").value=null
    setAssociation(associationTmp)
    setAssociationDoc({})
}

const RichTextEditorDescription = (e) => {

    let assocTemp = {
        ...association,
    }

    assocTemp["description"] = e.getData()
    setAssociation(assocTemp)
    console.log(association)

}

const handleDeleteAssocDoc = (index) => {
    let associationTmp = {
        ...association,
    }

    associationTmp.assocDocs.splice(index, 1);
    setAssociation(associationTmp)
    console.log(associationTmp.assocDocs)
}


return (
    <div className="d-flex flex-column">
        {/* <h2>Communautés</h2> */}
        <Helmet title={"Ajouter une Nouvelle Communauté - Communautés"} />
        <h4 className="fw-bold mb-4">Ajouter une Communauté</h4>
        <div className="row bg-white shadow-sm px-2 py-4 mb-3 mx-0">
            <form onSubmit={handleSubmitNewAssociation} id="AddAssocForm">
            <div className="modal-body">
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <label className="d-block mb-2">Nom</label>
                        <input className="form-control" onChange={handleAddNewTextInputChange} id="associationName" aria-describedby="associationNameFeedback" type="text" name="name" value={association.name} placeholder="Nom de la communauté"  />
                        <div class="invalid-feedback" id="associationNameFeedback"></div>
                    </div>
                    <div className="col-lg-6 mb-3">
                        <label className="d-block mb-2">Adresse</label>
                        <input className="form-control" type="text"  id="associationAddress"  name="address" onChange={handleAddNewTextInputChange} value={association.address} placeholder="Adresse de la communauté" />
                        <div class="invalid-feedback" id="associationAddressFeedback"></div>
                    </div>
                    <div className="col-lg-6 mb-3">
                        <label className="d-block mb-2">Numéro de Compte Bancaire</label>
                        <input className="form-control" type="number" id="associationBankAccount"  name="bankAccountNumber" onChange={handleAddNewTextInputChange} value={association.bankAccountNumber} placeholder="Compte Bancaire"  />
                        <div class="invalid-feedback" id="associationBankAccountFeedback"></div>
                    </div>
                    <div className="col-lg-6 mb-3">
                        <label className="d-block mb-2">Domiciliation Bancaire</label>
                        <input className="form-control" type="text" id="associationDomBank"   name="bank_domiciliation" onChange={handleAddNewTextInputChange} value={association.bank_domiciliation} placeholder="Domiciliation Bancaire"  />
                    </div>
                    <div className="col-lg-6 mb-3">
                        <label className="d-block mb-2">Date de Création</label>
                        <input className="form-control" type="date"  id="associationDateCreation"  format="yyyy-mm-dd" name="create_date" onChange={handleAddNewTextInputChange} value={association.create_date} placeholder="Date de Création"  />
                    </div>
                    <div className="col-lg-6 mb-3">
                        <label className="d-block mb-2">Type</label>
                        <select className="form-control" name="type_id" onChange={handleAddNewTextInputChange} value={association.type_id} id="associationType"  >
                            { associationTypes.map((item, index) => {
                                return (
                                    <option key={index} value={item.id}>{item.name}</option>
                                );
                            })}
                        </select>
                    </div>
                </div>

                <div className="row my-5">
                    <div className="col-lg-6 mb-3">
                        <label className="d-block mb-2">Nombre de membres</label>
                        <input className="form-control" type="text"  id="memberNumber"  name="memberNumber" onChange={handleAddNewTextInputChange} value={association.memberNumber} placeholder="Nombre de membres" />
                    </div>
                    <div className="col-lg-6 mb-3">
                        <label className="d-block mb-2">Nombre potentiel de membres</label>
                        <input className="form-control" type="text"  id="potMemberNumber"  name="potentialMemberNumber" onChange={handleAddNewTextInputChange} value={association.potentialMemberNumber} placeholder="Nombre potentiel de membres" />
                    </div>
                </div>

                <div className="row my-5">
                    <div className="col-lg-6 mb-3">
                        <label className="d-block mb-2">E-mail de l'association</label>
                        <input className="form-control" type="text"  id="Email"  name="email" onChange={handleAddNewTextInputChange} value={association.email} placeholder="Email de la communauté" />
                    </div>
                    <div className="col-lg-6 mb-3">
                        <label className="d-block mb-2">Numéro de Téléphone</label>
                        <input className="form-control" type="number"  id="NumTel"  name="phone" onChange={handleAddNewTextInputChange} value={association.phone} placeholder="Numéro de Téléphone" />
                    </div>
                    <div className="col-lg-6 mb-3">
                        <label className="d-block mb-2">Premier Représentation</label>
                        <input className="form-control" type="text"  id="PremRep"  name="first_representative" onChange={handleAddNewTextInputChange} value={association.first_representative } placeholder="Numéro de Téléphone" />
                    </div>
                    <div className="col-lg-6 mb-3">
                        <label className="d-block mb-2">Numéro de Téléphone du Premier Représentant</label>
                        <input className="form-control" type="text"  id="PremRepTel"  name="first_representative_phone" onChange={handleAddNewTextInputChange} value={association.first_representative_phone } placeholder="Numéro de Téléphone" />
                    </div>
                    <div className="col-lg-6 mb-3">
                        <label className="d-block mb-2">Second Représentation</label>
                        <input className="form-control" type="text"  id="SecRep"  name="second_representative" onChange={handleAddNewTextInputChange} value={association.second_representative } placeholder="Numéro de Téléphone" />
                    </div>
                    <div className="col-lg-6 mb-3">
                        <label className="d-block mb-2">Numéro de Téléphone du Second Représentant</label>
                        <input className="form-control" type="text"  id="SecRepTel"  name="second_representative_phone" onChange={handleAddNewTextInputChange} value={association.second_representative_phone } placeholder="Numéro de Téléphone" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <label className="d-block mb-2">Logo</label>
                        <input className="form-control" type="file" name="logo" id="Logo" onChange={handleAddNewFileInputChange}  placeholder="Logo" id="associationName" />
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <label className="d-block m-2">Documents</label>
                        <button className="btn btn-primary" id="addAssocDocFormLabel" type="button" data-bs-target="#addAssocDocForm" data-bs-toggle="modal">Ajouter</button>
                        {/* <input className="form-control" type="file" multiple name="assocDocs" onChange={handleAddNewMultiFileInputChange}  placeholder="Documents de l'association" /> */}
                    </div>
                    <div className="d-flex flex-column mb-3">
                        { association.assocDocs != null ? 
                            ( association.assocDocs.map((item, index) => (
                                <div className="d-flex my-2 align-items-center">
                                    <button title="Supprimer le document" className="btn btn-white py-0" type="button" onClick={()=> handleDeleteAssocDoc(index)}><FontAwesomeIcon icon={faTimes} /></button>
                                    <h6 className="mb-0">{item.doc_name}</h6>
                                </div>
                            ))) : null
                        }
                    </div>
                    <div className="col-lg-12 mb-3">
                        <label className="d-block mb-2">Description</label>
                        {/* <textarea className="form-control" name="description" onChange={handleAddNewTextInputChange} value={association.description} placeholder="Description de la communauté"></textarea> */}
                        <RichTextEditor onChange={RichTextEditorDescription} className="form-control" id="Description" />
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
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
                                    <button type="submit" className="btn btn-primary"  data-bs-dismiss="modal" onClick={handleAddAssociationDocument}>Ajouter</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
)
}

export default AddAssociation
