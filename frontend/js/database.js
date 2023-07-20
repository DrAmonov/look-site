let users = window.localStorage.getItem("users");
let foods = window.localStorage.getItem("foods");
let orders = window.localStorage.getItem("orders");

users = JSON.parse(users) || [
  { userId: 1, username: "ali", contact: "998941024578" },
  { userId: 2, username: "nosir", contact: "998941023697" },
  { userId: 3, username: "aziza", contact: "998941028520" },
];

foods = JSON.parse(foods) || [
  { foodId: 1, foodName: "burger cheese", foodImg: "./img/burger_cheese.jpeg" },
  {
    foodId: 2,
    foodName: "chicken togora",
    foodImg: "./img/chicken_togora.jpeg",
  },
  { foodId: 3, foodName: "chicken wings", foodImg: "./img/chicken_wings.jpeg" },
  { foodId: 4, foodName: "cola", foodImg: "./img/cola.jpeg" },
  { foodId: 5, foodName: "combo", foodImg: "./img/combo.jpeg" },
  { foodId: 6, foodName: "fanta", foodImg: "./img/fanta.jpeg" },
  { foodId: 7, foodName: "spinner", foodImg: "./img/spinner.jpeg" },
];

orders = JSON.parse(orders) || [
  { userId: 1, foodId: 1, count: 2 },
  { userId: 1, foodId: 4, count: 1 },
  { userId: 2, foodId: 7, count: 1 },
  { userId: 3, foodId: 5, count: 1 },
  { userId: 3, foodId: 6, count: 1 },
];
