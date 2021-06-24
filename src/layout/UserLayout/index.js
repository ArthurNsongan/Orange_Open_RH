import React from 'react';
import {Route, Switch} from "react-router-dom";
import Footer from "../../components/Footer";
import User from "../../screens/User";
import HeaderUser from "../../components/HeaderUser";
import AdminPost from "../../screens/Admin/Posts";
import NewPost from "../../screens/Admin/Posts/NewPost/NewPost";
import UserDemands from "../../screens/User/Demands";
import NewDemand from "../../screens/User/Demands/NewDemands";
import Test from '../../screens/User/test/test';

let route = require('../../utils/route');


export default function UserLayout(props) {

    return (
        <>
            <HeaderUser/>
            <main role="main" id="content" style={{minHeight: "100vh"}}>
                <div className="row">
                    {/*<Sidebar/>*/}
                    <div className="col-12" style={{paddingTop: '220px'}}>
                        <Switch>
                            <Route path={route.user_admin_url[1].link} component={User} exact={true} strict={true}/>
                            <Route path={route.user.user_demands} component={UserDemands} exact={true} strict={true}/>
                            <Route path={route.user.add_new_demand} component={NewDemand} exact={true} strict={true}/>
                            <Route path={route.user.test} component={Test} exact={true} strict={true}/>

                        </Switch>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}
