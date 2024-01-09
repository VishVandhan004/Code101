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
function getMilk(bottles) {
  console.log("leaveHouse");
  console.log("moveRight");
  console.log("moveRight");
  console.log("moveUp");
  console.log("moveUp");
  console.log("moveUp");
  console.log("moveUp");
  console.log("moveRight");
  console.log("moveRight");
  console.log("buy " + bottles + " bottles of milk");
  console.log("moveLeft");
  console.log("moveLeft");
  console.log("moveDown");
  console.log("moveDown");
  console.log("moveDown");
  console.log("moveDown");
  console.log("moveLeft");
  console.log("moveLeft");
  console.log("enterHouse");
}
getMilk(20);
function lifeInWeeks(age) {
  var left = 90 - age;
  var leftday = 365 * left;
  var leftweek = 52 * left;
  var leftmonth = 12 * left;
  console.log("You have " + leftday + " days, " + leftweek + " weeks, and " + leftmonth + " months left.");
}
lifeInWeeks(56);

