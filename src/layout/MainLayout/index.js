import React from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {Route, Switch} from "react-router-dom";
import Home from "../../screens/Home";
import PostLayout from "../PostLayout";
import Posts from "../../screens/Posts/index";
import Glossary from "../../screens/Glossary";
import Blog from "../../screens/Blog";
import Faq from "../../screens/FAQ";
import JobOffer from "../../screens/JobOffer";
import BlogLayout from "../BlogLayout";
import PrivateRoute from "../../components/PrivateRoute";
import PostDetail from "../../screens/Posts/PostDetail";
import GlossaryLayout from "../GlossaryLayout";
import FaqLayout from "../FaqLayout";
import TestimonialLayout from "../TestimonialLayout";
import BlogDetail from "../../screens/Blog/BlogDetail";
import Testimonial from "../../screens/Testimonial";
import JobOfferLayout from "../JobOfferLayout";
import JobOfferDetail from "../../screens/JobOffer/JobOfferDetail";
import HeaderAdmin from "../../components/HeaderAdmin";
import AdminLayout from "../AdminLayout";
import AdminRoute from "../../components/AdminRoute";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import NotFound from "../../screens/CommonScreen/NotFound";


let route = require('../../utils/route');

function MainLayout(props) {
    return (
        <>
            <Header/>
            <main role="main" id="content" style={{minHeight: "100vh"}}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path={route.home.root} component={Home}/>
                    <Route exact path={route.post.root} component={NotFound}/>
                    <Route exact path={route.blog.root} component={Blog}/>
                    <Route exact path={route.faq.root} component={Faq}/>
                    <Route exact path={route.testimonial.root} component={Testimonial}/>
                    <Route exact path={route.glossary.root} component={Glossary}/>
                    <Route exact path={route.jobOffer.root} component={JobOffer}/>
                    <Route exact path="/glossary/:page" component={GlossaryLayout}/>
                    <Route exact path="/faq/:page" component={FaqLayout}/>
                    <Route exact path="/testimonial/:page" component={TestimonialLayout}/>

                    <Route exact path="/blog/:page" component={BlogLayout}/>
                    <Route exact path="/blog/:domaine/:id" component={BlogDetail}/>

                    {/*<Route exact path="/posts/:page" component={PostLayout}/>*/}
                    <Route path={route.post.post_domain} exact component={Posts}/>
                    <Route path={route.post.post_category} exact component={Posts}/>
                    <Route exact path="/posts/:category/:domaine/:id" component={PostDetail}/>
                    <Route path="*" component={NotFound}/>

                    {/*                    <Route exact path="/job-offer/:page" component={JobOfferLayout}/>
                    <Route exact path="/job-offer/:domaine/:id" component={JobOfferDetail}/>*/}
                </Switch>
            </main>
            <Footer/>
        </>
    );
}

const mapstateToProps = state => ({
    result: state.signInReducer.result
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapstateToProps, mapDispatchToProps)(MainLayout);
