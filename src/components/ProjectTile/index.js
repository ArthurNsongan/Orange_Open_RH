import React from 'react'
import { NavLink } from 'react-router-dom'
import Button from '../Button'
import ProgressBar from '../ProgressBar'
let route = require('../../utils/route.json')

export default function ProjectTile(props) {

    const headingStyle = {
        "color": "#ff6501",
        "fontWeight": "600",
    }

    const projectHeading = {
        ...headingStyle,
        "fontSize": "14px"
    }

    return (
        <div className={"ProjectTile mb-5 " + props.className }>
            <div className="d-flex flex-column bg-white shadow">
                <img alt="Projet" src="https://s3-alpha-sig.figma.com/img/ed17/9382/af2e54144ebc3a0182b102332e547391?Expires=1627257600&Signature=aA69q74NsPBNNqh8MPmtBKzWigYxOKSq4Gc4sXBhPFpNChCBRxoSth9e9SFdATk3XM1jRH4uvCh0wnAmFl6m3JQHY62OJg97V6fXDeIvqUzvRR8USShqWzLwBs17jQKBDOiRDO8tXKOpuuaqSAAeAKVJk19bF~YXk9d26RN9T9LNSTJHwzgyZfn1NtIVZ0U4i8~o01Ni2pOypG3l0xAfMky5SQQ50pHTdXK-b-fuiq5881Y2mVdZwHe9gKgUlokG6xZ7s2cxaQMTzSlVvkdHEXJHzILApicZYCXvPq~pkW8RQSB-z2eq8c5O-grOPmWbHuvy4X2a0BiOwZ3MLrG3tA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
                <div className="px-4 py-3">
                    <h3 style={{...headingStyle, "height": "75px"}}>{props.title}</h3>
                    <p>Par <NavLink to={`${route.front.communautes.link}/1-${props.owner}`} className="fw-bold text-decoration-none text-dark">{props.owner}</NavLink></p>
                    <ProgressBar percent={props.percent} />
                    <span style={headingStyle} className="fw-bold d-block">{`${props.percent} %`}</span>
                    <span className="mt-3 d-block fw-bold fs-6"><span className="fs-5" style={headingStyle}>{props.contribution}</span> / {props.contributionNeeded } FCFA</span>
                    <h5 style={headingStyle} className="d-block mt-3 mb-3 fw-bold">{props.contributors} contributeurs</h5>
                    <NavLink to={`${route.front.projets.link}/1-${props.title}`}><Button>Voir le projet</Button></NavLink>
                </div>
            </div>
        </div>
    )
}
