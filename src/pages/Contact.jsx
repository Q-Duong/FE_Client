import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { contactAPI } from "../api/api";
import Helmet from "../components/Helmet";

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
                       
     
    <div className="contact"> 
     
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Họ và tên</Form.Label>
          <Form.Control type="text" placeholder="Họ và tên..." value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Chủ đề</Form.Label>
          <Form.Control type="text" placeholder="Chủ đề..." value={subject} onChange={(e) => setSubject(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Ghi chú</Form.Label>
          <Form.Control as="textarea" rows={3} value={content} onChange={(e) => setContent(e.target.value)}/>
        </Form.Group>
      
       
        <div className="d-grid gap-2">
        <Button className="contact__button" size="lg"  type="submit">
          gửi
        </Button>
    </div>
      </Form>

    </div>
    </Helmet>
  );
}

export default Contactus;