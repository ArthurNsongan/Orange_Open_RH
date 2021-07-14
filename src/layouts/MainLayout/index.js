import React from 'react'
import { Switch, Route } from 'react-router'
import Home from '../../screens/Home';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Associations from '../../screens/Associations';
import AssociationDetail from '../../screens/Associations/AssociationDetail';
import Projects from '../../screens/Projets';
import APropos from '../../screens/APropos';
import ProjectDetail from '../../screens/Projets/ProjectDetail';
let route = require('../../utils/route');

function MainLayout(props) {

    return(
        <>
            <Header />
            <Switch>
                <Route exact path={`${route.front.home.link}`} component={Home} />
                <Route exact path={`${route.front.projets.link}`} component={Projects} />
                <Route exact path={`${route.front.communautes.link}`} component={Associations} />
                <Route exact path={`${route.front.communautes.link}/:associationId-:associationName`} component={AssociationDetail} />
                <Route exact path={`${route.front.propos.link}`}  component={APropos} />
                <Route exact path={`${route.front.projets.link}/:projetId-:projetName`} component={ProjectDetail} />
                <Route exact path="*">
                    <h1>Perdu !!!</h1>
                </Route>
            </Switch>
            <Footer />
        </>
    )
}

export default MainLayout;