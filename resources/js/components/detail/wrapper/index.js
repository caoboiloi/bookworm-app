import React from 'react';
import "./style.scss";

import { withRouter } from 'react-router';

import MainTitle from '../title';
import Describe from '../describe';
import Review from '../review';

import { getDetailBookById } from '../../../utils/httpHelper';

class WrapperDetail extends React.Component {
    state = {
        idBook : this.props.match.params.idBook,
        book : null
    }

    componentDidMount() {
        this.fetchDetailBookById(this.state.idBook);
    }

    fetchDetailBookById(id) {
        getDetailBookById(id)
        .then((response) => {
            var data = response.data.book;
            this.setState({
                book : data
            })
        }).catch((error) => console.log(error));
    }
    render() {
        const { book } = this.state;
        return (
            <>
            {book ? (
                <div className="wrapper-detail">
                    <MainTitle category={book.category} />
                    <div className="mx-5">
                        <Describe book={book} />
                        <Review />
                    </div>
                </div>
            ) : (
                <></>
            )}
            </>
        )
    }
}

export default withRouter(WrapperDetail);
