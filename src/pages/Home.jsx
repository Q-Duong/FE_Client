import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { productAPI, categoryAPI, brandAPI } from '../api/api';

import Helmet from '../components/Helmet'
import HeroSlider from '../components/HeroSlider'
// import Carousel from '../components/Carousel'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import PolicyCard from '../components/PolicyCard'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'
import CategoryCard from '../components/CategoryCard'

import heroSliderData from '../assets/fake-data/hero-slider'
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/shopping-cart/cartItemsSlide';
const banner = "https://technova.com.vn/wp-content/uploads/2016/07/12121.png" ;


const Home = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    useEffect(() => {
        async function getData() {
            try {
                const responseGetCategories = await categoryAPI.getAll();
                const responseGetBrands = await brandAPI.getAll();
                const responseGetProducts = await productAPI.getAll();
                setCategories(responseGetCategories.data.data);
                setBrands(responseGetBrands.data.data);
                setProducts(responseGetProducts.data.data);
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
                    data={heroSliderData}
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
                                categories.map((item, index) => <Link key={index} to="/policy">
                                    <PolicyCard
                                        name={item.name}
                                        icon={item.image.path}
                                    />
                                </Link>)
                            }
                        </Grid>
                    </SectionBody>
                </Section>
                {/* end policy section */}
                <Section>
                    <SectionTitle>
                        Thương hiệu hàng đầu
                    </SectionTitle>
                    <SectionBody>
                        <Grid
                            col={8}
                            mdCol={4}
                            smCol={4}
                            gap={20}
                        >
                            {
                                brands.map((item) => (
                                    <Link to={`/category/${item.id}`}>
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


                {/* section top products*/}
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
                {/* end section top products */}

                {/* section product by category id */}
                {/* {
                    categories.map((item) => (
                        <SectionProductsbyCategory
                            category={item}
                        />
                    ))
                } */}
                {/* end section product by category id */}

                {/* banner */}
                <Section>
                    <SectionBody>
                        <Link to="/catalog">
                            <img src={banner} alt="" />
                        </Link>
                    </SectionBody>
                </Section>
                {/* end banner */}
            </Container>
        </Helmet>
    )
}

export default Home
