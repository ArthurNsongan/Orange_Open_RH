import React from "react";
import PropTypes from 'prop-types';

export default function Button(props) {

    const {
        style,
        inversed,
        primary,
        secondary,
        success,
        danger,
        link,
        warning,
        info,
        icon,
        iconWithText,
        onClick,
        children,
        social,
        linkUrl,
        ...rest
    } = props;

    let className = "";
    if (inversed) className += ' btn-inverse';
    if (primary) className += ' btn-primary';
    if (secondary) className += ' btn-secondary';
    if (success) className += ' btn-success';
    if (danger) className += ' btn-danger';
    if (warning) className += ' btn-warning';
    if (info) className += ' btn-info';
    if (link) className += ' btn-link';
    if (icon) className += ' btn-icon';

    return (<>
            {
                (social !== '') ?
                    <a {...rest}
                       href={linkUrl}
                       className={`btn btn-social btn-${social}`}
                    >
                        <span className="sr-only">{social}</span>
                    </a>
                    :
                    <button
                        {...rest}
                        type="button"
                        className={`btn ${className}`}
                        onClick={onClick}
                    >
                        {icon !== '' ? <>
                            <span className="sr-only">{children}</span>
                            <span className={`icon ${icon}`} aria-hidden="true"/>
                        </> : iconWithText !== '' ? <>
                            <span className={`icon ${iconWithText}`} aria-hidden="true"/>
                            {children}
                        </> : children}
                    </button>
            }
        </>
    )
}

Button.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    icon: PropTypes.string,
    iconWithText: PropTypes.string,
    inversed: PropTypes.bool,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    success: PropTypes.bool,
    danger: PropTypes.bool,
    warning: PropTypes.bool,
    info: PropTypes.bool,
    link: PropTypes.bool,
    onClick: PropTypes.func
};

Button.defaultProps = {
    style: {},
    icon: "",
    iconWithText: "",
    inversed: false,
    primary: false,
    secondary: false,
    success: false,
    danger: false,
    warning: false,
    info: false,
    link: false,
    onClick: () => {
    }
};
