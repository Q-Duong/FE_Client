import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import { commentAPI } from '../api/api';


function CommentPopup(props) {
    const {token,order, onClose} = props
    const [star, setStar] = useState(5)
    const [content, setContent] = useState('')
    async function handleCreateComment() {
        try {
            const res = await commentAPI.create(token,{star,content,order})
            alert('cảm ơn bạn đã đánh giá')
            onClose()
        } catch (error) {
            alert(error.response.data.message)
        }
    }
    return (
        <div class="h-30 row d-flex justify-content-center">
            <div class="col-lg-8 centered">
                <div class="blog__details__comment">

                    <h4>Đánh giá & nhận xét</h4>

                    <div class="blog__details__evaluate">
                        <div className="row">
                            <div class="col-lg-6 col-md-6">
                                <h5>Mức độ hài lòng của bạn</h5>
                            </div>
                            <div class="col-lg-6 col-md-6">
                                <StarRatings
                                    rating={star}
                                    starRatedColor="#fa8c16"
                                    changeRating={(star) => setStar(star)}
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension="25px"
                                    starSpacing="5px"
                                />
                            </div>
                        </div>
                    </div>
                    <form action="#">
                        <div class="row">

                            <div class="col-lg-12 text-center">
                                <textarea value={content} onChange={(e) => setContent(e.target.value)} class="comment_content"
                                    placeholder="Mời bạn đánh giá về sản phẩm..."></textarea>
                                <Button onClick={handleCreateComment} class="site-btn send-comment">Gửi đánh
                                    giá</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CommentPopup;