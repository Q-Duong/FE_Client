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

import ReactHtmlParser from 'react-html-parser';
import { commentAPI } from '../api/api';
import { useSelector } from 'react-redux';
import formatDate from '../utils/formatDate';

const ProductView = props => {
    const dispatch = useDispatch()

    let { product } = props

    const [previewImg, setPreviewImg] = useState('')

    const [comments, setComments] = useState([])

    const [quantity, setQuantity] = useState(1)

    const [isLeft, setIsLeft] = useState(false)

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
        setPreviewImg(product ? product.product.image : '')
        setQuantity(1)
    }, [product])

    useEffect(() => {
        async function getCommnets() {
            try {
                console.log(product)
                const res = await commentAPI.getAll(product.product._id)
                const comments = res.data
                setComments(comments)
            } catch (error) {
                alert(error.response.data.message)
            }
        }
        getCommnets()
    }, [product])

    const addToCart = () => {
        const action = addItem({ ...product, quantity })
        dispatch(action)
        alert('Thêm thành công')
    }

    const goToCart = () => {
        const action = addItem({ ...product, quantity })
        dispatch(action)
        dispatch(remove())
        props.history.push('/cart')
    }

    return (
        product ?
            <section class="shop-details">
                <div class="product__details__pic">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="product__details__breadcrumb">
                                    <Link to="/">Trang chủ</Link>
                                    <FontAwesomeIcon icon={faAngleRight} className="faAngleRight" />
                                    <span>{product.product.name}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-7 col-md-7">
                                <img src={`${process.env.REACT_APP_IMAGEURL}${previewImg}`} alt="" />
                            </div>
                            <div class="col-lg-1 d-none d-lg-block"> </div>
                            <div class="col-lg-4 col-md-5">
                                <div class="product__details__text">
                                    <h3>{product.product.name}</h3>
                                    <div class="rating ">
                                        <div class="row d-flex ">

                                        </div>
                                    </div>
                                    <h5>{numberWithCommas(product.soldPrice)}</h5>
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
                                        <Button onClick={() => { addToCart() }}>thêm vào giỏ</Button>
                                    </div>
                                    <div class="product__info__item">
                                        <Button onClick={() => { goToCart() }}>Thêm và xem giỏ hàng</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            
            <div class="product__details__content">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="product__details__tab">
                                <ul class="nav nav-tabs" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" data-toggle="tab" href="#tabs-5" role="tab">Bảng giá</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#tabs-6" role="tab">Đặc điểm nổi bật</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link active" data-toggle="tab" href="#tabs-7" role="tab">Đánh giá(5)</a>
                                    </li></ul>

{/* 
                <div class="product__details__content">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="product__details__tab">
                                    <ul class="nav nav-tabs" role="tablist">
                                        <li class="nav-item">
                                            <a class={isLeft ? 'nav-link active' : 'nav-link'} onClick={() => setIsLeft(true)} data-toggle="tab" href="#tabs-6" role="tab">Đặc điểm nổi bật</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class={isLeft ? 'nav-link' : 'nav-link active'} onClick={() => setIsLeft(false)} data-toggle="tab" href="#tabs-7" role="tab">Đánh giá({comments.length})</a>
                                        </li> */}

                                    
                                    <div class="tab-content">

                                        {
                                            !isLeft ?
                                                <div class="tab-pane active" id="tabs-7" role="tabpanel">
                                                    <div class="product__details__tab__content">
                                                        <h3>Mức độ hài lòng {comments.reduce((total, comment) => total += comment.star, 0)}/{5 * comments.length}</h3>
                                                        {
                                                            comments.map(comment => (
                                                                <div class="product__details__tab__content__item">
                                                                    <div class="blog__hero__text">
                                                                        <h2></h2>
                                                                        <ul>
                                                                            <li>{formatDate(comment.createdAt)}</li>
                                                                        </ul>
                                                                    </div>
                                                                    <StarRatings
                                                                        rating={comment.star}
                                                                        starRatedColor="#fa8c16"
                                                                        numberOfStars={5}
                                                                        name='rating'
                                                                        starDimension="25px"
                                                                        starSpacing="5px"
                                                                    />
                                                                    <p><strong>{comment.order.customerName}</strong>: {comment.content}</p>
                                                                </div>
                                                            ))
                                                        }

                                                    </div>
                                                </div> :
                                                <div class="tab-pane active" id="tabs-6" role="tabpanel">
                                                    <div class="product__details__tab__content">
                                                        <p class="note">
                                                            {ReactHtmlParser(product.product.description)}</p>
                                                    </div>
                                                </div>
                                        }
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
