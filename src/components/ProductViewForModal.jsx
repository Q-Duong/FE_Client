import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import StarRatings from 'react-star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { addItem } from '../redux/shopping-cart/cartItemsSlide'
import { remove } from '../redux/product-modal/productModalSlice'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import Button from './Button'
import numberWithCommas from '../utils/numberWithCommas'

import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const ProductView = props => {

    const dispatch = useDispatch()

    let {product} = props

    const [previewImg, setPreviewImg] = useState('')

    const [descriptionExpand, setDescriptionExpand] = useState(false)

    const [quantity, setQuantity] = useState(1)

    //  const changeRating = ( newRating, name ) => {
    //     this.setState({
    //       rating: newRating
    //     });

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1)
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        }
    }

    useEffect(() => {
        setPreviewImg(product ? product.product.image: '' )
        setQuantity(1)
    }, [product])


    const addToCart = () => {
        const action = addItem({...product,quantity})
        dispatch(action)
        alert('Thêm thành công')
    }

    const goToCart = () => {
        const action = addItem({...product,quantity})
        dispatch(action)
        dispatch(remove())
        props.history.push('/cart')
    }

    return (
        product ? 
        <section class="shop-details">
            <div class="product__details__pic">
                <div class="">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="product__details__breadcrumbs">
                                
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6 col-md-6">
                        <img src={`${process.env.REACT_APP_IMAGEURL}${previewImg}`} alt="" />
                        </div>
                        <div class="col-lg-1 d-none d-lg-block"> </div>
                        <div class="col-lg-5 col-md-5">
                            <div class="product__details__text">
                                <h3>{product.product.name}</h3>
                                <div class="rating ">
                                    <div class="row d-flex ">
                                        
                                    </div>
                                </div>
                                <h5>{numberWithCommas(product.soldPrice )}</h5>
                                <span>Danh mục:</span>

                                <div className="product__info__item">
                                    <div className="product__info__item__quantity">
                                        <div className="product__info__item__title">
                                            Số lượng ({product.product.unit})
                                        </div>
                                        <div className="product__info__item__quantity">
                                            <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('minus')}>
                                                <i className="bx bx-minus"></i>
                                            </div>
                                            <div className="product__info__item__quantity__input">
                                                {quantity}
                                            </div>
                                            <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('plus')}>
                                                <i className="bx bx-plus"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    
                                <div class="product__info__item"> 
                                    <Button  onClick={() => {addToCart()}}>thêm vào giỏ</Button>
                                </div>
                                <div class="product__info__item">
                                    <Button  onClick={() => {addToCart()}}>Yêu thích</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        : 
        <div>loading</div>
    )
}

ProductView.propTypes = {
    product: PropTypes.object
}

export default withRouter(ProductView)
