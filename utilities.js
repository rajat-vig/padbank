module.exports.checkIfAmount = function (amount, pads){
    if(amount)
        return Math.trunc(amount/10);
    return pads;
}

module.exports.getFullName = function (firstname, lastname){
        return (firstname+ " " + lastname)

}