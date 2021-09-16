import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { NavBar, SideBar } from '../../components/Admin/Header'
import Associations from '../../screens/Admin/Associations'
import AddAssociation from '../../screens/Admin/Associations/AddAssociation'
import EditAssociation from '../../screens/Admin/Associations/EditAssociation'
import AssociationDetail from '../../screens/Admin/Associations/AssociationDetail'
import Projects from '../../screens/Admin/Projects'
import AddProject from '../../screens/Admin/Projects/AddProject'
import Partenaires from '../../screens/Admin/Partenaires'
import EditProject from '../../screens/Admin/Projects/EditProject'
import ProjectDetail from '../../screens/Admin/Projects/ProjectDetail'
import Users from '../../screens/Admin/Users'
import AddUser from '../../screens/Admin/Users/AddUser'
import EditUser from '../../screens/Admin/Users/EditUser'
import { defaultUserRoles, hasRole, IsConnected } from '../../services/Auth'
import { getRoles } from '@testing-library/react'
import SupervisorAssociationDetail from '../../screens/Admin/Associations/SupervisorAssociationDetail'

let route = require('../../utils/route.json')

function AssociationAndProjectLayout() {
    return (
        // <BrowserRouter>
            <>
                    { ( hasRole(defaultUserRoles.ADMIN_ROLE ) && IsConnected() )  &&
                        <Switch>
                            <Route exact path={route.admin.communautes.link} component={Associations} />
                            <Route exact path={`${route.admin.communautes.link}/add`} component={AddAssociation} />
                            <Route exact path={`${route.admin.communautes.link}/edit/:communaute_id`} component={EditAssociation} />
                            <Route exact path={`${route.admin.communautes.link}/:communaute_id`} component={AssociationDetail} />

                            <Route exact path={route.admin.projets.link} component={Projects} />
                            <Route exact path={`${route.admin.projets.link}/:project_id/edit`} component={EditProject} />
                            <Route exact path={`${route.admin.projets.link}/:project_id`} component={ProjectDetail} />

                            <Route exact path={`${route.admin.communautes.link}/:communaute_id/projet/add`} component={AddProject} />
                            <Route exact path={`${route.admin.communautes.link}/:communaute_id/projet/:project_id/edit`} component={EditProject} />
                            <Route exact path={`${route.admin.communautes.link}/:communaute_id/projet/:project_id`} component={ProjectDetail} />

                            
                            <Route path="/admin*">
                                <Redirect to={route.admin.communautes.link} />
                            </Route>

                        </Switch>
                    }

                    { ( hasRole(defaultUserRoles.SUPERVISOR_ROLE) && !hasRole(defaultUserRoles.ADMIN_ROLE ) && IsConnected() )  &&  
                        <Switch>
                            <Route exact path={`${route.supervisor.link}`} component={SupervisorAssociationDetail} />
                            <Route exact path={`${route.supervisor.link}/edit/:communaute_id`} component={EditAssociation} />
                            <Route exact path={`${route.supervisor.link}/projet/:project_id/edit`} component={EditProject} />
                            <Route exact path={`${route.supervisor.link}/projet/add`} component={AddProject} />
                            <Route exact path={`${route.supervisor.link}/projet/:project_id`} component={ProjectDetail} />


                            <Route path="/admin*">
                                <Redirect to={`${route.supervisor.link}`} />
                            </Route>
                            
                        </Switch>
                    }
                    
            </>
        // </BrowserRouter>
    )
}

// const CRUDRouteLayout = ({ parentRoute })

export default AssociationAndProjectLayout
