import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'

const Related = props => {
    const {item} = props

    return (
        item ?
        <Col lg={3} md={6} sm={6}>
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
        </Col>
        : <div>loading</div>
    )
}

Related.propTypes = {
    item: PropTypes.object,
}

export default Related
