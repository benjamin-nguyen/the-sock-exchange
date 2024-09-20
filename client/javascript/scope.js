// 1. Global scope
let globalVar = "I am global";
let greeting = "Hello World";
let blockVar = "I am inside a block";

function showMessage() {
  console.log(globalVar); // Accessible here
}

showMessage(); // Outputs: I am global
console.log(globalVar); // Also accessible here

// 2. Local scope
function greet() {
    console.log(greeting); // Accessible here
}

greet(); // Outputs: Hello World
console.log(greeting); // Error: greeting is not defined

// 3. Block scope
if (true) {
    console.log(blockVar); // Accessible here
}

console.log(blockVar); // Error: blockVar is not defined outside the block scope