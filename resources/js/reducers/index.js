import {combineReducers} from 'redux'
import filterReducer from './filterReducer'
import searchReducer from './searchReducer'
import cartReducer from './cartReducer'

export default combineReducers({
    filter: filterReducer,
    search: searchReducer,
    cart: cartReducer
})
