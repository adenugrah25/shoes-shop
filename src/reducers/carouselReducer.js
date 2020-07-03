export const carouselReducer = (state = [], action) => { //state = [] = tipe data yg akan diletakkan disini
    switch(action.type) { //filter actionnya
        case 'GET_DATA_CAROUSEL' :
            return action.payload
        default :
            return state
    }
}