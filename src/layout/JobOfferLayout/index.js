import React from 'react';
import {Route, Switch} from "react-router-dom";
import NewJobOffer from "../../screens/JobOffer/AddNewJobOffer"
import JobOffer from "../../screens/JobOffer/index";

let route = require('../../utils/route');


export default function JobOfferLayout(props) {

    return (
        <>
            <Switch>
                <Route path={route.jobOffer.add_new} component={NewJobOffer}/>
                <Route path={route.jobOffer.job_domain} component={JobOffer}/>
            </Switch>
        </>
    )
}
