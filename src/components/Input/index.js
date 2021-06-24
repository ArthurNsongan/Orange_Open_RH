import React from 'react';
import PropTypes from "prop-types";
import {useForm} from "react-hook-form";

export const Input = React.forwardRef((props, ref) => {

    const {register} = useForm();
    const {
        wrapperClass,
        inputClass,
        type,
        name,
        value,
        id,
        onChange,
        placeholder,
        error,
        children,
        errorText,
        labelText,
        required,
        ...rest
    } = props;
    let className = `${error && "is-invalid"} ${required && "is-required"}`;

    return (
        <div className={wrapperClass}>
            <label htmlFor={id}
                   className={className}>{`${labelText} `}</label>
            {
                <input type={type}
                       name={name}
                       value={value}
                       ref={ref}
                       className={`${inputClass} ${error && "is-invalid"}`}
                       id={id}
                       onChange={onChange}
                       placeholder={placeholder}
                       {...rest}/>
            }
            {children}
            {
                error &&
                <div className="invalid-feedback">
                    {errorText}
                </div>
            }
        </div>
    )
});

Input.propTypess = {
    wrapperClass: PropTypes.string,
    inputClass: PropTypes.string,
    type: PropTypes.oneOf(['text', 'password', 'number', 'date']),
    name: PropTypes.string,
    value: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    error: PropTypes.bool,
    errorText: PropTypes.string,
    labelText: PropTypes.string,
    required: PropTypes.bool
};

Input.defaultProps = {
    wrapperClass: "form-group",
    inputClass: "form-control",
    type: "text",
    name: "",
    value: "",
    id: "",
    required: false,
    onChange: () => {
    },
    placeholder: "",
    error: "",
    errorText: "",
    labelText: ""
};
