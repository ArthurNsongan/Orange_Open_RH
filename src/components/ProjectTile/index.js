import React, {useEffect, useState, useRef} from 'react'
import { NavLink } from 'react-router-dom'
import Button from '../Button'
import ProgressBar from '../ProgressBar'
import './styles.css'
import Images from '../../utils/images'



let route = require('../../utils/route.json')

export default function ProjectTile(props) {

    const headingStyle = {
        "color": "#98c013",
        "fontWeight": "600",
    }

    const projectHeading = {
        ...headingStyle,
        "fontSize": "14px"
    }

    const [unAnimated, setUnAnimated] = useState(true);

    const projectRef = useRef(null);

    useEffect(() => {
        // console.log("unAnimated : "  + unAnimated);
        if( unAnimated === true) {
            const topPosition = projectRef.current.getBoundingClientRect().top;
            const clN = projectRef.current.className;

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
        <div className={"ProjectTile mb-5 " + props.className + ` ${ unAnimated ? "unanimated-project" : '' } ` } ref={projectRef}>
            <div className="d-flex flex-column bg-white shadows">
                <NavLink className="m-0 p-0 d-flex" to={`${route.front.projets.link}/1-${props.title}`}>
                    <img className="ProjectTile__Image" alt="Projet" src={props.image !== undefined ? props.image : Images.projectRealization } />
                </NavLink>
                <p className="fs-6 px-4 mt-2 mb-0">Par <NavLink to={`${route.front.communautes.link}/1-${props.owner}`} className="text-primary-2 fw-bold text-decoration-none">{props.owner}</NavLink></p>
                <div className="px-4 pb-3">
                    <NavLink className="mt-3 d-block text-center" to={`${route.front.projets.link}/1-${props.title}`}>
                        <h4 className="text-primary-2 fw-bold d-flex" style={{"height": "75px"}}>{props.title}</h4>
                    </NavLink>
                    <ProgressBar percent={props.percent} />
                    <span style={headingStyle} className="fw-bold h5 text-center px-3 d-block mb-1">{`${props.percent} %`}</span>
                    <span className="mb-1 d-block fw-bold text-center fs-6 text-dark"><span className="fs-5 text-primary-2">{props.contribution} collectés </span><br /> sur {props.contributionNeeded } FCFA</span>
                    {/* <h5 style={headingStyle} className="d-block mt-3 mb-3 fw-bold">{props.contributors} contributeurs</h5> */}
                    <NavLink className="mt-3 d-block text-center" to={`${route.front.projets.link}/1-${props.title}`}><Button><span className="fw-500">Voir le projet</span></Button></NavLink>
                </div>
            </div>
        </div>
    )
}
