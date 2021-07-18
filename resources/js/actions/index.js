import { ADD_NEW_BANNER } from "../const/index";
import { ADD_NEW_QUERY_SEARCH } from "../const/index";

export const actNewBanner = (content) => {
    return {
        type: ADD_NEW_BANNER,
        content,
    };
};

export const actAddNewQuerySearch = (content) => {
    return {
        type: ADD_NEW_QUERY_SEARCH,
        content,
    }
}
