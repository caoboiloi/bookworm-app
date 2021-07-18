import {combineReducers} from 'redux'
import bannerReducer from './bannerReducer'
import queryReducer from './queryReducer'

export default combineReducers({
    banner: bannerReducer,
    query: queryReducer
})
