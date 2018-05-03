const WEEK_TICK = 6048000000000;

function getDateFromTick(tick) {
    if (tick === '' || tick === undefined) {
        return getMonday(new Date());
    }

    return new Date((tick - 621355968000000000) / 10000);
}

function getTickFromDate(date) {
    return (date.getTime() * 10000) + 621355968000000000;
}

function formatDate(today) {
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!

    let yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    return dd + '.' + mm + '.' + yyyy;
}

function getMonday(date) {
    let day = date.getDate() - date.getDay() + 1;
    return new Date(date.getFullYear(), date.getMonth(), day);
}

function getDayName(dateStr) {
    return new Date(dateStr).toLocaleDateString("pl", {weekday: "long"});
}

function getWeekDaysFrom(tick) {
    let startDate = getDateFromTick(tick);

    const days = [];
    for (let i = 0; i < 5; i++) {
        let date = new Date(startDate).setDate(startDate.getDate() + i);
        days.push([
            getDayName(date),
            formatDate(new Date(date))
        ]);
    }

    return days;
}

function getPrevTick(tick) {
    tick = tick ? tick : getTickFromDate(new Date());
    return parseInt(tick) - WEEK_TICK;
}

function getNextTick(tick) {
    tick = tick ? tick : getTickFromDate(new Date());
    return parseInt(tick) + WEEK_TICK;
}

exports.getDateString = getDateFromTick;
exports.getWeekDaysFrom = getWeekDaysFrom;
exports.getPrevTick = getPrevTick;
exports.getNextTick = getNextTick;
