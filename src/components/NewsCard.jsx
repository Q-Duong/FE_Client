import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'

const NewsCard = props => {
    const {item} = props

    return (
        item ?
        <Col lg={3} md={6} sm={6}>
            <div class="blog__item">
                <img class="blog__item__pic set-bg" src="https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Content-Card-Bing-AI-No-Text?wid=380&hei=213&fit=crop" alt={'tin tức'} />
                <div class="blog__item__text">
                    <h5>{item.title}</h5>
                    
                    <Link to={`/news/${item.id}`}>Xem tin</Link>
                </div>
            </div>
        </Col> 
        : <div>loading</div>
    )
}

NewsCard.propTypes = {
    item: PropTypes.object,
}

export default NewsCard
