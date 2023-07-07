import React from 'react'
import PropTypes from 'prop-types'

import Helmet from '../components/Helmet'
import {formatDateString} from '../utils/formatDate'

const NewsCardDetail = props => {
    const {item} = props

    return (
        item ?
        <Helmet title={item.title}>
      <section class="blog-hero spad" style={{backgroundImage: item.image?.path}}>
          <div class="container" >
              <div class="row d-flex justify-content-center">
                  <div class="col-lg-9 text-center">
                      <div class="blog__hero__text">
                          <h2>{item.title}</h2>
                          <ul>
                              <li>Đăng ngày: {formatDateString(item.createdAt)}</li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <section class="blog-details spad">
          <div class="container">
              <div class="row d-flex justify-content-center">
                  <div class="col-lg-12">
                      <div class="blog__details__pic">
                          <img src={item.image?.path} alt="" />
                      </div>
                  </div>
                  <div class="col-lg-8">
                      <div class="blog__details__content">
                          <div class="blog__details__share">
                          </div>
                          <div class="blog__details__text">
                              <p dangerouslySetInnerHTML={{ __html: item.content }} ></p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

    </Helmet>
        : <div>loading</div>
    )
}

NewsCardDetail.propTypes = {
    item: PropTypes.object,
}

export default NewsCardDetail
