import React, { useState, useEffect, useRef } from 'react'

import { categoryAPI, productAPI } from '../api/api';
import Helmet from '../components/Helmet'
import CheckBox from '../components/CheckBox'

import Button from '../components/Button'
import InfinityList from '../components/InfinityList'
import Section, { SectionBody, SectionTitle } from '../components/Section';
import Grid from '../components/Grid';
import CategoryCard from '../components/CategoryCard';


const Catalog = () => {
    const initFilter = {
        brands: []
    }

    const [products, setProducts] = useState([])

    const [productFilter, setProductFilter] = useState([])

    const [filter, setFilter] = useState(initFilter)

    const [categories, setCategories] = useState([])

    const [brands, setBrands] = useState([])

    const [activeCategory, setActiveCategory] = useState(null)


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


    useEffect(() => {
        async function getProducts() {
            try {
                const response = await productAPI.getAll();
                const productDatas = response.data
                const tempBrands = productDatas.reduce((arrBrands, product) => {
                    if (!arrBrands.some(brand => brand._id == product.product.brand._id))
                        arrBrands.push(product.product.brand)
                    return arrBrands
                }, [])
                setProducts(productDatas)
                setProductFilter(productDatas)
                setBrands(tempBrands)

            } catch (error) {
                alert(error.response.data.message)
          
            }
        }
        getProducts()
    }, [])


    const filterSelect = (checked, item) => {
        if (checked) {
            setFilter({ ...filter, brands: [...filter.brands, item._id] })
        } else {
            const newBrand = filter.brands.filter(e => e !== item._id)
            setFilter({ ...filter, brands: newBrand })
        }
    }


    const clearFilter = () => {setFilter(initFilter); setActiveCategory(null)}

    useEffect(
        () => {
            try {
                let temp = [...products]

                if (filter.brands.length > 0) {
                    temp = temp.filter(e => filter.brands.includes(e.product.brand._id))
                }
                setProductFilter(temp)
            } catch (err) { }
        },
        [filter]
    )

    useEffect(() => {
        try {
            if(activeCategory){
                let temp = [...products]
                temp = temp.filter(e => e.product.category === activeCategory)
                const tempBrands = temp.reduce((arrBrands, product) => {
                    if (!arrBrands.some(brand => brand._id == product.product.brand._id))
                        arrBrands.push(product.product.brand)
                    return arrBrands
                }, [])
                setBrands(tempBrands)
                setProductFilter(temp)
            } else {
                let temp = [...products]
                const tempBrands = temp.reduce((arrBrands, product) => {
                    console.log(product)
                    if (!arrBrands.some(brand => brand._id == product.product.brand._id))
                        arrBrands.push(product.product.brand)
                    return arrBrands
                }, [])
                setBrands(tempBrands)
                setProductFilter(temp)

            }
          
        } catch (err) { }
    }, [activeCategory])

    const filterRef = useRef(null)

    const showHideFilter = () => filterRef.current.classList.toggle('active')
    return (
        <Helmet title="Sản phẩm">
            <div className="catalog">
                <div className="catalog__filter" ref={filterRef}>
                    <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                        <i className="bx bx-left-arrow-alt"></i>
                    </div>


                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Hãng
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                brands.map((item) => (
                                    <div key={item._id} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.name}
                                            onChange={(input) => filterSelect(input.checked, item)}
                                            checked={filter.brands.includes(item._id)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__content">
                            <Button size="sm" onClick={clearFilter}>xóa bộ lọc</Button>
                        </div>
                    </div>
                </div>
                <div className="catalog__filter__toggle">
                    <Button size="sm" onClick={() => showHideFilter()}>bộ lọc</Button>
                </div>
                <div className="catalog__content">
                    <Section>
                        <SectionTitle>
                            Danh mục  sản phẩm
                        </SectionTitle>
                        <SectionBody>
                            <Grid
                                col={8}
                                mdCol={4}
                                smCol={4}
                                gap={20}
                            >
                                {
                                    categories.map((item) => (
                                        <div onClick={() => { setActiveCategory(item._id) }}>
                                            <CategoryCard
                                                key={item._id}
                                                item={item}
                                            />
                                        </div>
                                    ))
                                }
                            </Grid>
                        </SectionBody>
                    </Section>

                    <InfinityList
                        products={productFilter}                     
                    />                 
                </div>
            </div>           
        </Helmet>
    )
}

export default Catalog
