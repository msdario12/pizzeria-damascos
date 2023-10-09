const pizzas = [
  {
    name: "Pizza Margherita",
    description: "A delicious pizza with tomato, mozzarella, and fresh basil.",
    price: 1200,
    img: "https://source.unsplash.com/random/300%C3%97300/?pizza",
  },
  {
    name: "Pizza Pepperoni",
    description: "A pizza with plenty of pepperoni and melted cheese.",
    price: 1300,
    img: "https://source.unsplash.com/random/300%C3%97300/?pizza",
  },
  {
    name: "Pizza Hawaiian",
    description: "A pizza with ham, pineapple, and melted cheese.",
    price: 1400,
    img: "https://source.unsplash.com/random/300%C3%97300/?pizza",
  },
  {
    name: "Vegetarian Pizza",
    description: "A pizza packed with fresh vegetables and cheese.",
    price: 1500,
    img: "https://source.unsplash.com/random/300%C3%97300/?pizza",
  },
  {
    name: "Supreme Pizza",
    description: "A loaded pizza with pepperoni, sausage, peppers, and more.",
    price: 1600,
    img: "https://source.unsplash.com/random/300%C3%97300/?pizza",
  },
  {
    name: "BBQ Chicken Pizza",
    description: "A tasty pizza with BBQ chicken, onions, and barbecue sauce.",
    price: 1700,
    img: "https://source.unsplash.com/random/300%C3%97300/?pizza",
  },
  {
    name: "Mushroom Pizza",
    description:
      "A mushroom lover's dream pizza with assorted mushrooms and cheese.",
    price: 1800,
    img: "https://source.unsplash.com/random/300%C3%97300/?pizza",
  },
  {
    name: "Cheese Pizza",
    description:
      "A classic cheese pizza with a blend of mozzarella and cheddar cheeses.",
    price: 1900,
    img: "https://source.unsplash.com/random/300%C3%97300/?pizza",
  },
];

pizzas.map((pizza, index) => (pizza.id = "ID" + index));

export default pizzas;
