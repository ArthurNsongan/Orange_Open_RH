import serverConfig from "./serverConfig"

const apiRoutes = {
    "AssociationsURL": `${serverConfig.apiAddress}/api/association`,
    "AssociationTypesURL": `${serverConfig.apiAddress}/api/association_type`,
    "DocumentURL" : `${serverConfig.apiAddress}/api/document`,
    "StorageURL":`${serverConfig.apiAddress}/storage`,
    "ProjectsURL": `${serverConfig.apiAddress}/api/project`,
    "ProjectAddPartenaireURL": `${serverConfig.apiAddress}/api/project/add/partner`,
    "AssociationProjectsURL": `${serverConfig.apiAddress}/api/project/association`,
    "PartenairesURL": `${serverConfig.apiAddress}/api/partner`,
    "CategoriesURL" : `${serverConfig.apiAddress}/api/category`,
}

export default apiRoutes;