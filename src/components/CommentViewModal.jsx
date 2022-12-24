import React from 'react';
import PropTypes from 'prop-types';
import CommentPopup from './CommentPopup';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';



function CommentViewModal(props) {
    const {token, order} = props
    const [active, setActive] = useState(false)

    useEffect(() =>{
        if(token && order && token!='undefined' && order!='')
            setActive(true)
    },[token,order])

    function onClose() {
        setActive(false)
    }
    return (
        <div className={`product-view__modal ${active ? 'active' : ''}`}>
            <div className="product-view__modal__content">
                <CommentPopup token={token} order={order} onClose={onClose}/>
                <div className="product-view__modal__content__close">
                    <Button
                        size="sm"
                        onClick={() => onClose()}
                    >
                        đóng
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CommentViewModal;