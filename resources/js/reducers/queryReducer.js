import { ADD_NEW_QUERY_SEARCH } from "../const/index";
import qs from 'query-string';

const queryReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_NEW_QUERY_SEARCH:
            state = [
                ...state,
                action.content
            ]
            return state;
        default:
            state = '/filter?show=20';
            return state;
    }
};

export default queryReducer
