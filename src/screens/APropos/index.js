import React from 'react'
import Equipe from '../../components/Equipe'
import { HeroImageHeader } from '../../components/HeroImageSection'
import Partenaires from '../../components/Partenaires'

function APropos(props) {
    return (
        <>
            <section className="relative">
                <HeroImageHeader height="250px">
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <h1 className="text-center text-white fw-bold">A Propos de Nous</h1>
                            </div>
                        </div>
                    </div>
                </HeroImageHeader>
            </section>

            <section className="container my-5 AnimatedDiv">
                <div className="row mb-5 justify-content-center">
                    <h2 className="fw-bold mb-5 text-center headingFunPrim contentCenter">Qui sommes-nous ?</h2>
                    <p className="fs-6 mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div className="row my-5 py-5 justify-content-center text-center">
                    <h2 className="fw-bold mb-5 text-center headingFunPrim contentCenter">Notre équipe</h2>
                    <Equipe />
                </div>
                <div className="row my-5 py-5 justify-content-center">
                    <h2 className="fw-bold mb-5 text-center headingFunPrim contentCenter">Nos partenaires</h2>
                    <Partenaires />
                </div>
                <div className="row mb-5 justify-content-center">
                    <h2 className="fw-bold mb-5 text-center headingFunPrim contentCenter">Notre histoire</h2>
                    <p className="fs-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
            </section>
        </>
    )
}

export default APropos
