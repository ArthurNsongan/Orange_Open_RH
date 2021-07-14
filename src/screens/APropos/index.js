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
                        <div className="row justify-content-start">
                            <div className="col-lg-6">
                                <h1 className="text-center text-white fw-bold">A Propos de Nous</h1>
                            </div>
                        </div>
                    </div>
                </HeroImageHeader>
            </section>

            <section className="container my-5">
                <div className="row mb-5">
                    <h2 className="fw-bold pb-5">Qui sommes-nous ?</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div className="row my-5 py-5">
                    <h2 className="fw-bold pb-5">Notre Equipe</h2>
                    <Equipe />
                </div>
                <div className="row my-5 py-5">
                    <h2 className="fw-bold pb-5">Nos Partenaires</h2>
                    <Partenaires />
                </div>
                <div className="row mb-5">
                    <h2 className="fw-bold mb-5">Notre histoire</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
            </section>
        </>
    )
}

export default APropos
