import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser,faBox,faGear,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import cart from '../assets/images/icon/cart.png';
import heart from '../assets/images/icon/heart.png';
import CartPre from '../components/CartPre'

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
        <Dropdown.Menu>
             <span className="caret"></span>
            {
                    <>
                        
                        {
                        cartItems.length!==0?
                         <>
                            {
                                cartItems.map((item) => (
                                    <Dropdown.Item className="cartDetails-top" href="/">
                                        <CartPre item={item} key={item._id}/>
                                    </Dropdown.Item>
                                ))
                            }
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