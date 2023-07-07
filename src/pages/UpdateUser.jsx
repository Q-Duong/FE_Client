import React from 'react';

import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router';
import { customerAPI } from '../api/api';

import UpdateUserForm from '../components/UpdateUserForm';
import {validateCustomerData} from '../utils/valiedateCustomerData';

import { faAngleRight } from '@fortawesome/free-solid-svg-icons';


import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


function UpdateUser() {
    const history = useHistory()
    const token = useSelector(state => state.token.value)

    function handleUpdateUserSubmit(updateUser) {
        if(!validateCustomerData({...updateUser})) {
            alert('thông tin bạn điền chưa hợp lệ')
            return
        }
        async function updateCustomer() {
            try {
                await customerAPI.update(updateUser, token)
                alert('Cập nhật thông tin thành công')
                history.push('/')
            }
            catch (error) {
                alert(`Có lỗi vui lòng thử lại`)
            }

        }
        updateCustomer()
    }

    return (
        <Container>
            <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h3>Cập nhật thông tin</h3>
                                <div className="breadcrumb__links">
                                    <Link to="/">Trang chủ</Link>
                                    <FontAwesomeIcon icon={faAngleRight} className="faAngleRight" />
                                    <span>Cập nhật thông tin</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <UpdateUserForm onUpdateUserSubmit={handleUpdateUserSubmit} />
        </Container>
    );
}

export default UpdateUser;