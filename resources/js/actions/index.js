import {
    ADD_NEW_BANNER,
    ADD_NEW_QUERY_SEARCH,
    ADD_NEW_RECOMMEND,
    ADD_NEW_POPULAR
} from "../const/index";

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

export const actAddNewQuerySearch = (content) => {
    return {
        type: ADD_NEW_QUERY_SEARCH,
        content,
    }
}
