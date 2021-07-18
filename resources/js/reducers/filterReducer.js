import { ADD_NEW_BANNER, ADD_NEW_POPULAR, ADD_NEW_RECOMMEND } from "../const/index";

const filterReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_NEW_BANNER:
            state.banner = action.content;
            return state;
        case ADD_NEW_POPULAR:
            state.popular = action.content;
            return state;
        case ADD_NEW_RECOMMEND:
            state.recommend = action.content;
            return state;
        default:
            state = state;
            return state;
    }
};

export default filterReducer
