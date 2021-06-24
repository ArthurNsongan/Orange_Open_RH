import React from 'react';
import {Route, Switch} from "react-router-dom";
import Glossary from "../../screens/Glossary";

let route = require('../../utils/route');


export default function GlossaryLayout(props) {

    return (
        <>
            <Switch>
                <Route path={route.glossary.glossary_domain} component={Glossary}/>
            </Switch>
        </>
    )
}