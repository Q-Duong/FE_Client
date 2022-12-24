import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { exportOrderAPI } from '../api/api';
import CommentViewModal from '../components/CommentViewModal';
import OrderTable from '../components/OrderTable';
import useQuery from '../hooks/useQuery';


function Order() {
    let extraData = useQuery().get('extraData').split('splitString')
    const reqCreatedOrder = useQuery().get('orderId')

    const [orders, setOrders] = useState([])
    const token = useSelector(state => state.token.value)

    useEffect(() => {
        console.log(token ? token : extraData[1])
        if (!(extraData || extraData.length === 0) && !token)
            return
        async function getOrders() {
            try {
                const res = await exportOrderAPI.getByCustomerId(token ? token : extraData[1])
                const data = res.data
                setOrders(data)
            } catch (error) {
                alert(error.response.data.message)
            }
        }
        getOrders()
    }, [token,extraData,reqCreatedOrder])

    return (
        <>
            <OrderTable orders={orders} />
            <CommentViewModal token={token ? token : extraData[1]} order={reqCreatedOrder} />
        </>
    );
}

export default Order;   