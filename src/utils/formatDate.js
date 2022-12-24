const formatDate = (date) => {
    if (date) {
        const temp = new Date(date)
        return `0${temp.getDate()}`.slice(-2) + '-' + `0${temp.getMonth() + 1}`.slice(-2) + '-' + temp.getFullYear()
    }
    else
        return "Đang chờ giao hàng"

}

export default formatDate