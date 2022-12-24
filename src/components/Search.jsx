import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import search from '../assets/images/icon/search-icon.svg';
import { useEffect } from 'react';
import { productModalSlice } from '../redux/product-modal/productModalSlice';
import { productAPI, wareHouseAPI } from '../api/api';
import {ListGroup} from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

function Search(props) {
    const history = useHistory()
    const {onSearchFormShow, showSearchForm, onSearch} = props;
    const [searchTerm, setSearchTerm] = useState();
    const [searchedProducts, setSearchedProducts] = useState([])
    const typingTimeoutRef = useRef(null)
    const inputRef = useRef(null)
    
    function handleSearchFormShow (){
        if(onSearchFormShow) {
            onSearchFormShow();
        }
    }

    function handleSearch(e){
        e.preventDefault()
        if(onSearch){
            const tempSearchTerm = searchTerm
            onSearch(tempSearchTerm);
            setSearchTerm('')
        }
    }

    function handleClickSearchItem(id) {
        history.push(`/product/${id}`)
        handleSearchFormShow()
    }

    useEffect(() => {
        inputRef.current.focus()
    },[showSearchForm])

    useEffect(() => {
        if(typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }

        async function searching() {
            try {
                const res = await wareHouseAPI.search(searchTerm);
                if(res.status === 200) {
                    setSearchedProducts(res.data)
                } else {
                    console.log(res.data.message)
                }
            } catch (error) {
                alert.log(error.response.data.message)
            }
        }
        typingTimeoutRef.current = setTimeout(searching,200)
    },[searchTerm])

    return (
        <div className={showSearchForm ? 'search-model search-display': 'search-model' } >
            <div className="d-flex align-items-center justify-content-center">
                <div className="overlay" onClick={handleSearchFormShow}></div>
                <form onSubmit={(e) => handleSearch(e)} autocomplete="off" className="search-model-form">
                    
                    <div className="input_container">
                        <img src={search} className="input_img"/>
                        <input ref={inputRef} type="text" id="keywords"  name="keywords_submit" placeholder="Tìm kiếm sản phẩm" className="input_search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <div className="search-close-switch" onClick={handleSearchFormShow}>+</div>
                    </div>
                    <div className="search_seggest">
                        <p>GỢI Ý TÌM KIẾM</p>
                        <ListGroup className="search_seggest">
                        {
                            searchedProducts.map(product => (
                                <ListGroup.Item onClick={() => handleClickSearchItem(product._id)}>
                                   <FontAwesomeIcon className='search_icon' icon={faMagnifyingGlass} /> {product.product.name}
                                </ListGroup.Item>
                            ))
                        }
                        </ListGroup> 
                    </div>
                    
                    
                </form>
            </div>
        </div>
    );
}

export default Search;