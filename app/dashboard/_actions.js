'use server';
import dbPizzas from '@/utils/db/mongo-client';
import { ObjectId } from 'mongodb';

export const deletePizzaAction = async ({ id }) => {
	try {
		const query = { _id: new ObjectId(id.toString()) };
		const result = await dbPizzas
			.collection('damascos-collection')
			.deleteOne(query);
		console.log(result);
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
