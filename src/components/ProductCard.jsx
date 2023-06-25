import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

const ProductCard = props => {
    const {item} = props

    return (
        item ?
        <div  icon="bx bx-cart"
        animate={true}
         className="product-card">
            <Link to={`/product/${item.id}`}>
                <div className="product-card__image">
                    <img width={200} height={200} src={`${item.image.path}`} alt={item.name} />
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
