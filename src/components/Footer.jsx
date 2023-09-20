import React, {  useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import logoFooter from '../assets/images/icon/logoSaleNoti.png'

import Grid from './Grid'
import { aboutCompanyAPI, serviceAPI, solutionAPI } from '../api/api';
import { Row } from 'react-bootstrap';

const Footer = () => {

    const [aboutCompany, setAboutCompany] = useState([])
    const [solutions, setSolutions] = useState([])
    const [services, setServices] =  useState([])
    const address = JSON.parse(process.env.REACT_APP_ADDRESS)
    const phone = JSON.parse(process.env.REACT_APP_PHONE)
    const email = JSON.parse(process.env.REACT_APP_EMAIL)

    useEffect(() => {
       
        async function getData() {
            try {
                const resGetAboutCompany = await aboutCompanyAPI.getAll();
                const resGetSolutions = await solutionAPI.getAll();
                const resGetServices = await serviceAPI.getAll();

                setAboutCompany(resGetAboutCompany.data.data);
                setSolutions(resGetSolutions.data.data)
                setServices(resGetServices.data.data);
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
                            {
                                address.map(item => (
                                    <p>{item}</p>
                                ))
                            }
                        </div>
                        <div className="footer__border"></div>
                        <div className="footer__title">
                        <FontAwesomeIcon icon={faPhone} /> Liên hệ
                        </div>
                        <div className="footer__content">
                           
                           {
                            phone.map(item => (
                                <p>
                                    {item}
                                </p>
                            ))
                           }
                            <p>
                                <strong>Email: </strong>
                            </p>
                            {
                                email.map(item => (
                                    <p>
                                    {item}
                                    </p>
                                ))
                            }
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
                                        <Link to={`/about-company/${item.id}`}>{item.title}</Link>
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
                                solutions?.map(item => (
                                    <p key={item.id}>
                                        <Link to={`/solution/${item.id}`}>{item.title}</Link>
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
                                services?.map(item => (
                                    <p key={item.id}>
                                        <Link to={`/technova-service/${item.id}`}>{item.title}</Link>
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
                            <img src={logoFooter} className="img_logo_footer" alt={logoFooter} />
                        </div>
                    </div>
                </Row> 
            </div>
        </footer>
    )
}

export default Footer
