import React from 'react';

import { Container } from 'react-bootstrap';

import LoginForm from '../components/LoginForm';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { customerAPI } from '../api/api';
import { addToken } from '../redux/token/tokenSlice';

import { validatePhone } from '../utils/valiedateCustomerData'
import { faAngleRight,faCartXmark } from '@fortawesome/free-solid-svg-icons';


import { Link } from 'react-router-dom';

function Login() {
    const history = useHistory()
    const dispatch = useDispatch()
    async function handleLoginSubmit(formValues) {
        try {
            if (!validatePhone(formValues.phone)) {
                alert('your phone is invalid')
                return
            }
            const res = await customerAPI.login(formValues)
            alert('đăng nhập thành công')
            dispatch(addToken(res.data.accessToken))
            history.push('/')
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <Container>
            <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h3>Đăng Nhập</h3>
                                <div className="breadcrumb__links">
                                    <Link to="/">Trang chủ</Link>
                                    <FontAwesomeIcon icon={faAngleRight} className="faAngleRight" />
                                    <span>Đăng nhập</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <LoginForm onLoginSubmit={handleLoginSubmit} />
        </Container>
    );
}

export default Login;