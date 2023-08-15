import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { productAPI, categoryAPI, brandAPI, newsAPI, bannerAPI } from '../api/api';

import Helmet from '../components/Helmet'
import HeroSlider from '../components/HeroSlider'
// import Carousel from '../components/Carousel'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import PolicyCard from '../components/PolicyCard'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'
import CategoryCard from '../components/CategoryCard'

import { Container, Row } from 'react-bootstrap';
import NewsCard from '../components/NewsCard';


const Home = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [news, setNews] = useState([])
    const [banners, setBanners] = useState([])

    useEffect(() => {
        async function getData() {
            try {
                const responseGetCategories = await categoryAPI.getAll('take=8&orderBy=createdAt&order=ASC');
                const responseGetBrands = await brandAPI.getAll('take=8');
                const responseGetProducts = await productAPI.getAll('take=5&orderBy=createdAt&order=ASC');
                const resGetNews = await newsAPI.getAll('take=8')
                const resGetBanners = await bannerAPI.getAll();

                setCategories(responseGetCategories.data.data);
                setBrands(responseGetBrands.data.data);
                setProducts(responseGetProducts.data.data);
                setBanners(resGetBanners.data);
                setNews(resGetNews.data.data)
            } catch (error) {
                alert(error)
            }
        }
        getData()
    },[])

    return (
        <Helmet title="Trang chủ">
            {/* hero slider */}
            {/* <Carousel /> */}
            
                <HeroSlider
                    data={banners}
                    control={true}
                    auto={false}
                    timeOut={5000}
                />
    
            {/* end hero slider */}
            {/* policy section */}
            <Container>
                <Section>
                    <SectionBody>
                        <Grid
                            col={3}
                            mdCol={2}
                            smCol={1}
                            gap={20}
                        >
                            {
                                categories.map((item, index) => 
                                    <PolicyCard
                                        name={item.name}
                                        icon={item.image.path}
                                    />
                                )
                            }
                        </Grid>
                    </SectionBody>
                </Section>

                <Section>
                    <SectionTitle>
                        Thương hiệu hàng đầu
                    </SectionTitle>
                    <SectionBody>
                        <Grid
                            col={8}
                            mdCol={4}
                            smCol={3}
                            gap={20}
                        >
                            {
                                brands.map((item) => (
                                    <Link to={`/catalog?brandId=${item.id}`}>
                                        <CategoryCard
                                            name={item.id}
                                            item={item}
                                        />
                                    </Link>

                                ))
                            }
                        </Grid>
                    </SectionBody>
                </Section>

                <Section>
                    <SectionTitle>
                        Sản phẩm nổi bật
                    </SectionTitle>
                    <SectionBody>
                        <Grid
                            col={5}
                            mdCol={3}
                            smCol={2}
                            gap={20}
                        >
                            {
                                products.map((item) => (
                                    <ProductCard
                                        key={item.id}
                                        item={item}
                                    />
                                ))
                            }
                        </Grid>
                    </SectionBody>
                </Section>

                 <Section>
                    <SectionTitle>
                        Tin tức
                    </SectionTitle>
                    <SectionBody>
                        <Row>
                            {
                                news.map((item) => (
                                    <NewsCard
                                        key={item.id}
                                        item={item}
                                    />
                                ))
                            }
                        </Row>
                    </SectionBody>
                </Section>
              

                {/* section product by category id */}
                {/* {
                    categories.map((item) => (
                        <SectionProductsbyCategory
                            category={item}
                        />
                    ))
                } */}
                {/* end section product by category id */}
                {/* <Section>
                    <SectionTitle>
                        Tin cậy bởi các đối tác
                    </SectionTitle>
                    <SectionBody>
                        <Link to="/catalog">
                            <img src="https://res.cloudinary.com/dzbas7r2c/image/upload/v1690008111/cvoir70sc1psjsrwddzg_qovles.png" alt="banner" />
                        </Link>
                    </SectionBody>
                </Section> */}

            </Container>
        </Helmet>
    )
}

export default Home
