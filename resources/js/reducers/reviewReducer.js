import {
    RELOAD_REVIEW_LIST_BOOK,
    DEFAULT_RELOAD_REVIEW_LIST_BOOK } from "../const/index";

const reviewReducer = (state = [], action) => {
    switch (action.type) {
        case RELOAD_REVIEW_LIST_BOOK:
            return {
                isReload : true
            }
        case DEFAULT_RELOAD_REVIEW_LIST_BOOK:
            return {
                isReload : false
            }
        default:
            return {
                isReload : false
            };
    }
}

export default reviewReducer
