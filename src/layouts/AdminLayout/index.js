import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { NavBar, SideBar } from '../../components/Admin/Header'
import Associations from '../../screens/Admin/Associations'
import "./styles.css"

let route = require('../../utils/route.json')

function AdminLayout() {
    return (
        <BrowserRouter basename="/admin">
            <section className="relative container-fluid px-0">
                <div className="d-flex flex-column">
                    <SideBar />
                    <div className="Admin__Content">
                        <div className="Admin__Content__Wrapper">
                            <NavBar />
                            <div className="px-4 py-4">
                                    <Switch>
                                        <Route exact path="/dashboard">
                                            <h2>Dashboard</h2>
                                        </Route>
                                        <Route exact path={route.admin.communautes.link} component={Associations} />
                                            {/* <h2>{route.admin.communautes.title}</h2> 
                                        </Route>*/}
                                        <Route exact path={route.admin.users.link}>
                                            <h2>{route.admin.users.title}</h2>
                                        </Route>
                                        <Route exact path="/">
                                            <Redirect to={route.admin.communautes.link} />
                                        </Route>
                                    </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </BrowserRouter>
    )
}

export default AdminLayout
