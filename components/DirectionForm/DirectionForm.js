import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '../ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const URL_GEO_API = 'https://geocode.maps.co/search?';

const directionSchema = Yup.object({
	direction: Yup.string().required(),
	province: Yup.string().required(),
});

export default function DirectionForm() {
	const form = useForm({
		resolver: yupResolver(directionSchema),
	});

	function handleSubmit(data) {
		// e.preventDefault();
		// const value = e.target.direction.value;
		console.log(data);
		const direction = String(data.direction);
		const searchParams = new URLSearchParams();
		searchParams.append(
			'q',
			direction + ' San Miguel De Tucumán Tucumán Argentina'
		);
		fetch(URL_GEO_API + String(searchParams))
			.then((res) => res.json())
			.then((json) => console.log(json));
	}

	return (
		<section>
			<h2>Datos del domicilio</h2>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className='w-2/3 space-y-6'>
					<FormField
						control={form.control}
						name='province'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Provincia</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Selecciona' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='m@example.com'>m@example.com</SelectItem>
										<SelectItem value='m@google.com'>m@google.com</SelectItem>
										<SelectItem value='m@support.com'>m@support.com</SelectItem>
									</SelectContent>
								</Select>
								<FormDescription>Seleccione su provincia</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='direction'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Dirección</FormLabel>
								<FormControl>
									<Input placeholder='Su direccion' {...field} />
								</FormControl>
								<FormDescription>
									Ingrese la dirección de donde desea recibir el pedido
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit'>Enviar</Button>
				</form>
			</Form>
		</section>
	);
}
