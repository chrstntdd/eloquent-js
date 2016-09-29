/*
PROBLEM 1:

The previous chapter introduced the standard function Math.min
that returns its smallest argument. We can do that ourselves now.
Write a function `min` that takes two arguments and returns their
minimum.

PROBLEM 2:

We've seen that % (the remainder operator) can be used to test
wheher a number is even or odd by using `% 2` to check whether
it's divisible by 2. Here's another way to define whether a
positive whole number is even or odd:

  -Zero is even.
  -One is odd.
  -For any other number N, its evenness is the same as N - 2.

  Define a recurisve function `isEven` corresponding to this
desription. The function should accept a number parameter and
return a boolean.
  Test it on 50 and 75. See how it behaves on -1. Why? Can you
think of a way to fix this?

PROBLEM 3:

  You can get the Nth character, or letter, from a string by writing
'string'.charAt(N), similar to how you get it's length with
's'.length. The returned value will be a string containing only one
character (for example, 'b'). The first character has position 0,
which casues the last one to be found at position string.length - 1.
In other words, a two-character string has a length 2, and its
characters have positions 0 and 1.

  Write a function `countBs` that takes a string as its only argument
and returns a number that indicates how many uppercase 'B' characters
are in the string.

Next, write a function called `countChar` that behaves like `countBs`,
except it takes a second argument that indicates the character that is
to be counted (rather than counting only uppercase 'B' characters).
Rewrite `countBs` to make use of this new function.

*/



/* PROBLEM 1 -----------------------------------------------------------

function findMin(num1, num2) {
  if (num1 > num2){
    return num2;
  } else {
    return num1;
  }
}

*/

/* PROBLEM 2 -----------------------------------------------------------

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
    in order to solve the issue with negative integers utilize the Math.abs()
    function to not overload the stack with a negative number that counts
    down infinitely.

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

*/


/* PROBLEM 3 -----------------------------------------------------------

*/
