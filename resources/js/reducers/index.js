import {combineReducers} from 'redux'
import filterReducer from './filterReducer'
import queryReducer from './queryReducer'

export default combineReducers({
    filter: filterReducer,
    query: queryReducer
})
