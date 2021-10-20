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