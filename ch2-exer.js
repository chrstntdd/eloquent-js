/*

PROBLEM 1:

Write out a loop that makes seven calls to console.log
to output the following triangle

```

#
##
###
####
#####
######
#######
```

PROBLEM 2:

Write a program that uses console.log to print all
the numbers from 1 to 100 with two exceptions. For
numbers divisible by 3 print 'Fizz' instead of the
number, and for numbers divisible bt 5 (and not 3),
print 'Buzz' instead.

Then, rewrite to print 'FizzBuzz' for numbers that
are divisible by both 3 and 5;


PROBLEM 3:

Write a program that creates a string that represents
an 8 x 8 grid, using new line characters to separate
lines. At each position of the grid there is either a
space or a '#' character. The characters should form
a chess board. Passing this string to console.log
should show something like this:

# # # #
 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #
 # # # #

BONUS:

When you have a program that generates this pattern,
define a variable size = 8 and change the program so
that it works for any size, outputting grid of the
given width and height.

*/



/* PROBLEM 1 --------------------------------------

var triangle = [];
for (var i = 0; i < 7; i++){
  triangle.push('#');
  console.log(triangle.toString());
}

*/




/* PROBLEM 2 --------------------------------------

for (var i=1; i<100; i++){
  if (i % 3 == 0){
    console.log('Fizz');
  } else if (i % 5 == 0){
    console.log('Buzz');
  } else {
    console.log(i);
  }
}


for (var i=1; i<100; i++){
  if (i % 5 == 0 && i % 3 == 0){
    console.log('FizzBuzz');
  } else if (i % 5 == 0){
    console.log('Buzz');
  } else if (i % 3 == 0){
    console.log('Fizz');
  } else {
    console.log(i);
  }
}

*/




/* PROBLEM 3 ------------------------------------

(function chessBoard(){
  console.log('# # # # \n  # # # # \n # # # # \n  # # # # \n # # # # \n  # # # # \n # # # # \n  # # # #');
}());

//Obviously a useless 'program' but it satisfies the output c:

(function flexChessBoard(){
  var size = 8;
  var grid = '';
  var pattern1 = '# # # # \n';
  var pattern2 = ' # # # # \n';
  for (var i = 0; i < size; i ++) {
    if (i % 2 == 0){
      grid+= pattern1;
    } else {
      grid+= pattern2;
    }
  }
  console.log(grid);
}());


*/
