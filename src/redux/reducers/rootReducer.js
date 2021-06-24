import {combineReducers} from "redux";
import SignInReducer from "./AuthReducer/SignInReducer";
import GetAllDomainesReducer from "./DomaineReducer/GetAllDomainesReducer";
import GetAllPostsReducer from "./PostsReducer/GetAllPostsReducer";
import GetAllPostsByDomainReducer from "./PostsReducer/GetAllPostsByDomainReducer";
import GetAllPostsByCategoryReducer from "./PostsReducer/GetAllPostsByCategoryReducer";
import GetAllCategoryReducer from "./CategoryReducer/GetAllCategoryReducer";
import AddNewPostReducer from "./PostsReducer/AddNewPostReducer";
import GetBlogReducer from "./BlogReducer/GetBlogReducer";
import GetPostByIdReducer from "./PostsReducer/GetPostByIdReducer";
import PostCommentReducer from "./CommentReducer/PostCommentReducer";
import UploadImageReducer from "./ImageReducer/UploadImageReducer";
import PostBlogReducer from "./BlogReducer/PostBlogReducer";
import PostFaqReducer from "./FaqReducer/PostFaqReducer";
import PostGlossaryReducer from "./GlossaryReducer/PostGlossaryReducer";
import PostTestimonialReducer from "./TestimonialReducer/PostTestimonialReducer";
import GetJobOfferReducer from "./JobOfferReducer/GetJobOfferReducer";
import PostJobOfferReducer from "./JobOfferReducer/PostJobOfferReducer";
import GetAdminPublicationToValidateReducer from "./ValidatePublicationReducer/GetAdminPublicationToValidateReducer";
import ValidatePublicationReducer from "./ValidatePublicationReducer/ValidatePublicationReducer";
import GetUserNotificationReducer from "./NotificationReducer/GetUserNotificationReducer";
import GetAllPostFeaturedReducer from "./PostsReducer/GetAllPostFeaturedReducer";
import ModifyPostReducer from "./PostsReducer/ModifyPostReducer";
import DeletePostReducer from "./PostsReducer/DeletePostReducer";
import GetDomaineByPostReducer from "./DomaineReducer/GetDomaineByPostReducer";
import CreateCategoryReducer from "./CategoryReducer/CreateCategoryReducer";
import ModifyCategoryReducer from "./CategoryReducer/ModifyCategoryReducer";
import CreateDomaineReducer from "./DomaineReducer/CreateDomaineReducer";
import ModifyDomaineReducer from "./DomaineReducer/ModifyDomaineReducer";
import GetAllBlogReducer from "./BlogReducer/GetAllBlogReducer";
import GetTestimonialReducer from "./TestimonialReducer/GetTestimonialReducer";
import GetAllFaqReducer from "./FaqReducer/GetAllFaqReducer";
import GetAllGlossaryReducer from "./GlossaryReducer/GetAllGlossaryReducer";

export const rootReducer = combineReducers({
    signInReducer: SignInReducer,

    getAllDomainesReducer: GetAllDomainesReducer,
    getAllPostsReducer: GetAllPostsReducer,
    getAllPostsByDomainReducer: GetAllPostsByDomainReducer,
    getAllPostsByCategoryReducer: GetAllPostsByCategoryReducer,

    getAllCategoryReducer: GetAllCategoryReducer,
    addNewPostReducer: AddNewPostReducer,

    getBlogReducer: GetBlogReducer,
    getAllBlogReducer: GetAllBlogReducer,

    getPostByIdReducer: GetPostByIdReducer,
    postCommentReducer: PostCommentReducer,
    uploadImageReducer: UploadImageReducer,
    postBlogReducer: PostBlogReducer,

    postFaqReducer: PostFaqReducer,
    getAllFaqReducer: GetAllFaqReducer,

    postTestimonialReducer: PostTestimonialReducer,
    getTestimonialReducer: GetTestimonialReducer,

    postGlossaryReducer: PostGlossaryReducer,
    getAllGlossaryReducer: GetAllGlossaryReducer,

    getJobOfferReducer: GetJobOfferReducer,
    postJobOfferReducer: PostJobOfferReducer,
    getAdminPublicationToValidateReducer: GetAdminPublicationToValidateReducer,
    validatePublicationReducer: ValidatePublicationReducer,
    getUserNotificationReducer: GetUserNotificationReducer,
    getAllPostFeaturedReducer: GetAllPostFeaturedReducer,
    modifyPostReducer: ModifyPostReducer,
    deletePostReducer: DeletePostReducer,
    getDomaineByPostReducer: GetDomaineByPostReducer,
    createCategoryReducer: CreateCategoryReducer,
    modifyCategoryReducer: ModifyCategoryReducer,

    createDomaineReducer: CreateDomaineReducer,
    modifyDomaineReducer: ModifyDomaineReducer
});
