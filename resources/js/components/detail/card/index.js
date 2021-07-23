import React from 'react';

class ReviewCard extends React.Component {
    render() {
        const { review } = this.props
        return(
            <div className="card-review my-4">
                <div className="review-title">
                    <span className="review-content-title">
                        <span className="h5"><b>{review.review_title}</b></span>
                    </span>
                    <span className="review-star-title">
                        <span className='mx-2'>|</span>{review.rating_start} star
                    </span>
                </div>
                <div className="review-body my-4">
                    {review.review_details}
                </div>
                <div className="review-date">
                    {review.review_date}
                </div>
                <hr />
            </div>
        )
    }
}

export default ReviewCard;
