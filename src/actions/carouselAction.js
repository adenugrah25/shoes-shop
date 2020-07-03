//masukin data ke Redux 
export const getDataCarousel = (data) => {
    return {
        type : 'GET_DATA_CAROUSEL',
        payload : data //payload tempat menyimpan data
    }
}