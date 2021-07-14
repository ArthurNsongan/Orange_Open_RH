import React from 'react'
import './styles.css'

export default function ProgressBar(props) {
    return (
        <div className={`ProgressBar ${props.className === undefined ? "" : props.className}`}>
            <div className="ProgressBar-100"></div>
            <div className="ProgressBar-Progress" style={{"width": `${props.percent}%`}}></div>
        </div>
    )
}
