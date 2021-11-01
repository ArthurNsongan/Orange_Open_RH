import React from 'react'
import './styles.css'

export default function ProgressBar(props) {
    return (
        <div className={`ProgressBar ${props.className === undefined ? "" : props.className}`}>
            <div className="ProgressBar-100"></div>
            <div className="ProgressBar-Progress" style={{"width": `${Math.ceil(props.percent)}%`}}></div>
        </div>
        // <div className="progress">
        //     <div className={`progress-bar ${props.className === undefined ? "" : props.className}`} style={{width: `${Math.ceil(props.percent)}`}} role="progressbar" ariaValueNow={Math.ceil(props.percent)} ariaValueMin="0" ariaValueMax="100"></div>
        // </div>
    )
}
