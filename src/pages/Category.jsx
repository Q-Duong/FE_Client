import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { wareHouseAPI } from '../api/api';
import CheckBox from '../components/CheckBox';
import Helmet from '../components/Helmet'
import InfinityList from '../components/InfinityList'



const Catogory = () => {
    const { id } = useParams();
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
                const response = await wareHouseAPI.getByCategoryId(id);
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
    }, [id])

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
        <Helmet title="S???n ph???m">
            <div className="catalog">
                <div className="catalog__filter" ref={filterRef}>
                    <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                        <i className="bx bx-left-arrow-alt"></i>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            H??ng
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
                            <Button size="sm" onClick={clearFilter}>x??a b??? l???c</Button>
                        </div>
                    </div>
                </div>
                <div className="catalog__filter__toggle">
                    <Button size="sm" onClick={() => showHideFilter()}>b??? l???c</Button>
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

export default Catogory
