import React, { useRef, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { useHistory } from 'react-router';
import { Col, Container, Dropdown, Row } from 'react-bootstrap'
import { faLocationDot, faPhone, faMotorcycle } from '@fortawesome/free-solid-svg-icons';

import logo from '../assets/images/Logo-2.png'
import { useDispatch } from 'react-redux'
import HeaderUserInfo from './HeaderInfo'
import Search from './Search'
import { removeToken } from '../redux/token/tokenSlice'

import search from '../assets/images/icon/search.png';
import cart from '../assets/images/icon/cart.png';
import user from '../assets/images/icon/user.svg';
import { propTypes } from 'react-bootstrap/esm/Image';
import { wareHouseAPI } from '../api/api';
const logo1 = "https://technova.com.vn/wp-content/uploads/2016/08/Logo-Technova-01.png";
const mainNav = [
    {
        display: "About Technova",
        path: "/about"
    },
    {
        display: "Microsoft 365 ",
        path: "/microsoft-365"
    },
    {
        display: "Autodesk",
        path: "/autodesk"
    },
    {
        display: "Adobe",
        path: "/adobe"
    },
    {
        display: "Bim",
        path: "/bim"
    },
    {
        display: "Gải pháp",
        path: "/giai-phap"
    },{
        display: "Dịch vụ",
        path: "/dich-vu"
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
                    {/* <Container>
                        <Row >
                            <Col lg="4" xs="4" className="header__top__left"></Col>
                            <Col lg="4" xs="4" className="header__top__mid"></Col>
                            <Col lg="4" xs="4" className="header__top__right"><FontAwesomeIcon icon={faMotorcycle} /> HOTLINE: HCM : 08. 3512 8760 - HN :0912611827</Col>
                        </Row>
                    </Container> */}
                </div>
                <Container>

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
                            
                        </div>
                        <div className="header__menu__right">
                            <div className="header__menu__right__search__item">
                                <img src={search} className="search" onClick={handleSearchFormShow} />
                            </div>
                            <div className="header__menu__right__cart">
                                <Dropdown className="header__menu__right__cart__btn">
                                    <Dropdown.Toggle className="header__menu__right__cart__btn__opiton" id="dropdown-custom-components">

                                        <img src={cart} />
                                        {
                                            cartItems.length !== 0 ?
                                                <span className="header__menu__right__cart__btn__opiton__length">{cartItems.length}</span>
                                                : <></>
                                        }

                                    </Dropdown.Toggle>
                                    <HeaderUserInfo cartItems={cartItems} token={token} onLogout={handleLogout} />
                                </Dropdown>
                            </div>
                            <div className="header__menu__right__user__item">
                                <img src={user} className="search" onClick={handleSearchFormShow} />
                            </div>
                        </div>
                    </div>
                </Container>
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
