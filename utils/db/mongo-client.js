import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const dbPizzas = client.db("damascos-pizzas");
export default dbPizzas;
