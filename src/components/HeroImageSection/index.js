import React, { useEffect, useState } from 'react';
import './styles.css';


function HeroImageSection(props) {

    const {
        children,
    } = props

    // let styles = props.height != null ? { "height": `${props.height} !important`} : null
    
    return (
        <section className={`HeroSection ${props.className !== undefined ? props.className : ''}`}>
            <img className="HeroImage" alt="" src="https://s3-alpha-sig.figma.com/img/4270/3263/ed20c16a91332b00c6f6d0e30f7d1978?Expires=1626652800&Signature=fyxhb5pWROmP6P3YjLdYtkSPglyKWbBVvnhpDBNayEsG5ZXbw1~pFVIDymVnUxe1oseRrI87w8zM-geFbIItbA2OkXh9zNuYWV96OsuB7iOCoDbFy0rBpBQAavHvoB1ZrbBcj6N6WGPt2B-PM65TMkNsYf7WljziPdwjdrvUMFGQ~8unZrmb1lYDf3WcqGq0RllABhknOP9KZWZI7d6znovekP5axHTiDOsJwFPymC4EUA-xnBIBrHTQwh8WngPEEkIciCaYve25ntwRTtWD5tB6ez4Lgth33vzHyhuFx50d9ypa6lIaLhJrILJisXl5yJ4bnvTOoVrMje5hiS7QyQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
            <div className="HeroContent">
                { children }
            </div>
        </section>        
    );
}

export function HeroImageHeader(props) {

    // let styles = props.height != null ? { "height": `${props.height} !important`} : null

    return(
        <section className={`HeroImageHeader ${props.className !== undefined ? props.className : ""}`}>
            <img className="HeroImage" style={{"height": `${props.height} !important`}} alt="" src="https://s3-alpha-sig.figma.com/img/4270/3263/ed20c16a91332b00c6f6d0e30f7d1978?Expires=1626652800&Signature=fyxhb5pWROmP6P3YjLdYtkSPglyKWbBVvnhpDBNayEsG5ZXbw1~pFVIDymVnUxe1oseRrI87w8zM-geFbIItbA2OkXh9zNuYWV96OsuB7iOCoDbFy0rBpBQAavHvoB1ZrbBcj6N6WGPt2B-PM65TMkNsYf7WljziPdwjdrvUMFGQ~8unZrmb1lYDf3WcqGq0RllABhknOP9KZWZI7d6znovekP5axHTiDOsJwFPymC4EUA-xnBIBrHTQwh8WngPEEkIciCaYve25ntwRTtWD5tB6ez4Lgth33vzHyhuFx50d9ypa6lIaLhJrILJisXl5yJ4bnvTOoVrMje5hiS7QyQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
            <div className="HeroContent" style={{"height": `${props.height} !important`}}>
                { props.children }
            </div>
        </section>        
    )
}

export default HeroImageSection;