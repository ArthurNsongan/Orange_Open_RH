import axios from "axios";
import apiRoutes from "../config/apiConfig";
import { getHeaders, logOutStorage } from "./Auth";

export const partnerRegister = (newPartner, success = null, error = null, before = () => {}, after = () => {}) => {
    console.log("registerPartner", newPartner);
    axios.post(`${apiRoutes.RegisterPartnerURL}`, newPartner)
    .then( response => {
        success(response);
        console.log(response)
    }).catch( (exception) => {
        console.warn(exception); 
        if(exception.response) { console.log(exception.response) }
        else if(exception.request) { console.log(exception.request) }
        else { console.log(exception.message) }
        error(exception);
    })
}

export const partnerLogout = (pushMethod, before = () => {}, after = () => {}) => {
    before();
    console.log("userLogout");
    axios.post(`${apiRoutes.LogoutPartnerURL}`, {}, { headers: getHeaders() })
    .then( response => {
        console.log(response);
    }).catch( (exception) => { 
        try { console.log(exception.response); }
        catch(exc) { console.log(exc); }
        console.log(exception);
    });
    logOutStorage(pushMethod);
    after();
}

export const partnerLogin = (login, password, success = null, error = null, before = () => {}, after = () => {}) => {
    before();
    let data = {
        email: login,
        password: password,
        choice: 0
    }
    console.log("partnerLogin", data);
    axios.post(`${apiRoutes.LoginURL}`, data)
    .then( response => {
        success(response);
        console.log("Partner Login", response)
    }).catch( (exception) => {
        console.warn(exception);
        error(exception);
    })
    after();
}

export const partnerJoinProject = (project_id, success = null, error = null, before = () => {}, after = () => {}) => {
    before();
    let data = {
        project: project_id,
        project_id: project_id
    }
    console.log("partner is joining project with id " + project_id, data);
    axios.post(`${apiRoutes.PartnerJoinProjectURL}/${project_id}`, data)
    .then( response => {
        success(response);
        console.log("Partner Login", response)
    }).catch( (exception) => {
        try {
            console.log(exception?.response?.data);
        } catch(exception) {
            console.log(exception);
        }
    })
    after();
}