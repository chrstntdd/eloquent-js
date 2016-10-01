//PROBLEM 1 ////////////////////////////////////////////////////////
function findMin(num1, num2) {
    if (num1 > num2) {
        return num2;
    }
    else {
        return num1;
    }
}
console.log(findMin(8, 2)); // 2
console.log(findMin(99, 100)); //99
console.log(findMin(1, 27)); //3
//PROBLEM 2 ////////////////////////////////////////////////////////
function isEven(num) {
    if (Math.abs(num) === 0) {
        return true;
    }
    else if (Math.abs(num) === 1) {
        return false;
    }
    else {
        return isEven(Math.abs(num) - 2);
    }
}
console.log(isEven(50)); //true
console.log(isEven(75)); //false
console.log(isEven(-1)); //false
//in order to solve the issue with negative integers utilize the Math.abs()
//function to not overload the stack with a negative number that counts
//down infinitely.
function isOdd(N) {
    if (N % 2 === 0) {
        return false;
    }
    else {
        return true;
    }
}
console.log(isOdd(50)); //false
console.log(isOdd(75)); //true
console.log(isOdd(-1)); //true
//PROBLEM 3 ////////////////////////////////////////////////////////
function countBs(arg) {
    var bCount = 0;
    for (var i = 0; i < arg.length; i++) {
        if (arg.charAt(i) === 'B') {
            bCount += 1;
        }
    }
    return bCount;
}
console.log(countBs('BUBBLES')); // 3
console.log(countBs('HOBBIES')); // 2
console.log(countBs('Babies')); // 1
function countChar(inputString, inputChar) {
    var charCount = 0;
    for (var i = 0; i < inputString.length; i++) {
        if (inputString.charAt(i) === inputChar) {
            charCount += 1;
        }
    }
    return charCount;
}
console.log(countChar('poop', 'i')); // 0
console.log(countChar('oxygen', 'e')); //1
console.log(countChar('oxalyl chloride', 'o')); //2
