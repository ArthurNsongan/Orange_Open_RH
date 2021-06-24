import React from 'react';
import PropTypes from "prop-types";
import {useForm} from "react-hook-form";

export const TextArea = React.forwardRef((props, ref) => {

    const {register} = useForm();
    const {
        wrapperClass,
        inputClass,
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
                <textarea name={name}
                          value={value}
                          ref={ref}
                          className={`${inputClass} ${error && "is-invalid"}`}
                          id="password"
                          onChange={onChange}
                          placeholder={placeholder}
                          {...rest}>
                </textarea>

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

TextArea.propTypess = {
    wrapperClass: PropTypes.string,
    inputClass: PropTypes.string,
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

TextArea.defaultProps = {
    wrapperClass: "form-group",
    inputClass: "form-control",
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