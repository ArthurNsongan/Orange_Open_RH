import React from 'react';

const LoadingSpinner = (props) => {
    return(
        <div className={`spinner-border ${props.className}`} style={props.style} role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    )
}

export default LoadingSpinner;
