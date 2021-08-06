import serverConfig from "./serverConfig"

const apiRoutes = {
    "AssociationsURL": `${serverConfig.apiAddress}/api/association`,
    "AssociationTypesURL": `${serverConfig.apiAddress}/api/association_type`,
    "DocumentURL" : `${serverConfig.apiAddress}/api/document`,
    "StorageURL":`${serverConfig.apiAddress}`,
    "ProjectsURL": `${serverConfig.apiAddress}/api/project`,
    "InProgressProjectsURL": `${serverConfig.apiAddress}/api/project/inProgress`,
    "ProjectAddPartenaireURL": `${serverConfig.apiAddress}/api/project/add/partner`,
    "ProjectChangeStatusURL": `${serverConfig.apiAddress}/api/project/changeStatus`,
    "AssociationProjectsURL": `${serverConfig.apiAddress}/api/project/association`,
    "PartenairesURL": `${serverConfig.apiAddress}/api/partner`,
    "CategoriesURL" : `${serverConfig.apiAddress}/api/category`,
    "LoginURL": `${serverConfig.apiAddress}/api/auth/login`,
    "LogoutURL": `${serverConfig.apiAddress}/api/auth/logout`,
    "RegisterURL": `${serverConfig.apiAddress}/api/auth/register`,
    "ConnectedUserURL" : `${serverConfig.apiAddress}/api/auth/me`,
    "VerifyTwoFactorCode" : `${serverConfig.apiAddress}/api/auth/verify`,
    "VerifyTokenURL" : `${serverConfig.apiAddress}/api/auth/verify`,
    "ResendTwoFactorCode" : `${serverConfig.apiAddress}/api/auth/verify/resend`,
}

export default apiRoutes;