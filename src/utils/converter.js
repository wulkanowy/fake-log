function getDateString(tick) {
    let date;
    if (tick === '' || tick === undefined) {
        date = getMonday(new Date());
    } else {
        date = new Date((tick - 621355968000000000) / 10000);
    }
    return formatDate(date);
}

function formatDate(date) {
    return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
}

function getMonday(date) {
    let day = date.getDate() - date.getDay() + 1;
    return new Date(date.getFullYear(), date.getMonth(), day);
}


module.exports = getDateString;