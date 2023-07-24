import React from 'react';

import { Container } from 'react-bootstrap';

import UpdatePasswordForm from '../components/UpdatePasswordForm';

import { useHistory } from 'react-router';
import { customerAPI } from '../api/api';
import { Link } from 'react-router-dom';
import useQuery from '../hooks/useQuery';

function UpdatePassword() {
    const history = useHistory();
    const email = useQuery().get("email");

    async function handleUpdatePasswordSubmit(formValues) {
        try {

            await customerAPI.updatePassword({...formValues, email})
            alert('Cập nhật mật khẩu thành công')
            history.push('/login')
        } catch (error) {
            alert(`Dữ liệu chưa chính xác, vui lòng thử lại`)
        }
    }

    return (
        <Container>
            <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h3>Cập nhật mật khẩu mới</h3>
                                <div className="breadcrumb__links">
                                    <Link to="/">Trang chủ</Link>
                                    <span>Cập nhật</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <UpdatePasswordForm onUpdatePasswordSubmit={handleUpdatePasswordSubmit} />
        </Container>
    );
}

export default UpdatePassword;