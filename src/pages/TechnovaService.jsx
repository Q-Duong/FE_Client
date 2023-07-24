
import Helmet from '../components/Helmet'

import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useState } from 'react';
import { serviceAPI } from '../api/api';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'


function TechnovaService() {

  const {id} = useParams();

  const [technovaService, setTechnovaService] = useState(null);

  useEffect(
    () => {
      
      async function getTechnovaServiceById(){
        try {
          const res = await serviceAPI.getById(id);
          setTechnovaService(res.data);
        } catch (error) {
          alert(error);
        }
      }
      if(id)
        getTechnovaServiceById()
    },[id]
  )
  return (
    technovaService ?
    <Helmet title={technovaService.title}>
      <Container>
      <section class="shop-details">
          <div class="product__details__pic">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="product__details__breadcrumb">
                            <Link to="/">Trang chủ</Link>
                            <FontAwesomeIcon icon={faAngleRight} className="faAngleRight" />
                            <span>{technovaService.title}</span>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </section>
          <section class="blog-hero spad">
            <div class="container">
                <div class="row d-flex justify-content-center">
                    <div class="col-lg-9 text-center">
                        <div class="blog__hero__text">
                            <h2>{technovaService.title}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="blog-details spad">
          <div class="container">
              <div class="row d-flex justify-content-center">
                  {/* <div class="col-lg-12">
                      <div class="blog__details__pic">
                          
                      </div>
                  </div> */}
                  <div class="col-lg-8">
                      <div class="blog__details__content">
                          <div class="blog__details__share">
                          </div>
                          <div class="blog__details__text">
                              <p dangerouslySetInnerHTML={{ __html: technovaService.content }} ></p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
        </Container>
    </Helmet>
    : <div>loading</div>
)
}

export default TechnovaService;