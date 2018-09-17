const numbers = [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`];
const filtered1 = numbers.filter(function(num) {
    return num % 2 == 0;
});
const filtered2 = numbers.filter(num => num % 2 == 0);
console.log(filtered1 + ` is a normal function of filter`);
console.log(filtered2 + ` is a arrow function of filter`);
