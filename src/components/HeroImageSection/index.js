import React, { useEffect, useState, useRef } from 'react';
import './styles.css';
import Images from "../../utils/images"


function HeroImageSection(props) {

    const {
        children,
    } = props

    // const [ animate, setAnimate] = useState(props.animate)

    // useEffect(()=>{ console.log(props.animate )}, [props.animate])
    

    // let styles = props.height != null ? { "height": `${props.height} !important`} : null
    
    return (
        <section className={`HeroSection ${props.className !== undefined ? props.className : ''} ${props.animate ? "" : "unanimated"} `}>
            <img className="HeroImage" alt="" src={Images.heroImg} />
            <div className="HeroContent">
                { children }
            </div>
        </section>        
    );
}

export function HeroImageHeader(props) {

    // let styles = props.height != null ? { "height": `${props.height} !important`} : null

    const imageStyle = props.image !== undefined ? { "objectFit": "contain"} : {}

    const [unAnimated, setUnAnimated] = useState(true);

    const heroImgHeader = useRef(null);

    useEffect(() => {
        // console.log("unAnimated : "  + unAnimated);
        if( unAnimated === true) {
            // const topPosition = heroImgHeader.current.getBoundingClientRect().top;
            // const clN = heroImgHeader.current.className;

            // const onScroll = () => {
            //     const scrollPosition = window.scrollY + window.innerHeight - 350;
            //     if( topPosition < scrollPosition ) {
            //         setUnAnimated(false)
            //     }
            // }
            // window.addEventListener("scroll", onScroll);
            // return() => window.removeEventListener("scroll", onScroll);
            setTimeout(() => setUnAnimated(false), 300)
        }
        // else {
        //     setPStyle(true);
        // }
    }, []);

    return(
        <section ref={heroImgHeader} className={`HeroImageHeader ${props.className !== undefined ? props.className : "" } ${ unAnimated ? "unanimated" : '' } `}>
            <img className="HeroImage" style={{...imageStyle, "height": `${props.height} !important`}} alt="" src={ props.image !== undefined ? props.image : Images.heroImg} />
            <div className="HeroContent" style={{"height": `${props.height} !important`}}>
                { props.children }
            </div>
        </section>        
    )
}

export default HeroImageSection;