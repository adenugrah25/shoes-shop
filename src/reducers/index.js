import { combineReducers } from 'redux'

//import reducers
import { userReducer } from './userReducer'
import { carouselReducer } from './carouselReducer'
import { productReducer } from './productReducer'

//combine all reducers
const Reducers = combineReducers ({
    user : userReducer,
    carousel : carouselReducer,
    product: productReducer
})

export default Reducers

