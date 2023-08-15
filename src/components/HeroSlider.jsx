import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {Carousel} from "react-bootstrap"
import Button from './Button'

const HeroSlider = props => {

    const data = props.data

    const timeOut = props.timeOut ? props.timeOut : 3000

    const [activeSlide, setActiveSlide] = useState(0);

    const nextSlide = useCallback(
        () => {
            const index = activeSlide + 1 === data.length ? 0 : activeSlide + 1
            setActiveSlide(index)
        },
        [activeSlide, data],
    )

    const prevSlide = () => {
        const index = activeSlide - 1 < 0 ? data.length - 1 : activeSlide - 1
        setActiveSlide(index)
    }

    useEffect(() => {
        if (props.auto) {
            const slideAuto = setInterval(() => {
                nextSlide()
            }, timeOut);
            return () => {
                clearInterval(slideAuto)
            }
        }
    }, [nextSlide, timeOut, props])

    return (
        <Carousel>
        {
          data.map(item => (
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-item"
              src={item.image?.path}
              alt={item.title}
            />
            <a to="https://technova.cloud" className="carousel_button btn">
              {item.title}
            </a>
          </Carousel.Item>
          ))
        }
      </Carousel>
    )
}

HeroSlider.propTypes = {
    data: PropTypes.array.isRequired,
    control: PropTypes.bool,
    auto: PropTypes.bool,
    timeOut: PropTypes.number
}

// const HeroSliderItem = props => (
   
//     <div className={`hero-slider__item ${props.active ? 'active' : ''}`}>
//         <div className="hero-slider__item__info">
//             <div className={`hero-slider__item__info__title color-${props.item.color}`}>
//                 <span>{props.item.title}</span>
//             </div>
//             <div className="hero-slider__item__info__description">
//                 <span>{props.item.description}</span>
//             </div>
//             <div className="hero-slider__item__info__btn">
//                 <Link to={props.item.path}>
//                     <Button
//                         backgroundColor={props.item.color}
//                         icon="bx bx-cart"
//                         animate={true}
//                     >
//                         xem chi tiết
//                     </Button>
//                 </Link>
//             </div>
//         </div>
//         <div className="hero-slider__item__image">
//             <div className={`shape bg-${props.item.color}`}></div>
//             <img src={props.item.img} alt="" />
//         </div>
//     </div>
// )

export default HeroSlider
