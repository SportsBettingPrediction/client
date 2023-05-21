// Example array of objects
const data = [
  { name: "John", age: 25, salary: 100 },
  { name: "Jane", age: 30, salary: 20 },
  { name: "Bob", age: 35, salary: 30 },
];

// Field to retrieve and sum
const field = "salary";

// Calculate the sum
const sum = data.reduce((accumulator, currentValue) => accumulator + currentValue[field], 0);

console.log(`Sum of ${field}: ${sum}`);

const my_string = "boy, girl, dog, cat";
const splitted = my_string.split(",");
splitted.forEach((element) => console.log(element));
