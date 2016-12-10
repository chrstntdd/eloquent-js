//PROBLEM 1

let month = function () {
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return {
        name:   (number) => { monthNames[number]; },
        number: (name)   => { monthNames.indexOf(name); }
    }
}();

console.log(month.name(2));
// → March
console.log(month.number("November"));
// → 10