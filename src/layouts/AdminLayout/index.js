import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { NavBar, SideBar } from '../../components/Admin/Header'
import Associations from '../../screens/Admin/Associations'
import AddAssociation from '../../screens/Admin/Associations/AddAssociation'
import EditAssociation from '../../screens/Admin/Associations/EditAssociation'
import AssociationDetail from '../../screens/Admin/Associations/AssociationDetail'
import "./styles.css"

let route = require('../../utils/route.json')

function AdminLayout() {
    return (
        // <BrowserRouter>
            <section className="relative container-fluid px-0">
                <div className="d-flex flex-column">
                    <SideBar />
                    <div className="Admin__Content">
                        <div className="Admin__Content__Wrapper">
                            <NavBar />
                            <div className="px-4 py-4">
                                    <Switch>
                                        <Route exact path="/admin/dashboard">
                                            <h2>Dashboard</h2>
                                        </Route>
                                        <Route exact path={route.admin.communautes.link} component={Associations} />
                                        <Route exact path={`${route.admin.communautes.link}/add`} component={AddAssociation} />
                                        <Route exact path={`${route.admin.communautes.link}/:communaute_id`} component={AssociationDetail} />
                                        <Route exact path={`${route.admin.communautes.link}/edit/:communaute_id`} component={EditAssociation} />
                                            {/* <h2>{route.admin.communautes.title}</h2> </Route>*/}
                                        <Route exact path={route.admin.users.link}>
                                            <h2>{route.admin.users.title}</h2>
                                        </Route>
                                        <Route exact path="/admin">
                                            <Redirect to={route.admin.communautes.link} />
                                        </Route>
                                    </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        // </BrowserRouter>
    )
}

export default AdminLayout
