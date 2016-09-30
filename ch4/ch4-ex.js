//PROBLEM 1
function range(start, end) {
    var returnArray = [];
    for (var i = start; i < end + 1; i++) {
        returnArray.push(i);
    }
    return returnArray;
}
console.log(range(1, 10)); //[1,2,3...8,9,10]
function sumArr(inputArray) {
    var totalSum = 0;
    for (var i = 0; i < inputArray.length; i++) {
        totalSum += inputArray[i];
    }
    return totalSum;
}
console.log(sumArr(range(1, 10))); //55
function refinedRange(start, end, increment) {
    var returnArray = [];
    if (start > end && increment < 0) {
        for (var i = start; i > end - 1; i += increment) {
            returnArray.push(i);
        }
    }
    else if (start < end && increment > 0) {
        for (var i = start; i < end + 1; i += increment) {
            returnArray.push(i);
        }
    }
    else {
        throw Error; //improper use of function
    }
    return returnArray;
}
console.log(refinedRange(5, 2, -1)); //5,4,3,2
//# sourceMappingURL=ch4-ex.js.map