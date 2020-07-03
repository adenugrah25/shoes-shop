export const productReducer = (state = [], action) => { //state = [] = tipe data yg akan diletakkan disini
    switch (action.type) {
        case 'GET_PRODUCTS':
            return action.payload
        default:
            return state
    }
}