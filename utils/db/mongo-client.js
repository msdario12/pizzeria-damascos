import { MongoClient } from 'mongodb';

const dbClient = new MongoClient(process.env.MONGODB_URI);
// const dbPizzas = dbClient.db('damascos-pizzas');

export default dbClient;
