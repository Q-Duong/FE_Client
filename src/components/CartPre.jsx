import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux'
import { updateItem, removeItem } from '../redux/shopping-cart/cartItemsSlide'

import numberWithCommas from '../utils/numberWithCommas'
import { Link } from 'react-router-dom'

const CartPre = props => {

    const dispatch = useDispatch()

    const {item} = props

    return (
        item ? 
        <Link to="">
            <div className="cartpre__item" >
                <div className="cartpre__item__image">
                    <img src={`${item.imagePath}`} alt={item.imagePath} />
                </div>
                <div className="cartpre__item__info">
                    <div className="cartpre__item__info__name">
                        {`${item.name}`}  
                    </div>
                    <div className="cartpre__item__info__quantity">      
                        Số lượng: {item.quantity}                
                    </div>
                    <div className="cartpre__item__info__quantity">      
                        Giá: {numberWithCommas(item.price)}                
                    </div>
                </div>
            </div>
        </Link>
        : <div>loding</div>
    )
}

CartPre.propTypes = {
    item: PropTypes.object
}

export default CartPre
