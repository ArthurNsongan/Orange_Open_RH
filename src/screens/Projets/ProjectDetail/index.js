import React from 'react'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom';
import Button from '../../../components/Button';
import ProgressBar from '../../../components/ProgressBar';

let route = require('../../../utils/route.json')

function ProjectDetail(props) {

    const { projetId, projetName } = useParams();

    const projet = {
        "association": "L'ordre des médécins",
        "associationId": 2,
        "contributions": "4 000 000",
        "percent": "40",
        "contributionNeeded": "12 000 000",
        "contributors": "1250"
    }
    
    console.log(projetId + " - " + projetName)

    const headingStyle = {
        "color": "#ff6501",
        "fontWeight": "600",
    }

    const StatCard = (props) => (
        <div 
        className={props.className}>
            <div className="d-flex mx-0 mb-4 justify-content-center align-items-center flex-column" style = {{
                "width": "100%",
                "height": "208px",
                "boxShadow": "1px 1px 6px lightgray"
            }}>
                <div>
                    <h3 style={headingStyle}>{props.title}</h3>
                    <h2 className="fw-bold">{props.number}</h2>
                </div>
            </div>
        </div>
    )

    return (
        <>
          <section className="container relative" style={{ "marginTop": "100px"}}>
            <div className="row my-5">
                <div className="col-lg-6">
                    <img className="px-3" height="auto" width="100%" alt="" src="https://s3-alpha-sig.figma.com/img/4270/3263/ed20c16a91332b00c6f6d0e30f7d1978?Expires=1626652800&Signature=fyxhb5pWROmP6P3YjLdYtkSPglyKWbBVvnhpDBNayEsG5ZXbw1~pFVIDymVnUxe1oseRrI87w8zM-geFbIItbA2OkXh9zNuYWV96OsuB7iOCoDbFy0rBpBQAavHvoB1ZrbBcj6N6WGPt2B-PM65TMkNsYf7WljziPdwjdrvUMFGQ~8unZrmb1lYDf3WcqGq0RllABhknOP9KZWZI7d6znovekP5axHTiDOsJwFPymC4EUA-xnBIBrHTQwh8WngPEEkIciCaYve25ntwRTtWD5tB6ez4Lgth33vzHyhuFx50d9ypa6lIaLhJrILJisXl5yJ4bnvTOoVrMje5hiS7QyQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
                </div>
                <div className="col-lg-6 align-self-center">
                    <h2 style={{...headingStyle}}>{projetName}</h2>
                    <h5 className="my-3">Par <NavLink to={`${route.front.communautes.link}/${projet.associationId}-${projet.association}`} className="fw-bold text-decoration-none text-dark">{projet.association}</NavLink></h5>
                    <p className="fs-6 fw-bold">Créé le 17 Juin 2021</p>
                    <ProgressBar percent={projet.percent} />
                    <span style={headingStyle} className="fw-bold d-block">{`${projet.percent} %`}</span>
                    <div className="py-3">
                        <h2 className="fw-bold">{projet.contributions} F CFA acquis</h2>
                        <h5 className="fw-bold">sur {projet.contributionNeeded} F CFA</h5>
                    </div>
                    <Button buttonType="fullWidth">Je participe de 8 000 F CFA</Button>
                </div>
            </div>
          </section>

          <section className="container">
              <div className="row">
                  <StatCard className="col-lg-4" 
                        number={`${projet.contributions} F CFA`}
                        title="Entrées" />
                    <StatCard className="col-lg-4" 
                        number={projet.contributors}
                        title="Contributeurs" />
                    <StatCard className="col-lg-4" 
                        number={`${parseInt(projet.contributionNeeded.replaceAll(" ","")) - parseInt(projet.contributions.replaceAll(" ", ""))} F CFA`}
                        title="Montant manquant" />
              </div>
          </section>

          <section className="container my-5">
            <div className="row my-5 py-5">
                    <h2 className="fw-bold pb-5">Description du projet</h2>
                    <p className="lh-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
          </section>

          <section className="container my-5">
            <div className="d-flex flex-column my-5 py-5">
                    <h2 className="fw-bold pb-5">Partenaires du projet</h2>
                    <div className="row">
                        <div className="col">
                            <span className="h2 fw-bold">Cimencam</span>
                        </div>
                        <div className="col">
                            <span className="h2 fw-bold">Orca</span>
                        </div>
                        <div className="col">
                            <span className="h2 fw-bold">TAC</span>
                        </div>
                        <div className="col">
                            <span className="h2 fw-bold">FOKOU</span>
                        </div>
                    </div>
                </div>
          </section>
        </>
    )
}

export default ProjectDetail