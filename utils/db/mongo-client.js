import { MongoClient } from 'mongodb';

const dbClient = new MongoClient(process.env.MONGODB_URI);
// const dbPizzas = dbClient.db('damascos-pizzas');
// console.log(dbClient);
console.log('Nuevo paso por mongo-client');
export default dbClient;
