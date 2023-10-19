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
import { useEffect, useState } from 'react';
import { InputWithSuggestions } from './InputWithSuggestions';

const URL_GEO_API = 'https://geocode.maps.co/search?';

const directionSchema = Yup.object({
	direction: Yup.string().required(),
	province: Yup.string().required(),
});

export default function DirectionForm() {
	const form = useForm({
		resolver: yupResolver(directionSchema),
		defaultValues: {
			province: 'Tucuman',
			department: 'Capital',
		},
	});
	const [departmentList, setDepartmentList] = useState();
	const [province, setProvince] = useState('Tucuman');
	const [department, setDepartment] = useState('Capital');
	const [directionSuggestions, setDirectionSuggestions] = useState([]);

	function handleSubmit(data) {
		console.log(data);
		const direction = String(data.direction);
		const searchParams = new URLSearchParams();
		searchParams.append(
			'q',
			direction + ' ' + department + ' ' + province + ' ' + 'Argentina'
		);
		fetch(URL_GEO_API + String(searchParams))
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
				setDirectionSuggestions(json);
			});
	}

	function getDepartmentBasedInProvince(province) {
		const URL_API_DEP =
			'https://apis.datos.gob.ar/georef/api/departamentos?provincia=';
		fetch(URL_API_DEP + province + '&orden=nombre')
			.then((res) => res.json())
			.then((json) => {
				const names = json.departamentos.map((el) => {
					return { nombre: el.nombre, id: el.id };
				});
				console.log(names);
				setDepartmentList(names);
			});
	}

	function getDirectionSuggestionsBasedOnText(text) {
		const searchParams = new URLSearchParams();
		searchParams.append(
			'q',
			text + ' ' + department + ' ' + province + ' ' + 'Argentina'
		);
		fetch(URL_GEO_API + String(searchParams))
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
				setDirectionSuggestions(json);
			});
	}

	function handleChangeDirection(e) {
		console.log(e.target.value);
	}

	useEffect(() => {
		if (!province) {
			getDepartmentBasedInProvince('Tucuman');
			return;
		}
		getDepartmentBasedInProvince(province);
	}, [province]);
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
									onValueChange={(e) => {
										field.onChange(e);
										setProvince(e);
									}}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Selecciona' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='Tucuman'>Tucuman</SelectItem>
										<SelectItem value='Jujuy'>Jujuy</SelectItem>
										<SelectItem value='Santiago del Estero'>
											Santiago del estero
										</SelectItem>
									</SelectContent>
								</Select>
								<FormDescription>Seleccione su provincia</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='department'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Departamento</FormLabel>
								<Select
									onValueChange={(e) => {
										field.onChange(e);
										setDepartment(e);
									}}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Selecciona un departamento' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{departmentList && (
											<>
												{departmentList.map((dep) => (
													<SelectItem key={dep.id} value={dep.nombre}>
														{dep.nombre}
													</SelectItem>
												))}
												<SelectItem value='load'>Cargar más</SelectItem>
											</>
										)}
									</SelectContent>
								</Select>
								<FormDescription>
									Seleccione un departamento de la lista
								</FormDescription>
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
									<Input
										placeholder='Ingrese su dirección'
										onChange={(e) => {
											field.onChange(e);
											handleChangeDirection(e);
										}}
										onBlur={(e) => field.onBlur(e)}
										// {...field}
									/>
								</FormControl>
								<FormDescription>
									Seleccione su dirección de la lista
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
