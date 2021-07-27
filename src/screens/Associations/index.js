import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { HeroImageHeader } from '../../components/HeroImageSection'
import AssociationTile from '../../components/AssociationTile'
import apiRoutes from '../../config/apiConfig'

import axios from 'axios'
import server from '../../config/serverConfig'

import { Pagination } from 'antd'
import { Helmet } from 'react-helmet'



function Associations(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [associations, setAssociations] = useState([]);
    const taille = 5;

    const formatThousandsNumber = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    const [paginationOptions, setPaginationOptions] = useState({
        total: 0,
        perPage: 5,
        currentPage: 1
    })

    useEffect(() => {
        axios.get(`${apiRoutes.AssociationsURL}/paginate/${taille}`)
        .then( response => {
            setIsLoading(false)
            setPaginationOptions(
                {
                    total: response.data.meta.total,
                    perPage: response.data.meta.per_page,
                    currentPage: response.data.meta.current_page,
                }
            )
            setAssociations(response.data.data)
            console.log(response.data)
        })
        setIsLoading(false)
    }, [props])

    const onPaginationChange = (currentPage, perPage) => {
        setIsLoading(true)
        axios.get(`${apiRoutes.AssociationsURL}/paginate/${perPage}?page=${currentPage}`)
        .then( response => { 
            setPaginationOptions(
                {
                    total: response.data.meta.total,
                    perPage: response.data.meta.per_page,
                    currentPage: response.data.meta.current_page,
                }
            )
            setAssociations(response.data.data)
            setIsLoading(false)
            console.log(response.data)
        })
    }

    return (
        <>
            <Helmet title="Toutes les communautés - Challenge Solidarité" />
            <section className="relative pb-5">
                <HeroImageHeader height="250px">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <h1 className="text-center text-white fw-bold">Toutes les communautés qui nous font confiance</h1>
                            </div>
                        </div>
                    </div>
                </HeroImageHeader>
            </section>

            { isLoading ?
                <section className="py-5 container">
                    <div className="d-flex justify-content-center">
                        <div class="spinner-border mx-3 text-dark" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <h3 className="fw-bold text-center">Chargement...</h3>
                    </div>
                </section>
                :
                <section className="relative py-5 container">
                    <div className="row">
                        {
                            associations.map( ( assoc ) => (
                                <AssociationTile className="col-lg-4 col-xl-4 mb-4"
                                id={assoc.id}
                                type={assoc.associationType.name}
                                image={`${apiRoutes.StorageURL}/${assoc.logo}`}
                                name={assoc.name}
                                description={assoc.description}
                                members={formatThousandsNumber(assoc.memberNumber)}
                                data="" />
                            ))
                        }
                        {/* <AssociationTile className="col-lg-4 col-md-6 mb-4"
                            // image=""
                            name="L'ordre des avocats"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                            members={6000}
                            data="" />

                        <AssociationTile className="col-lg-4 col-md-6 mb-4"
                            // image=""
                            name="L'ordre des médécins"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                            members={4000}
                            data="" />

                        <AssociationTile className="col-lg-4 col-md-6 mb-4"
                            // image=""
                            name="L'ordre des avocats"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                            members={6000}
                            data="" />

                        <AssociationTile className="col-lg-4 col-md-6 mb-4"
                            // image=""
                            name="L'ordre des médécins"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                            members={4000}
                            data="" /> */}
                    </div>
                    <div className="row">
                        <Pagination 
                            className="d-flex fs-5 justify-content-center"
                            total={paginationOptions.total}
                            pageSize={paginationOptions.perPage}
                            current={paginationOptions.currentPage}
                            showSizeChanger
                            onChange={onPaginationChange}
                        />
                    </div>
                </section> 
            }
        </>
    )
}

// Associations.propTypes = {

// }

export default Associations

