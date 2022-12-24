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
                    <th>Ngày giao hàng</th>
                    <th>Sản phẩm</th>
                    <th>Người bán</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái đơn hàng</th>
                </tr>
            </thead>
            <tbody>
                {
                    orders.map((order) => (
                        <tr>
                            <td>{order._id}</td>
                            <td>{formatDate(order.createdAt)}</td>
                            <td>{formatDate(order.shippedDate)}</td>
                            <td>
                                    {
                                        order.details.map((detail) =>
                                            <p>
                                                {`${detail.product.name} - ${detail.productQuantity} ${detail.product.unit}`}
                                            </p>
                                        )
                                    }
                            </td>
                            <td>{``}</td>
                            <td>{numWithCommas(order.totalBill)}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
}

export default OrderTable;