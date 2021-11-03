import axios from "axios";
import apiRoutes from "../config/apiConfig";
import server from "../config/serverConfig";
// import { userLoginError, userLoginPending, userLoginSuccess } from "../redux/actions/userActions";
import { getHeaders, logOutStorage } from "./Auth";

export const getProject = (projetId, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.get(`${apiRoutes.ProjectsURL}/${projetId}`)
            .then(response => {
                success(response);
                console.log(response.data)
            }).catch((exception) => {
                console.log(exception?.response?.data);
                error(exception?.response);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const getAssociation = (assocId, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.get(`${apiRoutes.AssociationsURL}/${assocId}`)
            .then(response => {
                success(response);
                console.log(response?.data)
            }).catch((response) => {
                error(response);
            })
        after();
    } catch (error) {
        console.log(error)
    }
    after();
}

export const deactivateOrActivateAssociation = (assocId, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.get(`${apiRoutes.AssociationsURL}/${assocId}`)
            .then(response => {
                success(response);
                console.log(response?.data)
            }).catch((response) => {
                error(response);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const getAllPartners = (success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.get(`${apiRoutes.PartenairesURL}`)
            .then(response => {
                success(response);
                console.log(response.data)
            }).catch((exception) => {
                if (exception.response) { error(exception.response) }
                else if (exception.request) { error(exception.request) }
                else { error(exception.message) }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const AddProjectPartner = (data, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.post(`${apiRoutes.ProjectAddPartenaireURL}`)
            .then(response => {
                success(response);
                console.log(response.data)
            }).catch((exception) => {
                if (exception.response) { error(exception.response) }
                else if (exception.request) { error(exception.request) }
                else { error(exception.message) }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const removeProjectPartner = (data, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.post(`${apiRoutes.ProjectRemovePartenaireURL}`, data)
            .then(response => {
                success(response);
                console.log(response.data)
            }).catch((exception) => {
                if (exception.response) { error(exception.response) }
                else if (exception.request) { error(exception.request) }
                else { error(exception.message) }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const updatePartner = (id, data, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.post(`${apiRoutes.PartenairesURL}/${id}`, data)
            .then(response => {
                success(response);
                console.log(response.data)
            }).catch((exception) => {
                if (exception.response) { error(exception.response) }
                else if (exception.request) { error(exception.request) }
                else { error(exception.message) }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const createPartner = (data, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.post(`${apiRoutes.PartenairesURL}`, data)
            .then(response => {
                success(response);
                console.log(response.data)
            }).catch((exception) => {
                if (exception.response) { error(exception.response) }
                else if (exception.request) { error(exception.request) }
                else { error(exception.message) }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const getAllInProgressProjects = (currentPage, perPage, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.get(`${apiRoutes.InProgressProjectsURL}/paginate/${perPage}?page=${currentPage}`, { headers: getHeaders() })
            .then(response => {
                success(response);
                console.log(response?.data)
            }).catch((exception) => {
                if (exception.response) { error(exception.response) }
                else if (exception.request) { error(exception.request) }
                else { error(exception.message) }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const getAllCategories = (success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.get(`${apiRoutes.CategoriesURL}`)
            .then(response => {
                success(response);
                console.log(response.data)
            })
            .catch((exception) => {
                if (exception.response) { error(exception.response) }
                else if (exception.request) { error(exception.request) }
                else { error(exception.message) }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const getAssociationProjects = (association_id, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.get(`${apiRoutes.AssociationProjectsURL}/${association_id}`)
            .then(response => {
                success(response);
                console.log(response.data)
            }).catch((exception) => {
                if (exception.response) { error(exception.response) }
                else if (exception.request) { error(exception.request) }
                else { error(exception.message) }
                error(exception);
            });
    } catch (error) {
        console.log(error)
    }
    after();
}

export const getAssociationMembers = (association_id, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.get(`${apiRoutes.AssociationMembersURL}/${association_id}`)
            .then(response => {
                success(response);
                console.log(response.data);
            }).catch((exception) => {
                if (exception.response) { error(exception.response) }
                else if (exception.request) { error(exception.request) }
                else { error(exception.message) }
                error(exception);
            });
    } catch (error) {
        console.log(error)
    }
    after();
}

export const changeProjectStatus = (status, projectId, associationId, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        let data = {
            status: status,
            association_id: associationId,
        }
        console.log("changeProjectStatus", data);
        axios.put(`${apiRoutes.ProjectChangeStatusURL}/${projectId}`, data)
            .then(response => {
                success(response);
                console.log(response.data)
            }).catch((exception) => {
                if (exception.response) { error(exception.response) }
                else if (exception.request) { error(exception.request) }
                else { error(exception.message) }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const userRegister = (newUser, success = null, error = null, before = () => { }, after = () => { }) => {
    before()
    console.log("registerUser", newUser);
    try {
        axios.post(`${apiRoutes.RegisterURL}`, newUser)
            .then(response => {
                success(response);
                console.log(response)
            }).catch((exception) => {
                console.warn(exception);
                if (exception.response) { console.log(exception.response) }
                else if (exception.request) { console.log(exception.request) }
                else { console.log(exception.message) }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after()
}

export const partnerRegister = (newPartner, success = null, error = null, before = () => { }, after = () => { }) => {
    before()
    console.log("registerPartner", newPartner);
    try {
        axios.post(`${apiRoutes.RegisterPartnerURL}`, newPartner)
            .then(response => {
                success(response);
                console.log(response)
            }).catch((exception) => {
                console.warn(exception);
                if (exception.response) { console.log(exception.response) }
                else if (exception.request) { console.log(exception.request) }
                else { console.log(exception.message) }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after()
}

export const AddMember = (user_id, association_id, registration_number, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        let data = {
            user_id: user_id,
            association_id: association_id,
            registration_number: registration_number
        }
        axios.post(`${apiRoutes.AddMemberAssociationURL}`, data)
            .then(response => {
                success(response);
                console.log(response)
            }).catch((exception) => {
                console.log(exception)
                // try { console.log(exception?.response?.data); }
                // catch(exc) { console.log(exc); }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const userLogin = (login, password, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        let data = {
            email: login,
            password: password,
            choice: 1
        }
        console.log("userLogin", data);
        axios.post(`${apiRoutes.LoginURL}`, data)
            .then(response => {
                success(response);
                console.log(response)
            }).catch((exception) => {
                console.warn(exception);
                // if(exception.response) { console.log(exception.response) }
                // else if(exception.request) { console.log(exception.request) }
                // else { console.log(exception.message) }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
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

export const userLogout = (pushMethod, before = () => { }, after = () => { }) => {
    before();
    try {
        console.log("userLogout");
        axios.post(`${apiRoutes.LogoutURL}`, {}, { headers: getHeaders() })
            .then(response => {
                console.log(response);
            }).catch((exception) => {
                try { console.log(exception.response); }
                catch (exc) { console.log(exc); }
                console.log(exception);
            })
        logOutStorage(pushMethod);
    } catch (error) {
        console.log(error)
    }
    after();
}

export const isValidToken = (success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    console.log("userLogout");
    try {
        axios.post(`${apiRoutes.VerifyTokenURL}`, {}, { headers: getHeaders() })
            .then(response => {
                success(response);
                console.log(response)
            }).catch((response) => {
                try { console.log(response.data); }
                catch (exc) { console.log(exc); }
                error(response);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const refreshToken = (success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    console.log("refreshToken");
    try {
        axios.post(`${apiRoutes.RefreshTokenURL}`, {})
            .then(response => {
                success(response);
                console.log(response)
            }).catch((response) => {
                // try { console.log(response.data); }
                // catch(exc) { console.log(exc); }
                error(response);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const verifyTwoFactorCode = (two_factor_code, token, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    console.log("verify two factor code");
    try {
        let data = {
            two_factor_code: two_factor_code
        }
        let headers = {
            "Authorization": `Bearer ${token}`
        }
        axios.post(`${apiRoutes.VerifyTwoFactorCode}`, data, { headers: headers })
            .then(response => {
                success(response);
                console.log(response)
            }).catch((exception) => {
                try { console.log(exception?.response?.data); }
                catch (exc) { console.log(exc); }
                error(exception?.response);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const resendTwoFactorCode = (token, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    console.log("resend two factor code");
    try {
        axios.post(`${apiRoutes.ResendTwoFactorCode}`, {}, { headers: headers })
            .then(response => {
                success(response);
                console.log(response)
            }).catch((response) => {
                try { console.log(response?.response?.data); }
                catch (exc) { console.log(exc); }
                error(response);
            })
    } catch (error) {
        console.log(error)
    }
    let headers = {
        "Authorization": `Bearer ${token}`
    }
    after();
}

export const getUserMe = (success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    console.log("getUserMe");
    try {
        axios.post(`${apiRoutes.ConnectedUserURL}`, {}, { headers: getHeaders() })
            .then(response => {
                success(response);
                console.log(response)
            }).catch((exception) => {
                try { console.log(exception?.response?.data); }
                catch (exc) { console.log(exc); }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const getUsers = (success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    console.log("getUsers");
    try {
        axios.get(`${apiRoutes.UsersURL}`)
            .then(response => {
                success(response);
                console.log(response)
            }).catch((exception) => {
                try { console.log(exception?.response?.data); }
                catch (exc) { console.log(exc); }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const getUsersPagination = (currentPage = null, perPage = null, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    console.log("getUsers");
    try {
        axios.get(`${apiRoutes.UsersPaginationURL}/${perPage}${currentPage != null && `?page=${currentPage}`}`)
            .then(response => {
                success(response);
                console.log(response)
            }).catch((exception) => {
                try { console.log(exception?.response?.data); }
                catch (exc) { console.log(exc); }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const getUser = (user_id, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        console.log("getUser : " + user_id)
        axios.get(`${apiRoutes.UsersURL}/${user_id}`)
            .then(response => {
                success(response);
                console.log(response)
            }).catch((exception) => {
                try { console.log(exception?.response?.data); }
                catch (exc) { console.log(exc); }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const getRoles = (success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.get(`${apiRoutes.RolesURL}`)
            .then(response => {
                success(response);
                console.log(response)
            }).catch((exception) => {
                try { console.log(exception?.response?.data); }
                catch (exc) { console.log(exc); }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const AllAssociations = (success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.get(`${apiRoutes.AssociationsURL}/all`)
            .then(response => {
                success(response);
                console.log(response)
            }).catch((exception) => {
                try { console.log(exception?.response?.data); }
                catch (exc) { console.log(exc); }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const UpdateUser = (user, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.put(`${apiRoutes.UsersURL}/${user.id}`, user)
            .then(response => {
                success(response);
                console.log(response)
            }).catch((exception) => {
                // try { console.log(exception?.response?.data); }
                // catch(exc) { console.log(exc); }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const CreateUser = (user, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.post(`${apiRoutes.UsersURL}`, user)
            .then(response => {
                success(response);
                console.log(response)
            }).catch((exception) => {
                try { console.log(exception?.response?.data); }
                catch (exc) { console.log(exc); }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const CreateMember = (user, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.put(`${apiRoutes.UsersURL}/${user.id}`, user)
            .then(response => {
                success(response);
                console.log(response)
            }).catch((exception) => {
                try { console.log(exception?.response?.data); }
                catch (exc) { console.log(exc); }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const getRoleByUser = (user_id, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.get(`${apiRoutes.RolesURL}/user/${user_id}`)
            .then(response => {
                success(response);
                console.log(response)
            }).catch((exception) => {
                // try { console.log(exception?.response?.data); }
                // catch(exc) { console.log(exc); }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const AddRole = (user_id, role_id, association_id, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        let data = {
            user_id: user_id,
            role_id: role_id,
            association_id: association_id
        }

        axios.post(`${apiRoutes.UsersURL}/add/role`, data)
            .then(response => {
                success(response);
                console.log(response)
            }).catch((exception) => {
                console.log(exception)
                // try { console.log(exception?.response?.data); }
                // catch(exc) { console.log(exc); }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const RemoveRole = (user_id, role_id, assocId, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        let data = {
            user_id: user_id,
            role_id: role_id,
            association_id: assocId
        }
        axios.post(`${apiRoutes.UsersURL}/remove/role`, data)
            .then(response => {
                success(response);
                console.log(response)
            }).catch((exception) => {
                console.log(exception)
                try { console.log(exception?.response?.data); }
                catch (exc) { console.log(exc); }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const getAccessToken = (success = null, error = () => { }, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.post(apiRoutes.AccessTokenURL, {})
            .then(response => {
                success(response);
                console.log(response);
            }).catch(exception => {
                try {
                    console.log(exception?.response?.data);
                }
                catch (exc) { console.log(exc); }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const initPayment = (accessToken, OmAccountNumber, PIN, amount, project_id, success = null, error = () => { }, before = () => { }, after = () => { }) => {
    before();
    try {
        let data = {
            payToken: accessToken,
            subscriberMsisdn: OmAccountNumber,
            channelUserMsisdn: '699948733',
            pin: "2020",
            amount: amount,
            notifUrl: `${server.apiAddress}/api/mp/notifurl/`,
            project_id: project_id
        }
        console.log("initPaymentObject", data);
        axios.post(apiRoutes.InitPaymentURL, data)
            .then(response => {
                success(response);
                console.log(response);
            }).catch(exception => {
                try {
                    console.log(exception?.response?.data);
                }
                catch (exc) { console.log(exc); }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const getAllPaymentByProject = (project_id, success = null, error = () => { }, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.get(`${apiRoutes.getAllPaymentByProject}/${project_id}`)
            .then(response => {
                success(response);
                console.log(response);
            }).catch(exception => {
                try {
                    console.log(exception?.response?.data);
                }
                catch (exc) { console.log(exc); }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const activateMember = (member_id, association_id, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.put(`${apiRoutes.ActivateMember}`, {
            "user_id": member_id,
            "association_id": association_id
        })
            .then(response => {
                success(response);
                console.log(response);
            }).catch(exception => {
                try {
                    console.log(exception?.response?.data);
                }
                catch (exc) { console.log(exc); }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const getProjectStat = (project_id, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.get(`${apiRoutes.GetProjectStat}/${project_id}`)
            .then(response => {
                success(response);
                console.log(response);
            }).catch(exception => {
                try {
                    console.log(exception?.response?.data);
                }
                catch (exc) { console.log(exc); }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const getAssociationInactiveMembers = (association_id, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.get(`${apiRoutes.GetAssociationInactiveMembers}/${association_id}`)
            .then(response => {
                success(response);
                console.log(response);
            }).catch(exception => {
                try {
                    console.log(exception?.response?.data);
                }
                catch (exc) { console.log(exc); }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const getDashboardContributionsStats = (success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.get(`${apiRoutes.StatContributions}`)
            .then(response => {
                success(response);
                console.log(response);
            }).catch(exception => {
                try {
                    console.log(exception?.response?.data);
                }
                catch (exc) { console.log(exc); }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const getDashboardProjects = (success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.get(`${apiRoutes.StatContributions}`)
            .then(response => {
                success(response);
                console.log(response);
            }).catch(exception => {
                try {
                    console.log(exception?.response?.data);
                }
                catch (exc) { console.log(exc); }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const resetPasswordInit = (email, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.post(`${apiRoutes.ResetPasswordInit}`, { email })
            .then(response => {
                success(response);
                console.log(response);
            }).catch(exception => {
                try {
                    console.log(exception?.response?.data);
                }
                catch (exc) { console.log(exc); }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const resetPasswordProcess = (email, password, password_confirmation, passwordToken, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.post(`${apiRoutes.ResetPasswordProcess}`, { email, password, password_confirmation, passwordToken })
            .then(response => {
                success(response);
                console.log(response);
            }).catch(exception => {
                try {
                    console.log(exception?.response?.data);
                }
                catch (exc) { console.log(exc); }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }

    after();
}

export const sendNotification = (message, contact, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.post(`${apiRoutes.SendNotification}`, { message, contact })
            .then(response => {
                success(response);
                console.log(response);
            }).catch(exception => {
                try {
                    console.log(exception?.response?.data);
                }
                catch (exc) { console.log(exc); }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const sendScheduledNotification = (message, contact, date, time, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.post(`${apiRoutes.SendNotification}`, { message, contact })
            .then(response => {
                success(response);
                console.log(response);
            }).catch(exception => {
                try {
                    console.log(exception?.response?.data);
                }
                catch (exc) { console.log(exc); }
                error(exception);
            })
    } catch (error) {
        console.log(error)
    }
    after();
}

export const checkUserDataValidation = (userData, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.post(`${apiRoutes.CheckUserDataValidation}`, userData)
            .then(response => {
                success(response);
                console.log(response);
            }).catch(exception => {
                console.log(exception?.response?.data);
                error(exception);
            })
    } catch (error) {
        console.error(error)
    }
    after();
}

export const changePasswordCheck = (data, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.post(`${apiRoutes.ChangePasswordCheck}`, data)
            .then(response => {
                success(response);
                console.log(response);
            }).catch(exception => {
                console.log(exception?.response?.data);
                error(exception);
            })
    } catch (error) {
        console.error(error)
    }
    after();
}

export const changePassword = (userData, success = null, error = null, before = () => { }, after = () => { }) => {
    before();
    try {
        axios.put(`${apiRoutes.ChangePassword}`, userData)
            .then(response => {
                success(response);
                console.log(response);
            }).catch(exception => {
                console.log(exception?.response?.data);
                error(exception);
            })
    } catch (error) {
        console.error(error)
    }
    after();
}