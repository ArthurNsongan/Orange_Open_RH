import React from 'react'
import './styles.css'

export default function ProgressBar(props) {
    return (
        // <div className={`ProgressBar ${props.className === undefined ? "" : props.className}`}>
        //     <div className="ProgressBar-100"></div>
        //     <div className="ProgressBar-Progress" style={{"width": `${props.percent}%`}}></div>
        // </div>
        <div className="progress">
            <div className={`progress-bar ${props.className === undefined ? "" : props.className}`} role="progressbar" aria-valuenow={props.percent} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    )
}
