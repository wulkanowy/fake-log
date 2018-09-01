function getByValue(dictionary, index, value) {
    const val = dictionary.filter(obj => {
        return obj[index] === value;
    })[0];

    if (undefined === val) return {};
    return val;
}

exports.getByValue = getByValue;
