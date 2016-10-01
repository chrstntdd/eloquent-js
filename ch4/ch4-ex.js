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
//PROBLEM 3///////////////////////////////////////////////////////////
function arrayToList(inputArr) {
    var list = null;
    for (var i = inputArr.length; i >= 0; i--) {
        list = { value: inputArr[i], rest: list };
    }
    return list;
}
console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
function listToArray(inputList) {
    var outputArr = [];
    for (var node = inputList; node; node = node.rest) {
        if (node.value == undefined) {
            return outputArr;
        }
        outputArr.push(node.value);
    }
    return outputArr;
}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
function prepend(element, list) {
    var returnElem = {
        value: element,
        rest: list
    };
    return returnElem;
}
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
function nthRecursive(list, num) {
    if (!list) {
        return undefined;
    }
    else if (num === 0) {
        return list.value;
    }
    else {
        return nthRecursive(list.rest, num - 1);
    }
}
console.log(nthRecursive(arrayToList([10, 20, 30]), 1));
// → 20
//PROBLEM 4///////////////////////////////////////////////////////////
function deepEqual(val1, val2) {
    var propsInVal1 = 0;
    var propsInVal2 = 0;
    var prop;
    if (val1 === val2) {
        return true; //for general use cases.
    }
    if (val1 !== null || typeof val1 === "object" ||
        val2 !== null || typeof val2 === "object") {
        //perform deep comparison with two objects.
        for (prop in val1) {
            propsInVal1 += 1;
        }
        for (prop in val2) {
            propsInVal2 += 1;
            if (!(prop in val1) || !deepEqual(val1[prop], val2[prop])) {
                return false;
            }
        }
    }
    else {
        return false;
    }
    return propsInVal1 === propsInVal2;
}
var obj = { here: { is: "an" }, object: 2 };
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, { here: 1, object: 2 }));
// → false
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }));
// → true
