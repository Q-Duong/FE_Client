import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import logoFooter from '../assets/images/icon/logoSaleNoti.png'

import Grid from './Grid'

import logo from '../assets/images/Logo-2.png'
import { Row } from 'react-bootstrap';
const logo1 = "https://technova.com.vn/wp-content/uploads/2016/08/Logo-Technova-01.png";
const footerAboutLinks = [

    {
        display: "Liên hệ",
        path: "/about"
    },
    {
        display: "Tuyển dụng",
        path: "/about"
    },
    {
        display: "Tin tức",
        path: "/about"
    },
    {
        display: "Hệ thống cửa hàng",
        path: "/about"
    }
]

const footerCustomerLinks = [
    {
        display: "Chính sách đổi trả",
        path: "/about"
    },
    {
        display: "Chính sách bảo hành",
        path: "/about"
    },
    {
        display: "Chính sách hoàn tiền",
        path: "/about"
    }
]
const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <Grid
                    col={4}
                    mdCol={2}
                    smCol={1}
                    gap={10}
                >
                    <div>
                        <div className="footer__title">
                        <FontAwesomeIcon icon={faLocationDot} /> Địa chỉ
                        </div>
                        <div className="footer__content">
                            <p>
                            289/1 Ung Văn Khiêm, <hr />
                            Phường 25, Quận Binh Thạnh, TP.HCM
                            </p>
                        </div>
                        <div className="footer__border"></div>
                        <div className="footer__title">
                        <FontAwesomeIcon icon={faPhone} /> Liên hệ
                        </div>
                        <div className="footer__content">
                            <p>
                                Hồ Chí Minh: <strong>0835128760</strong>
                            </p>
                            <p>
                                Hà Nội: <strong>0912611827</strong>
                            </p>
                            <p>
                                <strong>Email: </strong>
                            </p>
                            <p>
                                Hồ Chí Minh: <strong>kinhdoanh@technova.com.vn</strong>
                            </p>
                            <p>
                                Hà Nội: <strong>linhnguyen@technova.com.vn</strong>
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="footer__title">
                            Giới thiệu
                        </div>
                        <div className="footer__content">
                            {
                                footerAboutLinks.map((item, index) => (
                                    <p key={index}>
                                        <Link to={item.path}>
                                            {item.display}
                                        </Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <div className="footer__title">
                            Chăm sóc khách hàng
                        </div>
                        <div className="footer__content">
                            {
                                footerCustomerLinks.map((item, index) => (
                                    <p key={index}>
                                        <Link to={item.path}>
                                            {item.display}
                                        </Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div className="footer__about">
                        <p>
                            <Link to="/">
                                <img src={logo1} className="footer__logo" alt="" />
                            </Link>
                        </p>
                        <p>
                            Hướng đến mục tiêu mang lại niềm vui ăn mặc mới mỗi ngày cho hàng triệu người tiêu dùng Việt.
                        </p>
                    </div>
                </Grid>
                <Row>
                    <div className="footer__buttom"></div>
                    <div className="col-7 col-lg-4 ">
                        <div className="footer__copyright__text">
                            
                            <p>Copyright ©
                                <script>
                                document.write(new Date().getFullYear());
                                </script>
                                Quốc Dương. All rights reserved.
                            </p>
                            
                        </div>
                    </div>
                    <div className="col-lg-6 d-none d-lg-block footer__img"></div>
                    <div className="col-5 col-lg-2">
                        <div className="footer__img">
                            <img src={logoFooter} className="img_logo_footer"/>
                        </div>
                    </div>
                </Row> 
            </div>
        </footer>
    )
}

export default Footer
