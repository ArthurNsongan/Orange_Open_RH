import axios from "axios";
import apiRoutes from "../config/apiConfig";
import { userLoginError, userLoginPending, userLoginSuccess } from "../redux/actions/userActions";
import { getHeaders, logOutStorage } from "./Auth";

export const getProject = (projetId, success = null, error = null, before = () => {}, after = () => {}) => {
    before();
    axios.get(`${apiRoutes.ProjectsURL}/${projetId}`)
    .then( response => {
        success(response);
        console.log(response.data)
    }).catch( ({response}) => { 
        console.log(response.data); 
        error(response);
    })
    after();
}

export const getAllPartners = (success = null, error = null, before = () => {}, after = () => {}) => {
    before();
    axios.get(`${apiRoutes.PartenairesURL}`)
    .then( response => {
        success(response);
        console.log(response.data)
    }).catch( ({response}) => { 
        console.log(response.data); 
        error(response);
    })
    after();
}

export const getAllInProgressProjects = (currentPage, perPage, success = null, error = null, before = () => {}, after = () => {}) => {
    before();
    axios.get(`${apiRoutes.InProgressProjectsURL}/paginate/${perPage}?page=${currentPage}`, { headers: getHeaders()})
    .then( response => {
        success(response);
        console.log(response.data)
    }).catch( (response) => { 
        // console.log(response.data); 
        error(response);
    })
    after();
}

export const getAllCategories = (success = null, error = null, before = () => {}, after = () => {}) => {
    before();
    axios.get(`${apiRoutes.CategoriesURL}`)
    .then( response => {
        success(response);
        console.log(response.data)
    })
    .catch( ({response}) => { 
        console.log(response.data); 
        error(response);
    })
    after();
}

export const getAssociationProjects = (association_id, success = null, error = null, before = () => {}, after = () => {}) => {
    before();
    axios.get(`${apiRoutes.AssociationProjectsURL}/${association_id}`)
    .then( response => {
        success(response);
        console.log(response.data)
    }).catch( ({response}) => { 
        console.log(response.data); 
        error(response);
    })
    after();
}


export const changeProjectStatus = (status, projectId, associationId,  success = null, error = null, before = () => {}, after = () => {}) => {
    before();
    let data = {
        status: status,
        association_id: associationId,
    }
    console.log("changeProjectStatus", data);
    axios.put(`${apiRoutes.ProjectChangeStatusURL}/${projectId}`, data)
    .then( response => {
        success(response);
        console.log(response.data)
    }).catch( (response) => { 
        console.log(response.data); 
        error(response);
    })
    after();
}

export const userLogin = (login, password, success = null, error = null, before = () => {}, after = () => {}) => {
    before();
    let data = {
        email: login,
        password: password,
    }
    console.log("userLogin", data);
    axios.post(`${apiRoutes.LoginURL}`, data)
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
    after();
    // return dispatch => {
    //     dispatch(userLoginPending());
    //     let data = {
    //         email: login,
    //         password: password,
    //     }
    //     console.log("userLogin", data);
    //     axios.post(`${apiRoutes.LoginURL}`, data)
    //     .then( response => {
    //         dispatch(userLoginSuccess(response))
    //         success(response);
    //         console.log(response)
    //     }).catch( (exception) => {
    //         console.warn(exception); 
    //         if(exception.response) { dispatch(userLoginError(exception.response)) }
    //         else if(exception.request) { dispatch(userLoginError(exception.request)) }
    //         else { dispatch(userLoginError(exception.message)) }
    //         error(exception);
    //     })
    //     after();
    // }
}

export const userLogout = (pushMethod, before = () => {}, after = () => {}) => {
    before();
    console.log("userLogout");
    axios.post(`${apiRoutes.LogoutURL}`, {}, { headers: getHeaders() })
    .then( response => {
        console.log(response);
        logOutStorage(pushMethod);
    }).catch( (exception) => { 
        try { console.log(exception.response); }
        catch(exc) { console.log(exc); }
        console.log(exception);
    })
    after();
}

export const isValidToken = (success = null, error = null, before = () => {}, after = () => {}) => {
    before();
    console.log("userLogout");
    axios.post(`${apiRoutes.VerifyTokenURL}`, {}, { headers: getHeaders() })
    .then( response => {
        success(response);
        console.log(response)
    }).catch( (response) => { 
        try { console.log(response.data); }
        catch(exc) { console.log(exc); }
        error(response);
    })
    after();
}

export const verifyTwoFactorCode = (two_factor_code, token, success = null, error = null, before = () => {}, after = () => {}) => {
    before();
    console.log("verify two factor code");
    let data = {
        two_factor_code: two_factor_code
    }
    let headers = {
        "Authorization" : `Bearer ${token}`
    }
    axios.post(`${apiRoutes.VerifyTwoFactorCode}`, data, { headers: headers })
    .then( response => {
        success(response);
        console.log(response)
    }).catch( ({response}) => { 
        try { console.log(response.data); }
        catch(exc) { console.log(exc); }
        error(response);
    })
    after();
}

export const resendTwoFactorCode = (token, success = null, error = null, before = () => {}, after = () => {}) => {
    before();
    console.log("resend two factor code");
    let headers = {
        "Authorization" : `Bearer ${token}`
    }
    axios.post(`${apiRoutes.ResendTwoFactorCode}`, {}, { headers: headers })
    .then( response => {
        success(response);
        console.log(response)
    }).catch( (response) => { 
        try { console.log(response.response.data); }
        catch(exc) { console.log(exc); }
        error(response);
    })
    after();
}
