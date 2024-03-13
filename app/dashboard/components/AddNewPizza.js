'use client';
import NewPizzaForm from './NewPizzaForm';
import { revalidateCache } from '@/lib/actions';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import newPizzaSchema from '@/utils/schemas/newPizzaSchema';
import { createJSONFromForm } from '@/lib/utils';

export default function AddNewPizza() {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState();

	const form = useForm({
		resolver: yupResolver(newPizzaSchema),
		defaultValues: {
			name: '',
			price: '',
			description: '',
			img: '',
		},
	});

	async function handleSubmit(data, e) {
		// const jsonPizza = await createJSONFromForm(data, e);
		setIsLoading(true);
		try {
			const res = await fetch('/api/pizzas', {
				method: 'POST',
				body: data,
			});
			console.log(res);
			if (!res.ok) {
				throw new Error('Failed to submit the data. Please try again.');
			}
			setMessage({
				status: 'ok',
				msg: 'Item creado correctamente',
			});
		} catch (e) {
			console.error(e);
			setMessage({
				status: 'error',
				msg: e,
			});
		} finally {
			setIsLoading(false);
			revalidateCache();
			form.reset();
		}
	}
	return (
		<NewPizzaForm
			handleSubmit={handleSubmit}
			isLoading={isLoading}
			message={message}
			form={form}
		/>
	);
}
