function getDateFromTick(tick) {
    if (tick === '' || tick === undefined) {
        return getMonday(new Date());
    }

    return new Date((tick - 621355968000000000) / 10000);
}

function formatDate(date) {
    return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
}

function getMonday(date) {
    let day = date.getDate() - date.getDay() + 1;
    return new Date(date.getFullYear(), date.getMonth(), day);
}

function getDayName(dateStr)
{
    return new Date(dateStr).toLocaleDateString("pl", { weekday: "long" });
}

function getWeekDaysFrom(tick) {
    let startDate = getDateFromTick(tick);

    const days = [];
    for(let i = 0; i < 5; i++) {
        let date = new Date(startDate).setDate(startDate.getDate() + i);
        days.push([
            getDayName(date),
            formatDate(new Date(date))
        ]);
    }

    return days;
}

exports.getDateString = getDateFromTick;
exports.getWeekDaysFrom = getWeekDaysFrom;
