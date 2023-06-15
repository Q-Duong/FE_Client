import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { set } from '../redux/product-modal/productModalSlice'

import Button from './Button'


const ProductCard = props => {
    const {item} = props
    const dispatch = useDispatch()

    return (
        item ?
        <div  icon="bx bx-cart"
        animate={true}
         className="product-card">
            <Link to={`/product/${item._id}`}>
                <div className="product-card__image">
                    <img src={`${item.image.path}`} alt={item.name} />
                </div>
                <h3 className="product-card__name">{item.name}</h3>
            </Link>
        </div>
        : <div>loading</div>
    )
}

ProductCard.propTypes = {
    item: PropTypes.object,
}

export default ProductCard
