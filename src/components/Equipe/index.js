import React from 'react'

function Equipe() {
    return (
        <>
            <div className="row">
                <div className="col-lg-4 col-md-8 py-4 col-sm-12 AnimatedComponent" >
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <img alt="" className="mb-5 d-block" src="https://challengesolidarite.com/CS/img/team-leader-pic1.jpg" 
                            style={{ "height": "200px", "width": "200px"}} />
                        <div className="d-flex justify-content-center flex-column">
                            <h4 className="fw-bold text-center text-primary">Josiane BELLE</h4>
                            <h5 className="text-center">Chef de projet</h5>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-8 py-4 AnimatedComponent">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <img alt="" className="mb-5 d-block" src="https://challengesolidarite.com/CS/img/team-leader-pic2.jpg" 
                            style={{ "height": "200px", "width": "200px"}} />
                            <div className="d-flex justify-content-center flex-column">
                                <h4 className="fw-bold text-center text-primary">Prof Alain Aimé NDEDI</h4>
                                <h5></h5>
                            </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-8 py-4 AnimatedComponent">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <img alt="" className="mb-5 d-block" src="https://challengesolidarite.com/CS/img/team-leader-pic3.jpg" 
                            style={{ "height": "200px", "width": "200px"}} />
                            <div className="d-flex justify-content-center flex-column">
                                <h4 className="fw-bold text-center text-primary">Serge NGONO MBOLE</h4>
                                <h5></h5>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Equipe
