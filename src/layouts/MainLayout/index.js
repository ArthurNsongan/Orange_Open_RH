import React from 'react'

import Home from '../../screens/Home';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Associations from '../../screens/Associations';
import AssociationDetail from '../../screens/Associations/AssociationDetail';
import Projects from '../../screens/Projets';
import APropos from '../../screens/APropos';
import ProjectDetail from '../../screens/Projets/ProjectDetail';
import './styles.css'
import { BrowserRouter, Switch, Route, withRouter, useLocation } from 'react-router-dom';
import ScrollRestoration from 'react-scroll-restoration'
import { ScrollToTop } from 'react-router-scroll-to-top'
import { useEffect } from 'react';
import AuthUserRoute from '../../components/Routes';
import MemberProfile from '../../screens/Auth/MemberProfile';
let route = require('../../utils/route.json');

export const formatThousandsNumber = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function MainLayout(props) {

    console.log(route)

    const location = useLocation();

    useEffect(() => {
        const animatedDivs = window.document.querySelectorAll(".AnimatedDiv")
        console.log("div classes to animate : ", animatedDivs )
        console.log(location)
        animatedDivs.forEach((animDiv) => {
            // console.log(animDiv.getBoundingClientRect().top)
            const topPosition = animDiv.getBoundingClientRect().top;
            // const clN = animDiv.className;

            const onScroll = () => {
                const scrollPosition = window.scrollY + window.innerHeight - 350;
                if( topPosition < scrollPosition ) {
                    animDiv.classList.replace('AnimatedDiv', 'AnimateDiv');
                    console.log("Elements animated !")
                    window.removeEventListener("scroll", onScroll)
                }
            }

            window.addEventListener("scroll", onScroll);
            
        })
    }, [ location ]);

    return(
        <>
            <ScrollToTop />
            <Header />
            <Switch>
                <Route exact path={`${route.front.home.link}`} component={Home} />
                <Route exact path={`${route.front.projets.link}`} component={Projects} />
                <Route exact path={`${route.front.communautes.link}`} component={Associations} />
                <Route exact path={`${route.front.communautes.link}/:associationId-:associationName`} component={AssociationDetail} />
                <Route exact path={`${route.front.propos.link}`}  component={APropos} />
                <Route exact path={`${route.front.projets.link}/:projetId-:projetName`} component={ProjectDetail} />
                {/* <Route exact path="*">
                    <h1>Perdu !!!</h1>
                </Route> */}
                <AuthUserRoute exact path={`${route.auth.profile.link}`} component={MemberProfile}/>
            </Switch>
            <Footer />
        </>
    )
}

export default MainLayout;