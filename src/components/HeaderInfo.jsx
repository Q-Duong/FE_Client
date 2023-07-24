import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser,faBox,faGear,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import cart from '../assets/images/icon/cart.png';
import heart from '../assets/images/icon/heart.png';
import CartPre from '../components/CartPre'
import numberWithCommas from '../utils/numberWithCommas';

HeaderUserInfo.propTypes = {
    onLogout: PropTypes.func,
};

function HeaderUserInfo(props) {
    const { onLogout, cartItems, token } = props

    function handleLogout() {
        if (onLogout) {
            onLogout()
        }
    }

    return (
        <Dropdown.Menu style={{width: "180px"}}>
            {
                    <>
                        
                        {
                        cartItems.length!==0?
                         <>
                            {
                                cartItems.map((item) => (
                                    <Dropdown.Item className="cartDetails-top" href="/">
                                        <CartPre item={item} key={item.id}/>
                                    </Dropdown.Item>
                                ))
                            }
                            <Dropdown.Item>
                                Tổng tiền: {numberWithCommas(cartItems.reduce((total, item) => total + (item.price * item.quantity),0))}
                            </Dropdown.Item>
                            <Dropdown.Item className="checkout" href="/checkout">
                                <div className="checkout__button">Thanh toán</div>  
                            </Dropdown.Item>
                            
                        </>
                        :
                        <>
                            <div className="cartDetails">Giỏ hàng trống.</div>
                        </>
                        } 
                    </>
                    
            }
        </Dropdown.Menu>

    );
}

export default HeaderUserInfo;