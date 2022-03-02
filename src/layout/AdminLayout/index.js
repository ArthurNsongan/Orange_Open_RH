import React from 'react';
import {Route, Switch} from "react-router-dom";
import NewBlog from "../../screens/Admin/Blog/NewBlog";
import Admin from "../../screens/Admin";
import HeaderAdmin from "../../components/HeaderAdmin";
import Footer from "../../components/Footer";
import NewPost from "../../screens/Admin/Posts/NewPost/NewPost";
import EditPost from "../../screens/Admin/Posts/EditPost";
import PostCategory from "../../screens/Admin/Posts/PostCategory";
import PostThematique from "../../screens/Admin/Posts/PostThematique";
import BlogThematique from "../../screens/Admin/Blog/BlogThematique";
import EditBlog from "../../screens/Admin/Blog/EditBlog";
import Sidebar from "../../components/Sidebar";
import AdminPost from "../../screens/Admin/Posts";
import AdminBlog from "../../screens/Admin/Blog";
import AdminGlossary from "../../screens/Admin/Glossary";
import AdminFAQ from "../../screens/Admin/FAQ";
import AdminHomePage from '../../screens/Admin/Homepage';
import AdminTestimonial from "../../screens/Admin/Testimonial";

let route = require('../../utils/route');


export default function AdminLayout(props) {

    console.warn("Appel de AminLayout");
    return (
        <>
            <HeaderAdmin/>
            <main role="main" id="content" style={{minHeight: "100vh"}}>
                <div className="row">
                    {/*<Sidebar/>*/}
                    <div className="col-12" style={{paddingTop: '220px'}}>
                        <Switch>
                            <Route path={route.admin_url[1].link} component={Admin} exact={true} strict={true}/>
                            <Route path={route.post.admin_post} component={AdminPost} exact={true} strict={true}/>
                            <Route path={route.blog.admin_blog} component={AdminBlog} exact={true} strict={true}/>
                            <Route path={route.blog.admin_blog_thematique} component={BlogThematique} exact={true}
                                   strict={true}/>
                            <Route path={route.post.add_new} component={NewPost} exact={true} strict={true}/>
                            <Route path={route.post.edit_post_domain} component={EditPost} exact={true} strict={true}/>
                            <Route path={route.post.admin_post_category} component={PostCategory} exact={true}
                                   strict={true}/>
                            <Route path={route.post.admin_post_thematique} component={PostThematique} exact={true}
                                   strict={true}/>
                            <Route path={route.blog.edit_blog_domain} component={EditBlog} exact={true} strict={true}/>
                            <Route path={route.blog.add_new} component={NewBlog} exact={true} strict={true}/>
                            <Route path={route.glossary.admin_glossary} component={AdminGlossary} exact={true}
                                   strict={true}/>
                            <Route path={route.faq.admin_faq} component={AdminFAQ} exact={true}
                                   strict={true}/>
                            <Route path={route.testimonial.admin_testimonial} component={AdminTestimonial} exact={true}
                                   strict={true}/>
                            <Route path={route.homepage.admin_homepage} component={AdminHomePage} exact={true}
                                   strict={true}/>
                        </Switch>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}
