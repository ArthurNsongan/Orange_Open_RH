import React from 'react';
import './style.css';
import PropTypes from "prop-types";

export default function TitleUnderlined(props) {
    const {
        children,
        customClass,
        ...rest
    } = props;

    return (
        <h2 {...rest}
            className={`${customClass} bd-content-title title-underlined`}
        >
            {children}
        </h2>
    );
};


TitleUnderlined.propTypes = {
    customClass: PropTypes.string
};

TitleUnderlined.defaultProps = {
    customClass: ""
};