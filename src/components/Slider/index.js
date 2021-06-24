import React from "react";
import PropTypes from 'prop-types';
// import Swipe core and required components
import SwiperCore, {A11y, Navigation, Pagination, Scrollbar, EffectCoverflow, Autoplay} from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";
// Import Swipe styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/a11y/a11y.scss';
import 'swiper/components/effect-coverflow/effect-coverflow.scss';
import './styles.css';
// install Swipe components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectCoverflow, Autoplay]);

export default function Slider(props) {

    const {
        style,
        onClick,
        autoplay,
        children,
        renderItem,
        slides,
        slidesPerView,
        effect,
        ...rest
    } = props;

    console.log(props.autoplay);

    return (
        <>
            <Swiper id="swiper" {...rest} effect={effect} slidesPerView={slidesPerView} autoplay={autoplay}>
                {
                    slides.map((slide, index) => (
                        <SwiperSlide key={`slide-${index}`}>
                            {renderItem(slide)}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    )
}

Slider.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onClick: PropTypes.func,
    slides: PropTypes.array,
    effect: PropTypes.oneOf(['slide', 'fade', 'cube', 'coverflow', 'flip']),
    renderItem: PropTypes.func,
    autoplay: PropTypes.object,
    slidesPerView: PropTypes.integer
};

Slider.defaultProps = {
    style: {},
    slidesPerView: 1,
    onClick: () => {
    },
    effect: "",
    slides: [],
    renderItem: () => {
    }
};
