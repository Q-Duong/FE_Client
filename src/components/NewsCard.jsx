import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { set } from '../redux/news-modal/NewsModalSlice'

import Button from './Button'

import numberWithCommas from '../utils/numberWithCommas'

const ProductCard = props => {
    const {item} = props
    const dispatch = useDispatch()

    return (
        item ?
        <div className="news-card">
            <Link to={`/news/${item._id}`}>
                <div className="news-card__image">
                    <img src={`${process.env.REACT_APP_IMAGEURL}${item.news.image}`} alt="" />
                    {/* <img src={`${process.env.REACT_APP_IMAGEURL}${item.news.productImage}`} alt="" /> */}
                </div>
                <h3 className="news-card__name">{item.news.name}</h3>
                <div className="news-card__content__left">
                    <p className="news-card__content__left__text">{numberWithCommas(item.soldPrice)}</p> 
                </div>
            </Link>
            <div className="news-card__content__right">
                <div className="news-card__btn">
                    <Button
                        
                        icon="bx bx-cart"
                        animate={true}
                        onClick={() => dispatch(set(item))}
                        className="add"
                    >
                        +
                    </Button>
                </div>
            </div>
        </div>
        : <div>loading</div>
    )
}

ProductCard.propTypes = {
    item: PropTypes.object,
}

export default ProductCard
