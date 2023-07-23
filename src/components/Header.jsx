import React, { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router';
import {  Container, Dropdown,  } from 'react-bootstrap'

import { useDispatch } from 'react-redux'
import HeaderUserInfo from './HeaderInfo'
import Search from './Search'
import { removeToken } from '../redux/token/tokenSlice'

import search from '../assets/images/icon/search.png';
import cart from '../assets/images/icon/cart.png';
import user from '../assets/images/icon/user.svg';
import { aboutCompanyAPI, brandAPI, solutionAPI, serviceAPI } from '../api/api';
import { Menu, MenuItem } from '@mui/material';

const Header = (props) => {
    const [showSearchForm, setShowSearchForm] = useState(false);
    const cartItems = useSelector((state) => state.cartItems.value)
    const token = useSelector((state) => state.token.value)
    const headerRef = useRef(null)
    const headerTopRef = useRef(null)
    const dispatch = useDispatch()
    const history = useHistory()
    const [aboutCompany, setAboutCompany] = useState([])
    const [brands, setBrands] = useState([])
    const [solutions, setSolutions] = useState([])
    const [services, setServices] =  useState([])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    useEffect(() => {
        async function getData() {
            try {
                const resGetBrands = await brandAPI.getAll('take=3');
                const resGetAboutCompany = await aboutCompanyAPI.getAll();
                const resGetSolutions = await solutionAPI.getAll();
                const resGetServices = await serviceAPI.getAll();
                setBrands(resGetBrands.data.data);
                setAboutCompany(resGetAboutCompany.data.data);
                setSolutions(resGetSolutions.data.data)
                setServices(resGetServices.data.data);
            } catch (error) {
                alert(error)
            }
        }
        getData()
    },[])

    function handleSearchFormShow() {
        setShowSearchForm(!showSearchForm)
    };

    async function handleSearch(searchTerm) {
        setShowSearchForm(!showSearchForm)
        history.push(`/catalog?searchTerm=${searchTerm}`)
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

    return (
        <>
            <div className="header" ref={headerRef}>
                <Container>

                    <div className="header__menu">
                        <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                            <i className='bx bx-menu-alt-left'></i>
                        </div>
                        <div className="header__logo">
                            <Link to="/">
                                <img src="https://res.cloudinary.com/dzbas7r2c/image/upload/v1689999378/main-logo_jd8pxn.png" alt="" />
                            </Link>
                        </div>
                        <div className="header__menu__left" ref={menuLeft}>
                            <div className="header__menu__left__close" onClick={menuToggle}>
                                <i className='bx bx-chevron-left'></i>
                            </div>
                            <div className={`header__menu__item header__menu__left__item`}>
                                <nav class="header__menu mobile-menu">
                                    <ul>
                                        <li className={`nav-item`}>
                                        <Link to={''}><span></span>About Technova</Link>
                                            <ul class="dropdown">
                                                
                                                {
                                                    aboutCompany?.map(item => (
                                                        <li key={item.id}>
                                                            <Link to={`/about-company/${item.id}`}>{item.title}</Link>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            {
                                brands.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`header__menu__item header__menu__left__item`}
                                        onClick={menuToggle}
                                    >
                                        <nav class="header__menu mobile-menu">
                                            <ul>
                                                <li className={`nav-item`}>
                                                    <Link to={`/catalog?brandId=${item.id}`}><span>{item.name}</span></Link>
                                                    <ul class="dropdown">
                                                        {
                                                            item.products?.map((item) => (
                                                                <li>
                                                                   <Link to={`/product/${item.id}`}>{item.name}</Link>
                                                                </li>
                                                            ))
                                                        }
                                                        <li>
                                                        <Link to={`/catalog?brandId=${item.id}`}>Xem tất cả</Link>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                ))
                            }

                            <div className={`header__menu__item header__menu__left__item`}>
                                <nav class="header__menu mobile-menu">
                                    <ul>
                                        <li className={`nav-item`}>
                                        <Link to={''}><span></span>Giải pháp</Link>
                                            <ul class="dropdown">
                                                {
                                                    solutions?.map(solution => (
                                                        <li key={solution.id}>
                                                            <Link to={`/solution/${solution.id}`}>{solution.title}</Link>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className={`header__menu__item header__menu__left__item`}>
                                <nav class="header__menu mobile-menu">
                                    <ul>
                                        <li className={`nav-item`}>
                                        <Link to={''}><span></span>Dịch vụ</Link>
                                            <ul class="dropdown">
                                               {
                                                services.map(service => (
                                                    <li>
                                                        <Link to={`/technova-service/${service.id}`}>{service.title}</Link>
                                                    </li>
                                                ))
                                               }
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className={`header__menu__item header__menu__left__item`}>
                                <nav class="header__menu mobile-menu">
                                    <ul>
                                        <li className={`nav-item`}>
                                        <Link to={'/contact'}><span></span>Liên hệ</Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            
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
                                                <span className="header__menu__right__cart__btn__opiton__length">{cartItems.reduce((total, item) => total + item.quantity,0)}</span>
                                                : <></>
                                        }

                                    </Dropdown.Toggle>
                                    <HeaderUserInfo cartItems={cartItems} token={token} onLogout={handleLogout} />
                                </Dropdown>
                            </div>
                            <div className="header__menu__right__user__item">
                                    <img 
                                        src={user} 
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    />
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        {
                                            token ?
                                            <>
                                                <MenuItem onClick={handleClose}>
                                                    <Link to="/update-info">Xem thông tin</Link>
                                                </MenuItem>
                                                <MenuItem onClick={handleClose}>
                                                    <Link to="/order">Xem đơn hàng</Link>
                                                </MenuItem>
                                                <MenuItem onClick={() => {
                                                    handleClose()
                                                    dispatch(removeToken())
                                                    alert('Đăng xuất thành công')
                                                }}>
                                                    Đăng xuất
                                                </MenuItem>
                                            </>:
                                            <>
                                                <MenuItem onClick={handleClose}>
                                                    <Link to="/login">Đăng nhập</Link>
                                                </MenuItem>
                                                <MenuItem onClick={handleClose}>
                                                    <Link to="/register">Đăng ký</Link>
                                                </MenuItem>
                                            </> 
                                        }
                                        
                                    </Menu>
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
