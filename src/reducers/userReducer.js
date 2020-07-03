
const INITIAL_STATE = {
    id : null,
    username : null,
    email : null,
    role : null,
    password : null,
    cart : []
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'LOG_IN' :
            return {
                ... state,
                id : action.payload.id,
                username : action.payload.username,
                email : action.payload.email,
                role : action.payload.role,
                cart: action.payload.cart,
                password: action.payload.password
            }
        case 'UPDATE_CART' :
            return {
                ...state, cart: action.payload
            }
        case 'LOG_OUT' :
        return INITIAL_STATE
        default : 
        return state
    }
}