import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { contactAPI } from "../api/api";
import Helmet from "../components/Helmet";
import Iframe from 'react-iframe'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
function Contactus() {
  const [subject, setSubject] = useState('')
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await contactAPI.create({subject,name,content})
      const message = res.data.message
      alert(message)
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <Helmet title="Liên hệ ">
      <div class="col-lg-12">
          <div class="contact__details">
              <Link to="/">Trang chủ</Link>
              <FontAwesomeIcon icon={faAngleRight} className="faAngleRight" />
              <span>Liên hệ</span>
          </div>
      </div>
      
      <div className="map">
      <Iframe url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1153718316677!2d106.72042691025047!3d10.80247488930347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528a76377ca31%3A0xa751a8fe4dcf595f!2sTECHNOVA%20CO.%2CLTD!5e0!3m2!1svi!2s!4v1686327684163!5m2!1svi!2s"
            width="100%"
            height="450px"
            id=""
            className=""
            display="block"
            position="relative"/>
      </div>
        <div className="spad">
          <div className="container">
              <div className="row">
                  <div className="col-lg-6 col-md-6">
                      <div className="contact__text">
                          <div className="section-title">
                              <span>Thông tin</span>
                              <h2>Liên hệ với chúng tôi</h2>
                              <p>Địa chỉ <span>289/1 Ung Văn Khiêm, Phường 25, Quận Binh Thạnh, TP.HCM</span> 
                                Điện thoại<span>Hồ Chí Minh: 0835128760</span> <span>Hà Nội: 0912611827</span>
                                Email <span>Hồ Chí Minh: kinhdoanh@technova.com.vn</span><span>Hà Nội: linhnguyen@technova.com.vn</span>
                              </p>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                      <div className="contact__form">
                        <Form onSubmit={handleSubmit}>
                          <Form.Group classNameName="mb-3" controlId="formBasicText">
                            <Form.Control type="text" placeholder="Họ và tên..." value={name} onChange={(e) => setName(e.target.value)} />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Control type="text" placeholder="Chủ đề..." value={subject} onChange={(e) => setSubject(e.target.value)}/>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" placeholder="Ghi chú..." rows={3} value={content} onChange={(e) => setContent(e.target.value)}/>
                          </Form.Group>
                          <div className="d-grid gap-2">
                            <Button className="contact__button" size="lg"  type="submit">
                              gửi
                            </Button>
                          </div>
                        </Form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </Helmet>
  );
}

export default Contactus;