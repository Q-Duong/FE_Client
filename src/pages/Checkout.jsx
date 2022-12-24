import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Helmet from '../components/Helmet'
import Button from '../components/Button'
import { Form } from 'react-bootstrap';
import { customerAPI, exportOrderAPI } from '../api/api'
import { useDispatch } from 'react-redux'
import { removeAll } from '../redux/shopping-cart/cartItemsSlide'
import CartForCheckout from './CartForCheckout';
import { validatePhone } from '../utils/valiedateCustomerData';
const Checkout = () => {
    const token = useSelector(state => state.token.value)

    const cartItems = useSelector((state) => state.cartItems.value)

    const dispatch = useDispatch()

    const history = useHistory()

    const [totalProducts, setTotalProducts] = useState(0)

    const [totalBill, setTotalBill] = useState(0)

    const [address, setAddress] = useState('')

    const [phone, setPhone] = useState('')

    const [email, setEmail] = useState('')

    const [name, setName] = useState('')

    const [paymentMethod, setPaymentMethod] = useState('INPERSON')

    useEffect(() => {
        if (!token)
            return
        async function getUserInfo() {
            try {
                const res = await customerAPI.getInfo(token)
                const user = res.data
                setAddress(user.address)
                setPhone(user.phone)
                setEmail(user.email)
                setName(user.name)
            } catch (error) {
                alert(error.response.data.message)
            }
        }
        getUserInfo()
    }, [token])

    useEffect(() => {
        setTotalBill(cartItems.reduce((total, item) => total + (Number(item.quantity) * Number(item.soldPrice)), 0))
        setTotalProducts(cartItems.length)
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
            const exportOrder = {
                totalBill,
                paymentMethod,
                shipAddress: address,
                customer: {
                    email, phone, name
                }
            }

            const purchaseProducts = cartItems.map(cart => {
                return {
                    warehouseId: cart._id,
                    productId: cart.product._id,
                    price: cart.soldPrice,
                    quantity: cart.quantity,
                }
            })
            const res = await exportOrderAPI.create({ exportOrder, purchaseProducts })
            dispatch(removeAll())

            if (paymentMethod === 'INPERSON') {
                alert('đặt hàng thành công')
                console.log(res.data)
                history.push(`/order?extraData=asplitString${res.data.accessToken}&orderId=${res.data.orderId}`)
            } else {
                window.location.href = res.data.payUrl
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <Helmet title="Thanh toán">
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
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                        <Form.Control
                                            type="email"
                                            placeholder="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <Form.Control
                                            type="text"
                                            placeholder="địa chỉ giao hàng"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <h4 className="border__title">Phương thức thanh toán</h4>

                                <div className="custom-radios">
                                    <div>
                                        <input type="radio" id="color-3" name="paymentMethod" value="INPERSON" checked
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <label for="color-3">
                                            <span className="bgColor">
                                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
                                            </span>
                                            <span className="bgimg">
                                                <img src="https://minio.thecoffeehouse.com/image/tchmobileapp/1000_photo_2021-04-06_11-17-08.jpg" alt="Checked Icon" />
                                            </span>
                                            <span className="text">Tiền mặt</span>
                                        </label>
                                    </div>

                                    <div>
                                        <input type="radio" id="color-4" name="paymentMethod" value="MOMO"
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

                        <div class="col-lg-5 col-md-6">
                            <div class="checkout__order">
                                {/* <div class="checkout__order__products">
                                            <p>Ghi chú đơn hàng<span>*</span></p>
                                            <textarea name="shipping_notes" class="shipping_notes"
                                                placeholder="Ghi chú đơn hàng của bạn (Không bắt buộc)" rows="10" cols="42"
                                                ></textarea>
                                        </div> */}
                                <Button size="block">
                                    Tiếp tục thanh toán
                                </Button>

                            </div>
                        </div>
                    </div>
                </Form>
            </div>
            <Button onClick={handleCreateOrder} size="block">
                Đặt hàng
            </Button>

        </Helmet>
    )
}

export default Checkout
