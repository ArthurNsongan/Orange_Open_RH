import React from 'react';
import {Route, Switch} from "react-router-dom";
import NewPost from "../../screens/Admin/Posts/NewPost/NewPost";
import PostDetail from "../../screens/Posts/PostDetail";
import Posts from "../../screens/Posts/index";

let route = require('../../utils/route');


export default function PostLayout(props) {

    console.log("PostLayout call");
    return (
        <>
            <Switch>
                <Route path={route.post.post_domain} component={Posts}/>
                <Route path={route.post.post_category} component={Posts}/>
            </Switch>
        </>
    )
}
