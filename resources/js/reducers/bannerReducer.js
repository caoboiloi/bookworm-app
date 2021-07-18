import { ADD_NEW_BANNER } from "../const/index";

const bannerReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_NEW_BANNER:
            const generateID = new Date().getTime();
            state = [...state, { id: generateID, content: action.content }];
            return state;
        default:
            state = [...state, { content:[] }];
            return state;
    }
};

export default bannerReducer
