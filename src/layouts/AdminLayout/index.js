import React, { useEffect } from 'react'
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { NavBar, SideBar } from '../../components/Admin/Header'
import Associations from '../../screens/Admin/Associations'
import AddAssociation from '../../screens/Admin/Associations/AddAssociation'
import EditAssociation from '../../screens/Admin/Associations/EditAssociation'
import AssociationDetail from '../../screens/Admin/Associations/AssociationDetail'
import "./styles.css"
import Projects from '../../screens/Admin/Projects'
import AddProject from '../../screens/Admin/Projects/AddProject'
import Partenaires from '../../screens/Admin/Partenaires'
import EditProject from '../../screens/Admin/Projects/EditProject'
import ProjectDetail from '../../screens/Admin/Projects/ProjectDetail'
import Users from '../../screens/Admin/Users'
import AddUser from '../../screens/Admin/Users/AddUser'
import EditUser from '../../screens/Admin/Users/EditUser'
import { defaultUserRoles, hasRole } from '../../services/Auth'
import { getToken, IsConnected } from '../../services/Auth';
import { isExpired } from 'react-jwt';
import { userLogout } from '../../services/API';
import SupervisorAssociationDetail from '../../screens/Admin/Associations/SupervisorAssociationDetail'
import AssociationAndProjectLayout from '../AssociationAndProjectLayout'
import Dashboard from '../../screens/Admin/Dashboard'

let route = require('../../utils/route.json')

function AdminLayout() {

    const location = useLocation ();
    const history = useHistory();

    useEffect(() => {
        console.log("On App Route Change")
      if( IsConnected() ) {
        const token = getToken()
        if(isExpired(token)) {
          userLogout();
            history.push(route.auth.login.link)
        }
      }
    }, [location])
    

    return (
        // <BrowserRouter>
            <section className="relative container-fluid px-0">
                <div className="d-flex flex-column">
                    <SideBar />
                    <div className="Admin__Content">
                        <NavBar />
                        <div className="Admin__Content__Wrapper">
                            <div className="px-4 py-4">
                                <Switch>
                                    <Route exact path="/admin/dashboard">
                                        <Dashboard />
                                    </Route>
                                    {/* <Route exact path={route.admin.communautes.link} component={Associations} />
                                    <Route exact path={`${route.admin.communautes.link}/add`} component={AddAssociation} />
                                    <Route exact path={`${route.admin.communautes.link}/edit/:communaute_id`} component={EditAssociation} /> */}


                                    <Route exact path={route.admin.users.link} component={Users} />
                                    <Route exact path={`${route.admin.users.link}/add`} component={AddUser} />
                                    <Route exact path={`${route.admin.users.link}/edit/:user_id`} component={EditUser} />

                                    
                                    {/* <Route exact path={route.admin.projets.link} component={Projects} />
                                    <Route exact path={`${route.admin.projets.link}/:project_id/edit`} component={EditProject} />
                                    <Route exact path={`${route.admin.projets.link}/:project_id`} component={ProjectDetail} />

                                    <Route exact path={`${route.admin.communautes.link}/:communaute_id/projet/add`} component={AddProject} />
                                    <Route exact path={`${route.admin.communautes.link}/:communaute_id/projet/:project_id`} component={ProjectDetail} />
                                    <Route exact path={`${route.admin.communautes.link}/:communaute_id/projet/:project_id/edit`} component={EditProject} /> */}

                                    <Route exact path={route.admin.partenaires.link} component={Partenaires} />
                                    
                                    <AssociationAndProjectLayout />

                                    {/* { ( hasRole(defaultUserRoles.SUPERVISOR_ROLE ) && IsConnected() ) ?
                                        <Route exact path={`${route.supervisor.link}`} component={SupervisorAssociationDetail} />
                                    : 
                                        <Route exact path={`${route.admin.communautes.link}/:communaute_id`} component={AssociationDetail} />
                                    } */}

                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        // </BrowserRouter>
    )
}

// const CRUDRouteLayout = ({ parentRoute })

export default AdminLayout
