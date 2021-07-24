import {combineReducers} from 'redux'
import filterReducer from './filterReducer'
import searchReducer from './searchReducer'
import cartReducer from './cartReducer'
import reviewReducer from './reviewReducer'

export default combineReducers({
    filter: filterReducer,
    search: searchReducer,
    cart: cartReducer,
    review: reviewReducer
})
