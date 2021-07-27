import React, { useState, useEffect, useRef} from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom';
import Button from '../Button';

import './styles.css'

function AssociationTile(props) {

    const {
        className
    } = props;

    const headingStyle = {
        "color": "#98c013",
        "fontWeight": "600",
    }

    const { url } = useRouteMatch();

    const formatThousandsNumber = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    console.log(url);

    const [unAnimated, setUnAnimated] = useState(true);

    const assocRef = useRef(null);

    useEffect(() => {
        // console.log("unAnimated : "  + unAnimated);
        if( unAnimated === true) {
            const topPosition = assocRef.current.getBoundingClientRect().top;
            // const clN = assocRef.current.className;

            const onScroll = () => {
                const scrollPosition = window.scrollY + window.innerHeight - 350;
                if( topPosition < scrollPosition ) {
                    setUnAnimated(false)
                }
            }
            window.addEventListener("scroll", onScroll);
            return() => window.removeEventListener("scroll", onScroll);
        }
        // else {
        //     setPStyle(true);
        // }
    }, []);

    return (
        <div className={`AssociationTile ${className} ${ unAnimated ? "unanimated" : '' } ` } ref={assocRef}>
            <div className="d-flex flex-column bg-white shadows">
                <NavLink to={`${url}/${props.id}-${props.name}`}>
                    <img className="AssociationImage" alt={props.name} src={ props.image !== undefined ? props.image : "https://s3-alpha-sig.figma.com/img/ed17/9382/af2e54144ebc3a0182b102332e547391?Expires=1627257600&Signature=aA69q74NsPBNNqh8MPmtBKzWigYxOKSq4Gc4sXBhPFpNChCBRxoSth9e9SFdATk3XM1jRH4uvCh0wnAmFl6m3JQHY62OJg97V6fXDeIvqUzvRR8USShqWzLwBs17jQKBDOiRDO8tXKOpuuaqSAAeAKVJk19bF~YXk9d26RN9T9LNSTJHwzgyZfn1NtIVZ0U4i8~o01Ni2pOypG3l0xAfMky5SQQ50pHTdXK-b-fuiq5881Y2mVdZwHe9gKgUlokG6xZ7s2cxaQMTzSlVvkdHEXJHzILApicZYCXvPq~pkW8RQSB-z2eq8c5O-grOPmWbHuvy4X2a0BiOwZ3MLrG3tA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"} />
                </NavLink>
                <div className="px-4 pb-4 pt-2">
                    <NavLink to={`${url}/${props.id}-${props.name}`}>
                        <h4 className="pt-3" style={{...headingStyle, "height": "80px"}}>{props.name}</h4>
                    </NavLink>
                    <span className="mb-2 bg-primary-2 h6 px-3 py-1 d-inline-block text-white">{props.type === undefined ? "Association" : props.type}</span>
                    <h6 className="fw-bold">{ formatThousandsNumber(props.members) } membres</h6>
                    {/* <p className="mt-3 text-capitalize">{props.description}</p> */}
                    <NavLink to={`${url}/${props.id}-${props.name}`} className=" mt-3"><Button><span className="px-3">Voir</span></Button></NavLink>
                </div>
            </div>
        </div>
    )
}

export default AssociationTile
