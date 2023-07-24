import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Col } from 'react-bootstrap';
import { useState } from 'react';
import Helmet from '../components/Helmet'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { customerAPI } from '../api/api';

UpdateUserFrom.propTypes = {
    onUpdateUserSubmit: PropTypes.func.isRequired,
};

function UpdateUserFrom(props) {
    const token = useSelector(state => state.token.value)

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [id, setId] = useState('')
    const { onUpdateUserSubmit } = props

    function handleRegisterSubmit(e) {
        e.preventDefault()

        onUpdateUserSubmit({id,email,name,phone,address})
    }

    useEffect(() => {
        async function getInfo(){
            try {
                const resGetUser = await customerAPI.getInfo(token);
                const {id, email, name, phone, address} = resGetUser.data;

                setId(id);
                setEmail(email);
                setName(name)
                setAddress(address)
                setPhone(phone)
            } catch (error) {   
                alert('Bạn cần đăng nhập khi vào đây.')
            }
        }
        if(token)
            getInfo()
    },[])

    return (

        <Helmet title="Đăng ký">
            <Col className="registerForm">
                <div className="registerForm__title">
                    <h1>Cập nhật thông tin</h1>
                </div>
                <Form  onSubmit={handleRegisterSubmit}>
                    <Form.Group className="mb-3" >
                        <Form.Control className="registerForm__input" type="text" placeholder="Tên khách hàng" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Control pattern="(84|0[3|5|7|8|9])+([0-9]{8})\b" className="registerForm__input" type="text" placeholder="Số điện thoại" minLength={10} name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" className="registerForm__input" type="email" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control className="registerForm__input" type="text" placeholder="Địa chỉ" name="address" value={address} onChange={(e) => setAddress(e.target.value)}/>
                    </Form.Group>
                   
                    <Button className="registerForm__button"  type="submit">
                        Cập nhật
                    </Button>
                </Form>
            </Col>
        </Helmet>
    );
}

export default UpdateUserFrom;