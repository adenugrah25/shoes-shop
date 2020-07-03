export const getProduct = (data) => {
    return {
        type: 'GET_PRODUCTS', //value type sama kaya di reducer
        payload: data
    }
}