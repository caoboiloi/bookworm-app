import {
    ADD_NEW_DATA_SIDEBAR,
    ADD_NEW_FILTER_QUERY_PARAM,
    ADD_NEW_SORT_QUERY_PARAM,
    GET_MAIN_TITLE_FILTER_PRODUCT } from "../const/index";
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
            state.title = {
                main: action.content.titleMain
            };
            return state;
        case ADD_NEW_SORT_QUERY_PARAM:
            state.orderbyQueryParam = action.content.sort;
            state.title = {
                sort: action.content.titleSort,
                show: action.content.titleShow
            };
            return state;
        case GET_MAIN_TITLE_FILTER_PRODUCT:
            return state.title.main;
        default:
            state.orderbyQueryParam = {
                sort : 'sale',
                show : 20
            };
            state.title = {
                sort: "Sort by on sale",
                show: 20,
                main: ""
            };
            state.sidebar = {
                categories: [],
                authors: [],
                stars: []
            };
            return state;
    }
};

export default searchReducer
