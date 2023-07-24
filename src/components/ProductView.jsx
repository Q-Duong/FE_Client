/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { addItem } from '../redux/shopping-cart/cartItemsSlide'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import Button from './Button'

import {   Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { productAPI } from '../api/api';
import numberWithCommas from '../utils/numberWithCommas';
import months from '../enum/months'

const ProductView = props => {
    const dispatch = useDispatch()
    const [isLeft, setIsLeft] = useState(true)
    const { product } = props
    const [productPackages, setProductPackages] = useState([]);
    const [productBenefits, setProductBenefits] = useState([]);

    useEffect(
        () => {
          if(!product){
            return;
          }
          async function prepareData() {
            try {
              const resPackages = await productAPI.getPackages(product.id);
              const resBenefits = await productAPI.getBenefits(product.id);
              const productPackages = resPackages.data;
              const benefits = resBenefits.data;
              
              const sortBenefits = benefits.map(benefit => {
                const values = benefit.benefitValues;
  
                const sortBenefitValues = [];
                for(const productPackage of productPackages){
                  const foundValue = values.find(v => v.productPackage.id === productPackage.id)
                  sortBenefitValues.push(foundValue);
                }    

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
                                
                                    <img className="img__details" src={`${product.image.path}`} alt="" />
                                
                            </div>
                            <div class="col-lg-1 d-none d-lg-block"> </div>
                            <div class="col-lg-4 col-md-5 product__details__">
                                <div class="product__details__text">
                                    <h2>{product.name}</h2>
                                    <div>
                                        <span>Thương hiệu:  {product?.brand?.name}</span>
                                    </div>
                                    <div>
                                        <span>Loại sản phẩm: ({product?.category?.name})</span>
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
                                        <a className={isLeft ? "nav-link active": "nav-link"}  href="#tabs-5" role="tab">Gói sản phẩm</a>
                                    </li>
                                    <li class="nav-item" onClick={() => {setIsLeft(false)}}>
                                        <a className={!isLeft ? "nav-link active": "nav-link"}  href="#tabs-6" role="tab">Mô tả</a>
                                    </li>
                                </ul>
                                    <div class="tab-content">
                                        {
                                            isLeft ?
                                                <div class="tab-pane active" id="tabs-5" role="tabpanel">
                                                    <TableContainer style={{maxWidth: '100%', width: '100%', overflowX: 'auto'}}>
                                                        <Table>
                                                            <TableHead className="head_package">
                                                            <TableRow>
                                                            <TableCell></TableCell>
                                                                {
                                                                    productPackages?.map(productPackage => (
                                                                        <TableCell className="package_title">
                                                                            {
                                                                            productPackage.name
                                                                            }                                                                          
                                                                            
                                                                        </TableCell>
                                                                    ))
                                                                }
                                                                
                                                            </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                            {
                                                                 <TableRow >
                                                                 <TableCell className="benefit_title" align="center">Số người sở hữu</TableCell>
                                                                 {
                                                                    productPackages?.map(productPackage => (
                                                                        <TableCell className="package_title">
                                                                            {
                                                                            productPackage.userNumber
                                                                            }                                                                          
                                                                            
                                                                        </TableCell>
                                                                    ))
                                                                 }
                                                             </TableRow>
                                                            }
                                                            {
                                                                 <TableRow >
                                                                 <TableCell className="benefit_title" align="center">Thời hạn sử dụng</TableCell>
                                                                 {
                                                                    productPackages?.map(productPackage => (
                                                                        <TableCell className="package_title">
                                                                            {
                                                                            `${productPackage.timeRangeNumber} ${months[productPackage.timeRange]}` 
                                                                            }                                                                          
                                                                            
                                                                        </TableCell>
                                                                    ))
                                                                 }
                                                             </TableRow>
                                                            }
                                                            {
                                                                productBenefits?.map(benefit => (
                                                                <TableRow >
                                                                    <TableCell className="benefit_title" align="center">{benefit.name}</TableCell>
                                                                    {
                                                                    benefit.benefitValues.map(benefitValue => (
                                                                        <TableCell  align="center">
                                                                            <p>{benefitValue? benefitValue.value: ''}</p>
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
                                                                        product.isContactToSell ?
                                                                        <TableCell align="center">
                                                                                <Link to="/contact">
                                                                                    <Button className="carousel_button btn">
                                                                                        Liên hệ
                                                                                    </Button>
                                                                                </Link>
                                                                        </TableCell>:
                                                                        <TableCell align="center">
                                                                            <Button className="carousel_button btn" onClick={() => {
                                                                                    dispatch(addItem({id: item.id, name: `${product.name} - ${item.name}`, quantity: 1, imagePath: product.image.path, price: item.price}))
                                                                            }}>  <strong>{
                                                                                numberWithCommas(item.price)
                                                                            }</strong></Button>
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
                                                        <p class="note"></p>
                                                        <div class="product__details__tab__content__item">
                                                            <p dangerouslySetInnerHTML={{ __html: product.description }}></p>
                                                        </div>
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
