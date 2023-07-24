import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'react-bootstrap';

import numWithCommas from '../utils/numberWithCommas'
import formatDate from '../utils/formatDate'

OrderTable.propTypes = {
    listOrder: PropTypes.array.isRequired,
};

function OrderTable(props) {

    const {orders} = props

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Mã đơn hàng</th>
                    <th>Ngày mua</th>
                    <th>Sản phẩm</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái đơn hàng</th>
                </tr>
            </thead>
            <tbody>
                {
                    orders.map((order) => (
                        <tr>
                            <td>{order.id}</td>
                            <td>{formatDate(order.createdAt)}</td>
                            <td>
                                    {
                                        order.details.map((detail) =>
                                            <p>
                                                {`${detail.productName} - ${detail.quantity}`}
                                            </p>
                                        )
                                    }
                            </td>
                            <td>{numWithCommas(order.totalPrice)}</td>
                            <td>{order.status === "pending" ? "Chờ duyệt" : order.status === "success"? "Thành công": "Bhất bại"} - {order.isPaid ? "Đã thanh toán": "Chưa thanh toán"}</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
}

export default OrderTable;