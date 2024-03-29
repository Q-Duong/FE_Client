import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { orderAPI } from '../api/api';
import OrderTable from '../components/OrderTable';

function Order() {
    const [orders, setOrders] = useState([])
    const token = useSelector(state => state.token.value)

    useEffect(() => {
        
        async function getOrders() {
            try {
                const res = await orderAPI.getAll(token)
                const data = res.data.data
                setOrders(data)
            } catch (error) {
                alert(`Xin lỗi đã có lỗi trong quá trình tải, vui lòng thử lại sau`)
            }
        }
        if(token)
            getOrders()
    }, [token])

    return (
        <>
            <OrderTable orders={orders} />
        </>
    );
}

export default Order;   