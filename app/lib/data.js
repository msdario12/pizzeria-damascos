import dbPizzas from '@/utils/db/mongo-client';

export async function getAllPizzas() {
	// Fetch data from API here
	try {
		const pizzas = await dbPizzas
			.collection('damascos-collection')
			.find({})
			.toArray();
		const result = pizzas.map((pizza) => {
			const newID = pizza._id.toString();
			return { ...pizza, _id: newID };
		});
		return result;
	} catch (e) {
		console.error(e);
	}
}

export async function removeOnePizza(id) {
	try {
		await dbPizzas.collection('damascos-collection').deleteOne({
			_id: id,
		});
		return;
	} catch (e) {
		console.error(e);
	}
}
