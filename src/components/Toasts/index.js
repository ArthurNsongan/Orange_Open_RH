import React from "react";
import { toast as Toast } from "toast";

import "../styles.css";

export const toast = {
    success: (props) => 
        {
            Toast.success(
                <ToastSuccess message={ props.message } />
            )
        },

    error: (props) => 
        {
            Toast.success(
                <ToastError message={ props.message } />
            )
        },
    warning: (props) => 
        {
            Toast.success(
                <ToastWarning message={ props.message } />
            )
        },
}

const ToastSuccess = ({ message }) => (
    <>

    </>
)

const ToastError = ({ message }) => (
    <>

    </>
)

const ToastWarning = ({ message }) => (
    <>

    </>
)