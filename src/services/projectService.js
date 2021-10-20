import axios from "axios";
import apiRoutes from "../config/apiConfig";
import server from "../config/serverConfig";

export const exportContributions = (assocId, projectId, success = null, error = null, before = () => {}, after = () => {}) => {
    before();
    axios.get(`${apiRoutes.ExportContributionsByProject}/${assocId}/${projectId}`, { responseType: 'blob' })
    .then( response => {
        success(response);
        console.log(response)
    }).catch( (response) => { 
        error(response);
    })
    after();
}