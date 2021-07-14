import React from 'react'
import PropTypes from 'prop-types'
import { HeroImageHeader } from '../../components/HeroImageSection'
import AssociationTile from '../../components/AssociationTile'

function Associations(props) {
    return (
        <>
            <section className="relative pb-5">
                <HeroImageHeader height="250px">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <h1 className="text-center text-white fw-bold">Toutes les associations qui nous font confiance</h1>
                            </div>
                        </div>
                    </div>
                </HeroImageHeader>
            </section>

            <section className="relative py-5 container">
                <div className="row">
                    <AssociationTile className="col-lg-6"
                        // image=""
                        name="L'ordre des avocats"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                        members={6000}
                        data="" />

                    <AssociationTile className="col-lg-6"
                        // image=""
                        name="L'ordre des médécins"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                        members={4000}
                        data="" />
                    
                </div>
            </section>
        </>
    )
}

// Associations.propTypes = {

// }

export default Associations

