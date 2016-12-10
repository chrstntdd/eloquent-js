//PROBLEM 1

let month = function () {
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return {
        name:   number => { return monthNames[number]; },
        number: name   => { return monthNames.indexOf(name); }
    }
}();

console.log(month.name(2));
// → March
console.log(month.number("November"));
// → 10