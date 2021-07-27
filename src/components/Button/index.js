import React, { useEffect, useState } from 'react';
import './styles.css';


function Button(props) {

    const { buttonType, className, ...rest } = props

    return (
        <>
            { buttonType === "fullWidth" ? 
                <button className={"FullWidth " + className } {...rest}>{props.children}</button> :
                <button className={"FullButton " + className } {...rest}>{props.children}</button>
            }
        </>
    );
}

export default Button;