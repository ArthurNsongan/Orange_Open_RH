// let serverUrl = "http://openrh.arenaplaza.site";
let serverUrl = "http://172.21.75.119";
//https://localhost:5003/Swagger/index.html

// let serverUrl = "https://localhost:5003";
export const Config = {
    server:`${serverUrl}/Images/`,
    imageFolder: `${serverUrl}/Images/`,
    getAllPostsUrl:`${serverUrl}/api/RhContent/GetAllRhContent`,
    loginUrl: `${serverUrl}/api/User/authentificate`,
    getPublicationUrl: `${serverUrl}/api/RhContent/GetPublicationDomaine`,
    getDomainesUrl: `${serverUrl}/api/RhContent/GetPublicationDomaines`,
    addPostUrl: `${serverUrl}/api/RhContent/PostPublish`,
    getBlogUrl: `${serverUrl}/api/RhContent/PostPublish`,
    getPostByIdUrl: `${serverUrl}/api/RhContent`,
    getAllPostFeatured: `${serverUrl}/api/RhContent`,
    postCommentUrl: `${serverUrl}/api/RhContent/PostComment`,
    postBlogUrl: `${serverUrl}/api/RhContent/PostBlog`,
    postFaqUrl: `${serverUrl}/api/RhContent/PostFAQ`,
    postTestimonialUrl: `${serverUrl}/api/RhContent/PostTemoignage`,
    postGlossaryUrl: `${serverUrl}/api/RhContent/PostGlossaire`,
    uploadImageUrl: `${serverUrl}/api/RhContent/PostImage`,
    postJobOfferUrl: `${serverUrl}/api/RhContent/PostPublishJob`,
    adminPendingValidationUrl: `${serverUrl}/api/Validation/GetAdminToValidation`,
    getAdminPublicationUrl: `${serverUrl}/api/RhContent/GetPublicationAll`,
    getPostFeaturedUrl: `${serverUrl}/api/RhContent/GetRhContentFeatured`,
    getRhContentPostBlogUrl: `${serverUrl}/api/RhContent/GetRhContentPostFrontEnd`,
    getRhContentAllPostAdminUrl: `${serverUrl}/api/RhContent/GetRhContentPostBackEnd`,
    getUserNotificationUrl: `${serverUrl}/api/Validation/GetUserNotification`,
    validatePostUrl: `${serverUrl}/api/Validation/PostValidation`,
    updateNotificationUrl: `${serverUrl}/api/Validation/UpdateNotification`,
    updatePostUrl: `${serverUrl}/api/RhContent/UpdateRhContent`,
    getCategoriesUrl: `${serverUrl}/api/RhContent/GetPublicationCategories`,
    postCategoryUrl: `${serverUrl}/api/RhContent/PostPublishCategorie`,
    updateCategoryUrl: `${serverUrl}/api/RhContent/UpdateCategorie`,
    deleteCategoryUrl: `${serverUrl}/api/RhContent/DeleteCategorie`,
    postDomaineUrl: `${serverUrl}/api/RhContent/PostPublishDomaine`,
};
