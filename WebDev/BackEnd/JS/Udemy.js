var a = 10;
var b = 2;
console.log(a);
console.log(b);
// Strings in JS
var fName = "Angela";
var lname = "yu";
console.log(fName.length);
console.log(fName + " " + lname);
console.log(fName.slice(0, 2));
console.log(fName.toUpperCase());
console.log(fName.toLowerCase());
// Arthimetic Operations in JS
console.log("Arthimetic Operations");
console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b);
// Expressions in JS
var res = 3 * 5 + 2;
console.log(res);
var dog = 5;
var human = (dog - 2) * 4 + 21;
console.log(human)
var c = 9
var d = 10
c++;    //Increment
console.log(c);
c--;
console.log(c); // Decrement
console.log(c += d);
// Functions in JS
function hello() {       // defining a function
  console.log("hello bsdk");
}
hello();   // calling the function
function lifeInWeeks(age) {
  var left = 90 - age;
  var leftday = 365 * left;
  var leftweek = 52 * left;
  var leftmonth = 12 * left;
  console.log("You have " + leftday + " days, " + leftweek + " weeks, and " + leftmonth + " months left.");
}
lifeInWeeks(56);
function getMilk(money) {
  console.log("leaveHouse");
  console.log("moveRight");
  console.log("moveRight");
  console.log("moveUp");
  console.log("moveUp");
  console.log("moveUp");
  console.log("moveUp");
  console.log("moveRight");
  console.log("moveRight");
  var nb = Math.floor(money / 1.5);
  console.log("buy " + nb + " bottles of milk");
  console.log("moveLeft");
  console.log("moveLeft");
  console.log("moveDown");
  console.log("moveDown");
  console.log("moveDown");
  console.log("moveDown");
  console.log("moveLeft");
  console.log("moveLeft");
  console.log("enterHouse");
  return money % 1.5;    // remainder
}
var change = getMilk(10);
console.log(change);
// BMI Calculator
function bmicalc(weight, height) {
  return Math.round(weight / (height * height));
}
console.log(bmicalc(65, 1.7));
// Pseudo Random number generator
var n = Math.random();
n = n * 6; // it considers numbers till 6 (range is 0 and 5, you would never get 6)
n = Math.floor(n) + 1; // here we will get from 1 to 6.
console.log(n);
var age = 29
if (age <= 18) {
  console.log("poi chaduko")
}
if (age > 18 && age < 60) {
  console.log('ayna poi chaduko')
}
else {
  console.log('paduko le inka, em chestav')
}
// difference between === and ==
var q = 1;
var w = '1';
console.log(q === w); // checks datatype
console.log(q == w);  // wtf is datatype??
// Leap Year Challenge
function isleap(year) {
  if (year % 4 == 0) {
    if (year % 100 == 0) {
      if (year % 400 == 0) {
        return "Leap year";
      } else {
        return "Not leap year"
      }
    } else {
      return "Leap year"
    }
  } else {
    return "Not leap year";
  }
}
console.log(isleap(2000));
// Arrays in JS
var glist = ['smith','finch','clarke'];
console.log(glist); // prints everything
console.log(glist.length); // gives the length
console.log(glist[0]);  // gives element by index
console.log(glist.includes('david')); // there or not..
// FIZZBUZZ
let count = 1;
let output = [];
function fizzbuzz(){
  while(count<100){
    if(count%3===0 && count%5===0){
      output.push("FizzBuzz");  // if number divisible by 3,5
    } else if(count%5===0){
      output.push("Buzz");  // if number divisible by 5
    } else if(count%3===0){
      output.push("Fizz");  // if number divisible by 3
    } else {
      output.push(count);
    }
    count++;
  }
  console.log(output);
}
fizzbuzz();
// random name generator
var names = ["Angela", "Ben", "Jenny", "Michael", "Chloe"];
function whosPaying(names) {
  var len = names.length;
  var n = Math.floor(Math.random() * len);
  var random = names[n];
  return random + " is going to buy lunch today.";
}
whosPaying(names);
// Loops in JS
var i = 1;
while(i<5){    // while-loop
  console.log(i);
  i++;
}
// 99 bottles challenge
var numberOfBottles = 99
while (numberOfBottles >= 0) {
    var bottleWord = "bottle";
    if (numberOfBottles === 1) {
        bottleWord = "bottles";
    } 
    console.log(numberOfBottles + " " + bottleWord + " of beer on the wall");
    console.log(numberOfBottles + " " + bottleWord + " of beer,");
    console.log("Take one down, pass it around,");
	numberOfBottles--;
    console.log(numberOfBottles + " " + bottleWord + " of beer on the wall.");
}
for(var i=0;i<2;i++){
  console.log("for loop");
}
// fibonacci challenge
function fibonacciGenerator(n) {
  var fib = [0, 1];
  for (var i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib.slice(0, n);
}