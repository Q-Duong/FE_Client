import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import ProductView from './ProductViewForModal'

import Button from './Button'

import { remove } from '../redux/product-modal/productModalSlice'


const ProductViewModal = () => {

    const product = useSelector((state) => state.productModal.value)
    const dispatch = useDispatch()

    return (
        <div className={`product-view__modal ${product ? 'active' : ''}`}>
            <div className="product-view__modal__content">
                <ProductView product={product}/>
                <div className="product-view__modal__content__close">
                    <Button
                        size="sm"    
                        onClick={() => dispatch(remove())}
                    >
                        đóng
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductViewModal
