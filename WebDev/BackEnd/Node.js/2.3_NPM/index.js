// var generateName = require("sillyname"); using CJS
import generateName from "sillyName";  // using ESM

var sillyName = generateName();

console.log(`My name is ${sillyName}.`);

// const superheroes = require("superheroes");
import superheroes from "superheroes";

const name = superheroes.random();
console.log(`I am ${name}!`);
