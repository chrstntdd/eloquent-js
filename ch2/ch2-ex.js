//PROBLEM 1
var triangle = [];
for (var i = 0; i < 7; i++) {
    triangle.push('#');
    console.log(triangle.toString());
}
//PROBLEM 2
for (var i = 1; i < 100; i++) {
    if (i % 3 == 0) {
        console.log('Fizz');
    }
    else if (i % 5 == 0) {
        console.log('Buzz');
    }
    else {
        console.log(i);
    }
}
for (var i = 1; i < 100; i++) {
    if (i % 5 == 0 && i % 3 == 0) {
        console.log('FizzBuzz');
    }
    else if (i % 5 == 0) {
        console.log('Buzz');
    }
    else if (i % 3 == 0) {
        console.log('Fizz');
    }
    else {
        console.log(i);
    }
}
//PROBLEM 3
(function chessBoard() {
    console.log('# # # # \n  # # # # \n # # # # \n  # # # # \n # # # # \n  # # # # \n # # # # \n  # # # #');
}());
//Obviously a useless 'program' but it satisfies the output c:
(function flexChessBoard() {
    var size = 8;
    var grid = '';
    var pattern1 = '# # # # \n';
    var pattern2 = ' # # # # \n';
    for (var i = 0; i < size; i++) {
        if (i % 2 == 0) {
            grid += pattern1;
        }
        else {
            grid += pattern2;
        }
    }
    console.log(grid);
}());
//# sourceMappingURL=ch2-ex.js.map