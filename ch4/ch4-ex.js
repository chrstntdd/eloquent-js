//PROBLEM 1///////////////////////////////////////////////////////////
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
//PROBLEM 2///////////////////////////////////////////////////////////
function reverseArray(arg) {
    var backwardsArray = [];
    for (var i = arg.length; i > 0; i--) {
        backwardsArray.push(arg[i - 1]);
    }
    return backwardsArray;
}
console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
function reverseArrayInPlace(arg) {
    var inputArrLength = arg.length;
    for (var i = inputArrLength; i > 0; i--) {
        arg.push(arg[i - 1]);
    }
    arg.splice(0, inputArrLength);
}
var arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
//# sourceMappingURL=ch4-ex.js.map