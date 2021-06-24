import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/fr';
import './style.css';
import * as Utils from '../../utils';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuoteLeft} from "@fortawesome/free-solid-svg-icons";
import {faQuoteRight} from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import Slider from "../Slider";
import {Images} from "../../config/Images";

const TestimonialItem = (props) => (
    <div className="swiper-slide testimonialItem" style={{width: "300px"}} key={props.testimonial.rhContentId}
         data-testimonial={JSON.stringify(props.testimonial)}>
        <div className="card rounded-lg shadow-lg"
             data-target="#testimonialDetail">
            <div className="d-flex justify-content-between">
                <div className="px-1 py-1">
                    <FontAwesomeIcon icon={faQuoteLeft} color='var(--orange)' className="mr-1"/>
                </div>
                <div className="content py-4 px-1 text-center">
                    <p>{Utils.cutString(props.testimonial.rhContentDescription, 150)}</p>
                </div>
                <div className="px-1 py-1" style={{marginTop: 'auto'}}>
                    <FontAwesomeIcon icon={faQuoteRight} color='var(--orange)' className="mr-1"/>
                </div>
            </div>
            <div className="about text-center p-4 text-white">
                <img alt="Image placeholder"
                     loading="lazy"
                     className="rounded-circle img-post"
                     src={Images.defaultImage}
                     width="60"/>
                <h4 className="mb-0 mt-3" style={{color: 'var(--orange)'}}>{props.testimonial.user.userName}</h4>
                <span>{props.testimonial.user.userFunction}</span>
            </div>
        </div>
    </div>
);

export default function TestimonialList(props) {
    moment.locale("fr");
    const {
        testimonials,
        ...rest
    } = props;

    const [cardModal, setCardModal] = useState(null);

    const slideParams = {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    };

    useEffect(() => {
        $('.testimonialItem').on('click', event => {
            let testimonial = $(event.target).parents("div.testimonialItem").data('testimonial');
            $('.intro').html(testimonial.rhContentDescription);
            $('.testimonial-date').html(moment(testimonial.rhContentDateCeated).format('lll'));
            $('.author').html(testimonial.user.userName + " / " + testimonial.user.userFunction);
            $('#btnModal').trigger('click');
        });
        window.$(".img-post").initImageNotLoadPlaceHolder();
    });


    const {i18n, t} = useTranslation();

    const renderModalTestimonialDetail = () => (
        <div className="modal modal-detail fade" id="testimonialDetail" data-keyboard="false" tabIndex="-1"
             aria-labelledby="addFaqModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="card border-0 ">
                        <div className="card-header"></div>
                        <div className="card-body text-center ">
                            <img className="img-1 img-fluid img-post"
                                 loading="lazy"
                                 src={Images.defaultImage}
                            />
                            <div className="quotes">
                                <FontAwesomeIcon size="3x" icon={faQuoteLeft} color="var(--orange)"
                                                 className="quotes-img"/>
                                <p className="card-text bold text-center px-md-3 intro">I believe that one defines
                                    oneself by reinvention. To not be like your parents. To not be like your friends. To
                                    be yourself. To cut yourself out of stone. </p>
                                <h6 className="font-weight-bold mt-4 author">Nicholas V./ Company Inc</h6>
                                <blockquote className="blockquote">
                                    <footer className="blockquote-footer testimonial-date">18 janv. 2021 16:49</footer>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {renderModalTestimonialDetail()}
            <div className="container mt-5">
                <div className="row d-flex justify-content-center align-item-center testimonials">
                    <button type="button" className="btn btn-primary" data-toggle="modal" id="btnModal"
                            style={{display: "none"}} data-target="#testimonialDetail"/>
                    {
                        testimonials.length === 0 ?
                            <div className="alert alert-info" role="alert">
                                <span className="alert-icon"><span className="sr-only">Info</span></span>
                                <p>{t('testimonial.no_testimonial')}</p>
                            </div> :
                            <div className="swiper-wrapper">
                                <Slider spaceBetween={50}
                                        slidesPerView={3}
                                        slides={testimonials}
                                        effect={'coverflow'}
                                        grabCursor={true}
                                        autoplay={true}
                                        centeredSlides={true}
                                        renderItem={(testimonial) => (
                                            <TestimonialItem testimonial={testimonial}/>
                                        )}
                                />
                            </div>
                    }

                </div>
            </div>
        </>
    );
};

TestimonialList.propTypes = {
    testimonials: PropTypes.array
};

TestimonialList.defaultProps = {
    testimonials: []
};
