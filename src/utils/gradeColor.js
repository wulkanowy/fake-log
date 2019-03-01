exports.getGradeColorByCategoryName = name => {
    switch (true) {
        case name.includes("czarny"): return "000000";
        case name.includes("czerw"): return "ff0000";
        case name.includes("fiol"): return "800080";
        case name.includes("nieb"): return "0000ff";
        case name.includes("zielony"): return "00ff00";
    }
};
