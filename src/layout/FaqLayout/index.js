import React from 'react';
import {Route, Switch} from "react-router-dom";
import Faq from "../../screens/FAQ";

let route = require('../../utils/route');


export default function FaqLayout(props) {

    return (
        <>
            <Switch>
                <Route path={route.faq.faq_domain} component={Faq}/>
            </Switch>
        </>
    )
}