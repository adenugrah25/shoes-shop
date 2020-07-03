export const LogIn = (data) => { //ketika dipanggil, kita ngasih input berupa data
    return {
        type : 'LOG_IN',
        payload : data
    }
}

export const LogOut = () => {
    return {
        type : 'LOG_OUT'
    }
}