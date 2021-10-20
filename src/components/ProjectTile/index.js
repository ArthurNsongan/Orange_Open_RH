import React, {useEffect, useState, useRef} from 'react'
import { NavLink } from 'react-router-dom'
import Button from '../Button'
import ProgressBar from '../ProgressBar'
import './styles.css'
import Images from '../../utils/images'
import { formatThousandsNumber, slugify } from '../../config/constants'
import apiRoutes from '../../config/apiConfig'



let route = require('../../utils/route.json')

export default function ProjectTile(props) {

    const headingStyle = {
        "color": "#ff7900",
        "fontWeight": "600",
    }

    const { project } = props 

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
                <NavLink className="m-0 p-0 d-flex" to={`${route.front.projets.link}/${project.id}-${slugify(project.title)}`}>
                    <img className="ProjectTile__Image" alt="Projet" src={props.image !== undefined ? `${apiRoutes.StorageURL}/${props.image }`: Images.projectRealization } />
                </NavLink>
                <p className="fs-6 px-4 mt-2 mb-0">Par <NavLink to={`${route.front.communautes.link}/${project.association_id}`} className="text-primary fw-bold text-decoration-none">{project.holder}</NavLink></p>
                <div className="px-4 pb-3">
                    <NavLink className="mt-3 d-block" to={`${route.front.projets.link}/${project.id}-${slugify(project.title)}`}>
                        <h4 className="text-dark fw-bold d-block" style={{"height": "75px"}}>{project.title}</h4>
                    </NavLink>
                    <ProgressBar percent={project.stat.pourcentage.replace("%","")} />
                    <span style={headingStyle} className="fw-bold h5 text-center px-3 d-block mb-1">{`${project.stat.pourcentage.replace("%","")}%`}</span>
                    <span className="mb-1 d-block fw-bold text-center fs-6 text-dark"><span className="fs-5 text-primary">{formatThousandsNumber(project.cost - project.stat.reste)} FCFA collectés </span><br /> sur { formatThousandsNumber(project.cost )} FCFA</span>
                    {/* <h5 style={headingStyle} className="d-block mt-3 mb-3 fw-bold">{props.contributors} contributeurs</h5> */} 
                    <NavLink className="mt-3 d-block text-center" to={`${route.front.projets.link}/${project.id}-${slugify(project.title)}`}><Button><span className="fw-500">Voir le projet</span></Button></NavLink>
                </div>
            </div>
        </div>
    )
}
