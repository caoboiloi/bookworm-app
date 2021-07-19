import {combineReducers} from 'redux'
import filterReducer from './filterReducer'
import searchReducer from './searchReducer'

export default combineReducers({
    filter: filterReducer,
    search: searchReducer
})
