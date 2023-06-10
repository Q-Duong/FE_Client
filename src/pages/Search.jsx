import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'react-bootstrap';
import useQuery from '../hooks/useQuery';

import {  productAPI } from '../api/api';
import CheckBox from '../components/CheckBox';
import Helmet from '../components/Helmet'
import InfinityList from '../components/InfinityList'



const Search = () => {
    const searchTerm = useQuery().get('searchTerm')
    const [products, setProducts] = useState([])

    const initFilter = {
        brands: []
    }

    const [productFilter, setProductFilter] = useState([])

    const [filter, setFilter] = useState(initFilter)

    const [brands, setBrands] = useState([])


    const filterSelect = (checked, item) => {
        if (checked) {
            setFilter({ ...filter, brands: [...filter.brands, item._id] })
        }
        else {
            const newBrand = filter.brands.filter(e => e !== item._id)
            setFilter({ ...filter, brands: newBrand })
        }
    }


    const clearFilter = () => setFilter(initFilter)
    const filterRef = useRef(null)

    const showHideFilter = () => filterRef.current.classList.toggle('active')

    useEffect(() => {
        async function getProducts() {
            try {
                const response = await productAPI.search(searchTerm);
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
    }, [searchTerm])

    useEffect(
        () => {
            try {
                let temp = [...products]
                if (filter.brands.length > 0) {
                    temp = temp.filter(e => filter.brands.includes(e.product.brand._id))
                }
                setProductFilter(temp)
            } catch (error) { }
        },
        [filter]
    )

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
                    <InfinityList
                        products={productFilter}
                    />
                </div>
            </div>
        </Helmet>
    )
}

export default Search
