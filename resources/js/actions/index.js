import {
    ADD_NEW_BANNER,
    ADD_NEW_RECOMMEND,
    ADD_NEW_POPULAR,
    ADD_NEW_DATA_SIDEBAR,
    ADD_NEW_FILTER_QUERY_PARAM,
    ADD_NEW_SORT_QUERY_PARAM,
    RESET_DATA_FILTER_PAGE,
    ADD_PRODUCT_TO_CART,
    UPDATE_AMOUNT_PRODUCT_CART_BY_ID,
    DELETE_PRODUCT_CART_BY_ID,
    IS_VALID_PRODUCT,
    DELETE_ALL_PRODUCT_CART,
    RELOAD_REVIEW_LIST_BOOK,
    DEFAULT_RELOAD_REVIEW_LIST_BOOK
} from "../const/index";

// Home Page
export const actNewBanner = (content) => {
    return {
        type: ADD_NEW_BANNER,
        content,
    };
};

export const actNewRecommend = (content) => {
    return {
        type: ADD_NEW_RECOMMEND,
        content,
    };
};

export const actNewPopular = (content) => {
    return {
        type: ADD_NEW_POPULAR,
        content,
    };
};

// Product Page
export const actAddNewDataSidebar = (content) => {
    return {
        type: ADD_NEW_DATA_SIDEBAR,
        content,
    }
}

export const actAddNewFilterQueryParam = (content) => {
    return {
        type: ADD_NEW_FILTER_QUERY_PARAM,
        content,
    }
}

export const actAddNewSortQueryParam = (content) => {
    return {
        type: ADD_NEW_SORT_QUERY_PARAM,
        content,
    }
}

export const actResetDataFilterPage = () => {
    return {
        type: RESET_DATA_FILTER_PAGE
    }
}

export const actAddProductToCart = (data) => {
    return {
        type: ADD_PRODUCT_TO_CART,
        data
    }
}

export const actUpdateAmountProductCart = (amount, id) => {
    return {
        type: UPDATE_AMOUNT_PRODUCT_CART_BY_ID,
        amount, id
    }
}

export const actDeleteProductById = (id) => {
    return {
        type: DELETE_PRODUCT_CART_BY_ID,
        id
    }
}

export const actIsValidProductCartById = (id) => {
    return {
        type: IS_VALID_PRODUCT,
        id
    }
}

export const actDeleteAllProductCart = () => {
    return {
        type: DELETE_ALL_PRODUCT_CART
    }
}

export const actReloadReviewList = () => {
    return {
        type: RELOAD_REVIEW_LIST_BOOK
    }
}

export const actSetDefaultReloadReviewList = () => {
    return {
        type: DEFAULT_RELOAD_REVIEW_LIST_BOOK
    }
}
