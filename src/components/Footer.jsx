import React, { useRef, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import logoFooter from '../assets/images/icon/logoSaleNoti.png'

import Grid from './Grid'
import { aboutCompanyAPI, brandAPI, solutionAPI } from '../api/api';
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

    const [aboutCompany, setAboutCompany] = useState([])


    useEffect(() => {
        async function getData() {
            try {
                const resGetAboutCompany = await aboutCompanyAPI.getAll();
                setAboutCompany(resGetAboutCompany.data.data);
            } catch (error) {
                alert(error)
            }
        }
        getData()
    },[])
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
                            About TechNova
                        </div>
                        <div className="footer__content">
                            {
                                aboutCompany?.map(item => (
                                    <p key={item.id}>
                                        <Link to={`about-company/${item.id}`}>{item.title}</Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <div className="footer__title">
                            Giải Pháp
                        </div>
                        <div className="footer__content">
                            {
                                aboutCompany?.map(item => (
                                    <p key={item.id}>
                                        <Link to={`about-company/${item.id}`}>{item.title}</Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <div className="footer__title">
                            Dịch vụ
                        </div>
                        <div className="footer__content">
                            {
                                aboutCompany?.map(item => (
                                    <p key={item.id}>
                                        <Link to={`about-company/${item.id}`}>{item.title}</Link>
                                    </p>
                                ))
                            }
                        </div>
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
                                TechNova. All rights reserved.
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
