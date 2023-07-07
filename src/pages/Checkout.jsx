import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Helmet from '../components/Helmet'
import Button from '../components/Button'
import { Container, Form } from 'react-bootstrap';
import { customerAPI, orderAPI } from '../api/api'
import { useDispatch } from 'react-redux'
import { removeAll } from '../redux/shopping-cart/cartItemsSlide'
import CartForCheckout from './CartForCheckout';
import { validatePhone } from '../utils/valiedateCustomerData';
const Checkout = () => {
    const token = useSelector(state => state.token.value)

    const cartItems = useSelector((state) => state.cartItems.value)

    const dispatch = useDispatch()

    const history = useHistory()

    const [totalBill, setTotalBill] = useState(0)


    const [phone, setPhone] = useState('')

    const [email, setEmail] = useState('')

    const [name, setName] = useState('')

    const [paymentMethod, setPaymentMethod] = useState('offline')

    useEffect(() => {
        if (!token){
            alert('Vui lòng đăng nhập để tiến hành thanh toán')
            history.push('/login')
        }
        async function getUserInfo() {
            try {
                const res = await customerAPI.getInfo(token)
                const user = res.data
                setPhone(user.phone)
                setEmail(user.email)
                setName(user.name)
            } catch (error) {
                alert(error.response.data.message)
            }
        }
        getUserInfo()
    }, [token, history])

    useEffect(() => {
        setTotalBill(cartItems.reduce((total, item) => total + (Number(item.quantity) * Number(item.price)), 0))
    }, [cartItems])

    async function handleCreateOrder() {
        try {
            if (!name || name === ''){
                alert('không được để trống tên')
                return
            }
            if (!phone || phone === '' || !validatePhone(phone)){
                alert('số điện thoại không đúng')
                return
            }
            if (!email || email === ''){
                alert('email không đúng')
                return
            }
            const createOrder = {
                totalPrice: totalBill,
                customerName: name,
                phone,
                email,
                details: cartItems.map(item => ({
                    price: item.price,
                    quantity: item.quantity,
                    productName: item.name,
                    productPackageId: item.id
                }))        
            }

            const res = await orderAPI.create(createOrder, token)

            if (paymentMethod === 'offline') {
                alert('đặt hàng thành công')
                history.push(`/order`)
            } else {
                const payload = {
                    requestId: res.data.id,
                    orderId: res.data.id,
                    orderInfo: `Thanh toán đơn hàng ${res.data.id}`,
                    amount: res.data.totalPrice,
                }
                const resPayment = await orderAPI.payMoMo(payload);
                window.location.href = resPayment.data.payUrl
            }
        } catch (error) {
            alert(error.response.data.message)
        } finally{
            // dispatch(removeAll())
        }
    }

    return (
        <Helmet title="Thanh toán">
            <Container>
            <CartForCheckout></CartForCheckout>
            <div class="checkout__form">
                <h4 class="checkout__title">Điền thông tin gửi hàng</h4>
                <Form>
                    <div class="row">
                        <div class="col-lg-7 col-md-6">
                            <div class="row">
                                <div class="">
                                    <div class="checkout__input ">
                                        <h4 className="border__title">Thông tin giao hàng</h4>
                                        <Form.Control
                                            type="text"
                                            placeholder="tên"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <Form.Control
                                            type="text"
                                            placeholder="số điện thoại"
                                            value={phone}
                                            pattern="(84|0[3|5|7|8|9])+([0-9]{8})\b"
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                        <Form.Control
                                            type="email"
                                            placeholder="email"
                                            value={email}
                                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <h4 className="border__title">Phương thức thanh toán</h4>

                                <div className="custom-radios">
                                    <div>
                                        <input type="radio" id="color-3" name="paymentMethod" value="offline" checked
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <label for="color-3">
                                            <span className="bgColor">
                                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
                                            </span>
                                            <span className="bgimg">
                                                <img src="https://minio.thecoffeehouse.com/image/tchmobileapp/1000_photo_2021-04-06_11-17-08.jpg" alt="Checked Icon" />
                                            </span>
                                            <span className="text">Liên hệ để thanh toán</span>
                                        </label>
                                    </div>

                                    <div>
                                        <input type="radio" id="color-4" name="paymentMethod" value="momo"
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <label for="color-4">
                                            <span className="bgColor">
                                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
                                            </span>
                                            <span className="bgimg">
                                                <img src="https://minio.thecoffeehouse.com/image/tchmobileapp/386_ic_momo@3x.png" alt="Checked Icon" />
                                            </span>
                                            <span className="text">MoMo</span>
                                        </label>
                                    </div>
                                </div>


                                {/* <Form.Select 
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        >
                                            <option value="INPERSON">thanh toán khi nhận hàng</option>
                                            <option value="MOMO">thanh toán qua MoMo</option>
                                        </Form.Select> */}

                            </div>
                        </div>
                    </div>
                    
                </Form>
                <Button onClick={handleCreateOrder} class="checkout__button">
                        Đặt hàng
                    </Button>
            </div>
            
            </Container>
        </Helmet>
    )
}

export default Checkout
