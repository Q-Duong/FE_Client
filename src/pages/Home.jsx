import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { productAPI, categoryAPI } from '../api/api';

import Helmet from '../components/Helmet'
import HeroSlider from '../components/HeroSlider'
// import Carousel from '../components/Carousel'
import Section, { SectionTitle, SectionBody, SectionTitleDiscount } from '../components/Section'
import PolicyCard from '../components/PolicyCard'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'
import CategoryCard from '../components/CategoryCard'

import heroSliderData from '../assets/fake-data/hero-slider'
import policy from '../assets/fake-data/policy'
import category from '../assets/fake-data/category'

//import banner from '../assets/images/banner.png'
import SectionProductsbyCategory from '../components/SectionProductsbyCategory';
import { Container } from 'react-bootstrap';
const banner = "https://technova.com.vn/wp-content/uploads/2016/07/12121.png" ;


const Home = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    
    useEffect(() => {
        async function getProducts() {
            try {
                const response = await productAPI.getAndSortBySoldQuantity(5);
                const products = response.data
                setProducts(products)
            } catch (error) {
                alert(error)
            }
        }
        getProducts()
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
                                policy.map((item, index) => <Link key={index} to="/policy">
                                    <PolicyCard
                                        name={item.name}
                                        description={item.description}
                                        icon={item.icon}
                                    />
                                </Link>)
                            }
                        </Grid>
                    </SectionBody>
                </Section>
                {/* end policy section */}
                <Section>
                    <SectionTitle>
                        Danh mục sản phẩm
                    </SectionTitle>
                    <SectionBody>
                        <Grid
                            col={8}
                            mdCol={4}
                            smCol={4}
                            gap={20}
                        >
                            {
                                category.map((item) => (
                                    <Link to={`/category/${item._id}`}>
                                        <CategoryCard
                                            name={item._id}
                                            item={item}
                                        />
                                    </Link>

                                ))
                            }
                        </Grid>
                    </SectionBody>
                </Section>


                {/* section top products*/}
                {/* <Section>
                    <SectionTitle>
                        Sản phẩm bán chạy trong tuần
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
                                        key={item._id}
                                        item={item}
                                    />
                                ))
                            }
                        </Grid>
                    </SectionBody>
                </Section> */}
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
