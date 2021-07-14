import React, { useEffect, useState } from 'react';
import './styles.css';


function Button(props) {

    const { buttonType } = props


    const FullButton = {
        "backgroundColor": "#ff6501",
        "padding": "8px 15px",
        "color": "white",
        "borderColor": "#ff6501",
        "borderStyle": "solid",
        "borderWidth": "#ff6501",
        "fontSize": "16px"
    }

    const FlatButton = {
        "color": "#ff6501",
        "padding": "8px 15px",
        "border-color": "#ff6501"
    }

    const fullWidth = {
        ...FullButton,
        "width": "100%",
    }

    return (
        <>
            { buttonType === "fullWidth" ? 
                <button className="" style={fullWidth}>{props.children}</button> :
                <button className="" style={FullButton}>{props.children}</button>
            }
        </>
    );
}

export default Button;