import React, { useState, useEffect, useRef } from 'react'

import { brandAPI, categoryAPI, productAPI } from '../api/api';
import Helmet from '../components/Helmet'
import CheckBox from '../components/CheckBox'

import Button from '../components/Button'
import InfinityList from '../components/InfinityList'
import ReactPaginate from 'react-paginate'

const Catalog = () => {
    const initFilter = {
        categories: [],
        brands: []
    }

    const [products, setProducts] = useState([])

    const [filter, setFilter] = useState(initFilter)

    const [categories, setCategories] = useState([])

    const [brands, setBrands] = useState([])

    const [pageCount, setPageCount] = useState(0)

    const [activePage, setActivePage] = useState(1)

    useEffect(() => {
        async function getCategories() {
            try {
                const response = await categoryAPI.getAll();
                const categories = response.data.data
                setCategories(categories)
            } catch (error) {
                alert(error.response.data.message)
            }
        }
        getCategories()
    }, [])

    useEffect(() => {
        async function getBrands() {
            try {
                const response = await brandAPI.getAll();
                const brands = response.data.data
                setBrands(brands)
            } catch (error) {
                alert(error.response.data.message)
            }
        }
        getBrands()
    }, [])


    useEffect(() => {
        async function getProducts() {
            try {
                const filterBrands = filter? filter.brands: [];
                const filterCategories = filter? filter.categories: [];
                const queryBrand = filterBrands.length > 0 ? `brandIds[]=${filterBrands.join('&brandIds[]=')}&`: '';
                const queryCategory = filterCategories.length > 0 ? `categoryIds[]=${filterCategories.join('&categoryIds[]=')}&`: '';
                const queryPage = `page=${activePage}`

                const queryParams = queryBrand + queryCategory + queryPage;
                const response = await productAPI.getAll(queryParams);
                setPageCount(response.data.meta.pageCount)
                setProducts(response.data.data)

            } catch (error) {
                alert(error)
            }
        }
        getProducts()
    }, [filter,activePage])

    const handlePageClick = (event) => {
        setActivePage(event.selected);
      };
    


    const filterBrandSelect = (checked, item) => {
        if (checked) {
            setFilter({ ...filter, brands: [...filter.brands, item.id] })
        } else {
            const newBrands = filter.brands.filter(e => e !== item.id)
            setFilter({ ...filter, brands: newBrands })
        }
    }

    const filterCategoySelect = (checked, item) => {
        if (checked) {
            setFilter({ ...filter, categories: [...filter.categories, item.id] })
        } else {
            const newCategories = filter.categories.filter(e => e !== item.id)
            setFilter({ ...filter, categories: newCategories })
        }
    }


    const clearFilter = () => {setFilter(initFilter)}

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
                            Danh mục sản phẩm
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                categories.map((item) => (
                                    <div key={item.id} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.name}
                                            onChange={(input) => filterCategoySelect(input.checked, item)}
                                            checked={filter.categories.includes(item.id)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Hãng
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                brands.map((item) => (
                                    <div key={item.id} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.name}
                                            onChange={(input) => filterBrandSelect(input.checked, item)}
                                            checked={filter.brands.includes(item.id)}
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
                        products={products}                     
                    />                 
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="->"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount? pageCount: 0}
                        previousLabel="<-"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>           
        </Helmet>
    )
}

export default Catalog
