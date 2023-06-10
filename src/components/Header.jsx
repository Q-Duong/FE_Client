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
import { brandAPI, categoryAPI } from '../api/api';
const logo1 = "https://technova.com.vn/wp-content/uploads/2016/08/Logo-Technova-01.png";
const mainNav = [
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
    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])
    
    useEffect(() => {
        async function getBrands() {
            try {
                const response = await brandAPI.getAll();
                const brands = response.data
                setBrands(brands)
            } catch (error) {
                alert(error)
            }
        }
        getBrands()
    },[])

    useEffect(() => {
        async function getCategories() {
            try {
                const response = await categoryAPI.getAll();
                const categories = response.data
                setCategories(categories)
            } catch (error) {
                alert(error.response.data.message)
            }
        }
        getCategories()
    }, [])

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
                            <div
                                className={`header__menu__item header__menu__left__item`}
                            >
                                <nav class="header__menu mobile-menu">
                                    <ul>
                                        <li className={`nav-item`}>
                                        <Link to={'/about'}><span></span>About Technova</Link>
                                            <ul class="dropdown">
                                                <li>
                                                    <a href="">Giới thiệu</a>
                                                </li>
                                                <li>
                                                    <a href="">Đối tác</a>
                                                </li>
                                                <li>
                                                    <a href="">Tuyển dụng</a>
                                                </li>
                                                <li>
                                                    <a href="">Hỗ trợ</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            {/* {
                                brands.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`header__menu__item header__menu__left__item`}
                                        onClick={menuToggle}
                                    >
                                        <nav class="header__menu mobile-menu">
                                            <ul>
                                                <li className={`nav-item ${index === activeNav ? 'active' : ''}`}>
                                                    <Link to={item.path}><span>{item.display}</span></Link>
                                                    <ul class="dropdown">
                                                        {
                                                            categories.map((item, index) => (
                                                                <li>
                                                                    <a href={item.path}>{item.display}</a>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                ))
                            } */}
                            
                        </div>
                        <div
                            className={`header__menu__item header__menu__left__item`}
                        >
                            <nav class="header__menu mobile-menu">
                                <ul>
                                    <li className={`nav-item`}>
                                    <Link to={'/contact'}><span></span>Toàn bộ sản phẩm</Link>
                                        <ul class="dropdown">
                                            <li>
                                                <a href=""></a>
                                            </li>
                                            <li>
                                                <a href="">Làm Website</a>
                                            </li>
                                            <li>
                                                <a href="">Làm Game</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div
                            className={`header__menu__item header__menu__left__item`}
                        >
                            <nav class="header__menu mobile-menu">
                                <ul>
                                    <li className={`nav-item`}>
                                    <Link to={'/contact'}><span></span>Giải pháp</Link>
                                        <ul class="dropdown">
                                            <li>
                                                <a href="">Cloud Solutions</a>
                                            </li>
                                            <li>
                                                <a href="">Backup & Restore</a>
                                            </li>
                                            <li>
                                                <a href="">Dành cho doanh nghiệp CRM</a>
                                            </li>
                                            <li>
                                                <a href="">Máy chủ / Hệ thống</a>
                                            </li>
                                            <li>
                                                <a href="">Giáo dục</a>
                                            </li>
                                            <li>
                                                <a href="">EHMS</a>
                                            </li>
                                            <li>
                                                <a href="">Email Marketing</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div
                            className={`header__menu__item header__menu__left__item`}
                        >
                            <nav class="header__menu mobile-menu">
                                <ul>
                                    <li className={`nav-item`}>
                                    <Link to={'/contact'}><span></span>Dịch vụ</Link>
                                        <ul class="dropdown">
                                            <li>
                                                <a href="">Thiết kế đồ hoạ</a>
                                            </li>
                                            <li>
                                                <a href="">Làm Website</a>
                                            </li>
                                            <li>
                                                <a href="">Làm Game</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div
                            className={`header__menu__item header__menu__left__item`}
                        >
                            <nav class="header__menu mobile-menu">
                                <ul>
                                    <li className={`nav-item`}>
                                    <Link to={'/contact'}><span></span>Liên hệ</Link>
                                    </li>
                                </ul>
                            </nav>
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
                                <Link to={'/login'}>
                                    <img src={user} />
                                </Link>
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
