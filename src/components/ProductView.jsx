/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { addItem } from '../redux/shopping-cart/cartItemsSlide'
import { remove } from '../redux/product-modal/productModalSlice'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import Button from './Button'

import {   Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { productAPI } from '../api/api';

const ProductView = props => {
    const dispatch = useDispatch()
    const [isLeft, setIsLeft] = useState(true)
    const { product } = props
    const [productPackages, setProductPackages] = useState([]);
    const [productBenefits, setProductBenefits] = useState([]);
    const [quantity, setQuantity] = useState(1)

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1)
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        }
    }
  
    const addToCart = () => {
        const action = addItem({ ...product, quantity })
        dispatch(action)
        alert('Thêm thành công')
    }

    useEffect(
        () => {
          if(!product){
            return;
          }
          async function prepareData() {
            try {
              const resPackages = await productAPI.getPackages(product.id);
              const resBenefits = await productAPI.getBenefits(product.id);
                console.log(resPackages)
              const productPackages = resPackages.data;
              const benefits = resBenefits.data;
              
              const sortBenefits = benefits.map(benefit => {
                const values = benefit.benefitValues;
  
                const sortBenefitValues = [];
                for(const productPackage of productPackages){
                  const foundValue = values.find(v => v.productPackage.id === productPackage.id)
                  sortBenefitValues.push(foundValue);
                }    

                console.log(resPackages)
                benefit.benefitValues = sortBenefitValues;
                return benefit;
              })
              
              setProductPackages(productPackages)
              setProductBenefits(sortBenefits)
            } catch (error) {
              alert(error)
            }
          }
          prepareData()
        },[product])

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
                                    <span>{product.name}</span>
                                </div>
                                
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-7 col-md-7">
                                <img src={`${product.image.path}`} alt="" />
                            </div>
                            <div class="col-lg-1 d-none d-lg-block"> </div>
                            <div class="col-lg-4 col-md-5">
                                <div class="product__details__text">
                                    <h3>{product.name}</h3>
                                    <div className="product__info__item">
                                        <div className="product__info__item__quantity">
                                            <div>
                                                Thương hiệu: {product?.brand?.name}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product__info__item">
                                        <div className="product__info__item__quantity">
                                            <div >
                                                Loại sản phẩm: ({product?.category?.name})
                                            </div>
                                        </div>
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
                                    <li class="nav-item" onClick={() => {setIsLeft(true)}}>
                                        <a class="nav-link active" data-toggle="tab" href="#tabs-5" role="tab">Gói sản phẩm</a>
                                    </li>
                                    <li class="nav-item" onClick={() => {setIsLeft(false)}}>
                                        <a class="nav-link" data-toggle="tab" href="#tabs-6" role="tab">Mô tả</a>
                                    </li>
                                  
                                    </ul>

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
                                            isLeft ?
                                                <div class="tab-pane active" id="tabs-7" role="tabpanel">
                                                    <TableContainer sx={{ minWidth: 1000 }}>
                                                        <Table>
                                                            <TableHead>
                                                            <TableRow>
                                                            <TableCell></TableCell>
                                                                {
                                                                productPackages?.map(productPackage => (
                                                                    <TableCell>{productPackage.name}</TableCell>
                                                                ))
                                                                }
                                                                
                                                            </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                            {
                                                                productBenefits?.map(benefit => (
                                                                <TableRow >
                                                                    <TableCell align="left">{benefit.name}</TableCell>
                                                                    {
                                                                    benefit.benefitValues.map(benefitValue => (
                                                                        <TableCell align="left">
                                                                            <p>{benefitValue.value}</p>
                                                                        </TableCell>
                                                                    ))
                                                                    }
                                                                </TableRow>
                    
                                                                ))
                                                            }
                                                            <TableRow>
                                                                <TableCell></TableCell>
                                                                {
                                                                    productPackages.map(item => 
                                                                        <TableCell>
                                                                        <Button onClick={() => {
                                                                                dispatch(addItem({id: item.id, name: `${product.name} - ${item.name}`, quantity: 1, imagePath: product.image.path, price: item.price}))
                                                                        }}>Mua</Button>
                                                                    </TableCell>
                                                                    )
                                                                }
                                                            </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </div> :
                                                <div class="tab-pane active" id="tabs-6" role="tabpanel">
                                                    <div class="product__details__tab__content">
                                                        <p class="note">
                                                        <div dangerouslySetInnerHTML={{ __html: product.description }} />
                                                        </p>
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
