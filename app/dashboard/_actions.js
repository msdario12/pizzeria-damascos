'use server';
import dbPizzas from '@/utils/db/mongo-client';
import { ObjectId } from 'mongodb';

export const deletePizzaAction = async (id) => {
	try {
		const objectId = new ObjectId(id);
		if (objectId.toString() !== id) {
			console.log('Error with id');
			return 'Error with id';
		}
		const query = { _id: new ObjectId(id) };
		const result = await dbPizzas
			.collection('damascos-collection')
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
