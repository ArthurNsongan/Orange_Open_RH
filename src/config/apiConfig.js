import serverConfig from "./serverConfig"

const apiRoutes = {
    "AssociationsURL": `${serverConfig.apiAddress}/api/association`,
    "AssociationTypesURL": `${serverConfig.apiAddress}/api/association_type`,
    "DocumentURL" : `${serverConfig.apiAddress}/api/document`,
    "StorageURL":`${serverConfig.apiAddress}/storage`,
}

export default apiRoutes;