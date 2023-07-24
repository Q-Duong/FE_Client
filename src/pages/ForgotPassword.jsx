import React from 'react';
import { useHistory } from 'react-router';
import { customerAPI } from '../api/api';
import ForgotPasswordForm from '../components/ForgotPasswordForm';


function ForgotPassword() {
    const history = useHistory();

    async function handleForgotPasswordFormSubmit(email) {
        try {
            await customerAPI.forgotPassword(email)
            alert(`Vui lòng kiểm tra email để lấy mật khẩu hiện tại`)
            history.push(`/update-password?email=${email}`)
        } catch (error) {
            alert(`Có lỗi xảy ra, vui lòng thử lại`)
        }
    }
    return <ForgotPasswordForm onForgotPasswordFormSubmit={handleForgotPasswordFormSubmit} />

}

export default ForgotPassword;