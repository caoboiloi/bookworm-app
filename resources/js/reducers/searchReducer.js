import {
    ADD_NEW_DATA_SIDEBAR,
    ADD_NEW_FILTER_QUERY_PARAM,
    ADD_NEW_SORT_QUERY_PARAM,
    RESET_DATA_FILTER_PAGE } from "../const/index";
import qs from 'query-string';

const searchReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_NEW_DATA_SIDEBAR:
            state.sidebar = {
                categories: action.content.categories,
                authors: action.content.authors,
                stars: action.content.stars
            };
            return state;
        case ADD_NEW_FILTER_QUERY_PARAM:
            state.filterQueryParam = action.content.filter;
            state.mainTitle = action.content.mainTitle;
            return state;
        case ADD_NEW_SORT_QUERY_PARAM:
            state.sortQueryParam = action.content.sort;
            state.sortTitle = action.content.sortTitle;
            state.showTitle = action.content.showTitle
            return state;
        case RESET_DATA_FILTER_PAGE:
            state.sortQueryParam = {
                sort : 'sale',
                show : 20
            };
            state.filterQueryParam = {};
            state.sortTitle = "Sort by on sale";
            state.showTitle = "Show 20";
            state.mainTitle = "";
            return state;
        default:
            state.sortQueryParam = {
                sort : 'sale',
                show : 20
            };
            state.filterQueryParam = {};
            state.mainTitle = "";
            state.sortTitle = "Sort by on sale";
            state.showTitle = 'Show 20',
            state.mainTitle = "";
            state.sidebar = {
                categories: [],
                authors: [],
                stars: []
            };
            return state;
    }
};

export default searchReducer
