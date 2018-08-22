function getByValue(dictionary, index, value) {
    return dictionary.filter(obj => {
        return obj[index] === value;
    })[0];
}

exports.getByValue = getByValue;
