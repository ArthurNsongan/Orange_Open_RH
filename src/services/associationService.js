import axios from "axios";
import apiRoutes from "../config/apiConfig";
import server from "../config/serverConfig";

export const exportMembers = (assocId, success = null, error = null, before = () => {}, after = () => {}) => {
    before();
    axios.get(`${apiRoutes.ExportAssociationMembers}/${assocId}`, { responseType: 'blob' })
    .then( response => {
        success(response);
        console.log(response?.data)
    }).catch( (response) => { 
        error(response);
    })
    after();
}

export const getAllAssociations = (perPage, currentPage, success = null, error = null, before = () => {}, after = () => {}) => {
    before();
    axios.get(`${apiRoutes.AssociationsURL}/paginate/${perPage}?page=${currentPage}`)
    .then( response => { 
        success(response);
        console.log(response?.data);
    }).catch( (exception) => { 
        error(exception);
    })
    after();
}

export const getAllActiveAssociations = (perPage, currentPage, success = null, error = null, before = () => {}, after = () => {}) => {
    before();
    axios.get(`${apiRoutes.GetActiveAssociationsURL}/${perPage}?page=${currentPage}`)
    .then( response => { 
        success(response);
        console.log(response?.data);
    }).catch( (exception) => { 
        error(exception);
    })
    after();
}

export const getAllInactiveAssociations = (perPage, currentPage, success = null, error = null, before = () => {}, after = () => {}) => {
    before();
    axios.get(`${apiRoutes.GetInactiveAssociationsURL}/${perPage}?page=${currentPage}`)
    .then( response => { 
        success(response);
        console.log(response?.data);
    }).catch( (exception) => { 
        error(exception);
    })
    after();
}

export const getAssociationTypes = (success = null, error = null, before = () => {}, after = () => {} ) => {
    axios.get(`${apiRoutes.AssociationTypesURL}`)
    .then( response => {
        success(response);
        console.log(response.data);
    }).catch( (exception) => { 
        error(exception);
    })
}

export const createAssociation = (associationData, success = null, error = null, before = () => {}, after = () => {} ) => {
    axios.post(apiRoutes.AssociationsURL, associationData)
    .then(response => {
        console.log(response.data)
        success(response);
    }).catch( (exception) => {
        console.log(exception)
        error(exception)
    })
}


