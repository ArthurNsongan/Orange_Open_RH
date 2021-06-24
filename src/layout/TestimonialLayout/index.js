import React from 'react';
import {Route, Switch} from "react-router-dom";
import Testimonial from "../../screens/Testimonial";

let route = require('../../utils/route');


export default function TestimonialLayout(props) {

    return (
        <>
            <Switch>
                <Route path={route.testimonial.testimonial_domain} component={Testimonial}/>
            </Switch>
        </>
    )
}