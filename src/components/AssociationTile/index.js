import React from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom';
import Button from '../Button';

import './styles.css'

function AssociationTile(props) {

    const {
        className
    } = props;

    const headingStyle = {
        "color": "#ff6501",
        "fontWeight": "600",
    }

    const { url } = useRouteMatch();

    console.log(url);

    return (
        <div className={`AssociationTile ${className}`}>
            <div className="d-flex flex-column bg-white shadow">
                <img id="AssociationImage" alt="Projet" src={ props.image !== undefined ? props.image : "https://s3-alpha-sig.figma.com/img/ed17/9382/af2e54144ebc3a0182b102332e547391?Expires=1627257600&Signature=aA69q74NsPBNNqh8MPmtBKzWigYxOKSq4Gc4sXBhPFpNChCBRxoSth9e9SFdATk3XM1jRH4uvCh0wnAmFl6m3JQHY62OJg97V6fXDeIvqUzvRR8USShqWzLwBs17jQKBDOiRDO8tXKOpuuaqSAAeAKVJk19bF~YXk9d26RN9T9LNSTJHwzgyZfn1NtIVZ0U4i8~o01Ni2pOypG3l0xAfMky5SQQ50pHTdXK-b-fuiq5881Y2mVdZwHe9gKgUlokG6xZ7s2cxaQMTzSlVvkdHEXJHzILApicZYCXvPq~pkW8RQSB-z2eq8c5O-grOPmWbHuvy4X2a0BiOwZ3MLrG3tA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"} />
                <div className="px-4 py-4">
                    <h3 className="pt-3" style={{...headingStyle}}>{props.name}</h3>
                    <h6 className="fw-bold">{props.members} membres</h6>
                    <p className="mt-3">{props.description}</p>
                    <NavLink to={`${url}/2-${props.name}`}><Button><span className="px-5">Voir</span></Button></NavLink>
                </div>
            </div>
        </div>
    )
}

export default AssociationTile
