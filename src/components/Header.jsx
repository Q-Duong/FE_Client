import React, { useRef, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { useHistory } from 'react-router';
import { Col, Dropdown, Row } from 'react-bootstrap'
import { faLocationDot, faPhone, faMotorcycle } from '@fortawesome/free-solid-svg-icons';

import logo from '../assets/images/Logo-2.png'
import { useDispatch } from 'react-redux'
import HeaderUserInfo from './HeaderInfo'
import Search from './Search'
import { removeToken } from '../redux/token/tokenSlice'

import search from '../assets/images/icon/search.png';
import cart from '../assets/images/icon/cart.png';
import heart from '../assets/images/icon/heart.png';
import { propTypes } from 'react-bootstrap/esm/Image';
import { wareHouseAPI } from '../api/api';
const logo1 = "https://www.chili.vn/blogs/wp-content/uploads/2019/03/thiet-ke-web-ban-hang-1.png";
const mainNav = [
    {
        display: "Sản phẩm",
        path: "/catalog"
    },
    {
        display: "Tin Tức ",
        path: "/pagenews"
    },
    {
        display: "Liên hệ",
        path: "/contact"
    }
]

const Header = (props) => {
    const [showSearchForm, setShowSearchForm] = useState(false);
    const cartItems = useSelector((state) => state.cartItems.value)
    const token = useSelector((state) => state.token.value)
    const headerRef = useRef(null)
    const headerTopRef = useRef(null)
    const dispatch = useDispatch()
    const history = useHistory()
    const { pathname } = useLocation()

    const activeNav = mainNav.findIndex(e => e.path === pathname)


    function handleSearchFormShow() {
        setShowSearchForm(!showSearchForm)
    };

    async function handleSearch(searchTerm) {
        setShowSearchForm(!showSearchForm)
        history.push(`/search?searchTerm=${searchTerm}`)
    };

    function handleLogout() {
        dispatch(removeToken())
        history.push('/')
    }

    useEffect(() => {
        window.addEventListener("scroll", () => {
            try {
                if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                    headerRef.current.classList.add('shrink')
                    headerTopRef.current.classList.add('active')
                } else {
                    headerRef.current.classList.remove('shrink')
                    headerTopRef.current.classList.remove('active')
                }
            } catch (err) { }
        })
        return () => {
            window.removeEventListener("scroll", window)
        };
    }, []);

    const menuLeft = useRef(null)

    const menuToggle = () => menuLeft.current.classList.toggle('active')


    const iconUser = React.forwardRef(({ children, onClick }, ref) => (
        <i className="bx bx-user"
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}>
            {children}
        </i>
    ));


    return (
        <>
            <div className="header" ref={headerRef}>
                <div className="header__top" ref={headerTopRef}>
                    <div className="container">
                        <Row >
                            <Col lg="4" xs="4" className="header__top__left"><FontAwesomeIcon icon={faLocationDot} /> 60 Cửa hàng khắp cả nước</Col>
                            <Col lg="4" xs="4" className="header__top__mid"><FontAwesomeIcon icon={faPhone} /> Đặt hàng: 0919889558</Col>
                            <Col lg="4" xs="4" className="header__top__right"><FontAwesomeIcon icon={faMotorcycle} /> Freeship từ 50.000vnd</Col>
                        </Row>
                    </div>
                </div>
                <div className="container">

                    <div className="header__menu">
                        <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                            <i className='bx bx-menu-alt-left'></i>
                        </div>
                        <div className="header__logo">
                            <Link to="/">
                                <img src={logo1} alt="" />
                            </Link>
                        </div>
                        <div className="header__menu__left" ref={menuLeft}>
                            <div className="header__menu__left__close" onClick={menuToggle}>
                                <i className='bx bx-chevron-left'></i>
                            </div>
                            {
                                mainNav.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`header__menu__item header__menu__left__item ${index === activeNav ? 'active' : ''}`}
                                        onClick={menuToggle}
                                    >
                                        <Link to={item.path}>
                                            <span>{item.display}</span>
                                        </Link>
                                    </div>
                                ))
                            }
                            <div className="header__menu__item header__menu__search__item">
                                <img src={search} className="search" onClick={handleSearchFormShow} />
                            </div>
                        </div>
                        <div className="header__menu__right">


                            <div className="header__menu__item header__menu__right__item">
                                <Dropdown className="buttomCart">
                                    <Dropdown.Toggle className="buttomOpiton" id="dropdown-custom-components">

                                        <img src={cart} />
                                        {
                                            cartItems.length !== 0 ?
                                                <span className="cartLength">{cartItems.length}</span>
                                                : <></>
                                        }

                                    </Dropdown.Toggle>
                                    <HeaderUserInfo cartItems={cartItems} token={token} onLogout={handleLogout} />
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Search
                showSearchForm={showSearchForm}
                onSearchFormShow={handleSearchFormShow}
                onSearch={handleSearch}
            />
        </>
    )
}

export default Header
