'use server';
import { createBase64Img } from '@/lib/utils';
import dbClient from '@/utils/db/mongo-client';
import { updatedPizzaSchema } from '@/utils/schemas/newPizzaSchema';
import { ObjectId } from 'mongodb';

const dbName = process.env.DATABASE_NAME;
const collection = process.env.COLLECTION_NAME;

export async function getAllPizzas() {
	// Fetch data from API here
	try {
		const pizzas = await dbClient
			.db(dbName)
			.collection(collection)
			.find({})
			.toArray();
		const result = pizzas.map((pizza) => {
			const newID = String(pizza._id.toString());
			return { ...pizza, _id: newID };
		});
		return result;
	} catch (e) {
		console.error(e);
	}
}

export const getPizzaByIdAction = async (id) => {
	// Fetch data from API here
	try {
		const onePizza = await dbClient
			.db(dbName)
			.collection(collection)
			.findOne({
				_id: new ObjectId(id),
			});
		onePizza._id = String(onePizza._id.toString());
		return onePizza;
	} catch (e) {
		console.error(e);
	}
};

export const deletePizzaAction = async (id) => {
	// Delete pizza by id
	try {
		const objectId = new ObjectId(id);
		if (objectId.toString() !== id) {
			console.log('Error with id');
			return 'Error with id';
		}
		const query = { _id: new ObjectId(id) };
		const result = await dbClient
			.db(dbName)
			.collection(collection)
			.deleteOne(query);
		if (result.deletedCount >= 1) {
			result.ok = true;
			return result;
		} else {
			return 'Error';
		}
	} catch (e) {
		console.error(e);
	}
};

export const editPizzaAction = async (id, body) => {
	let result = {};
	try {
		if (!body.img) {
			const actualPizza = await getPizzaByIdAction(id);
			body.img = actualPizza.img;
		}
		await updatedPizzaSchema.cast(body);
		try {
			await updatedPizzaSchema.validate(body, { abortEarly: false });
		} catch (e) {
			throw new Error('Invalid body');
		}
		const filter = { _id: new ObjectId(id) };
		const updatedDoc = {
			$set: body,
		};
		result = await dbClient
			.db(dbName)
			.collection(collection)
			.findOneAndUpdate(filter, updatedDoc);
		result.ok = true;
		result._id = result._id.toString();
		return result;
	} catch (e) {
		result.ok = false;
		console.error(e);
		return result;
	}
};
