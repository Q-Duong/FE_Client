import React from 'react';

import { Container } from 'react-bootstrap';

import LoginForm from '../components/LoginForm';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { customerAPI } from '../api/api';
import { addToken } from '../redux/token/tokenSlice';

import { validatePhone } from '../utils/valiedateCustomerData'

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
            <h1>Đăng nhập</h1>
            <LoginForm onLoginSubmit={handleLoginSubmit} />
        </Container>
    );
}

export default Login;