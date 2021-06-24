import React from 'react';
import {Route, Switch} from "react-router-dom";
import NewBlog from "../../screens/Admin/Blog/NewBlog";
import PostDetail from "../../screens/Posts/PostDetail";
import Blog from "../../screens/Blog/index";

let route = require('../../utils/route');


export default function BlogLayout(props) {

    return (
        <>
            <Switch>
                <Route path={route.blog.blog_domain} component={Blog}/>
            </Switch>
        </>
    )
}
