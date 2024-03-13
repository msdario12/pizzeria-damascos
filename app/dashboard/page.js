import { DataTable } from './data-table';
import { columns } from './columns';
import { Toaster } from '@/components/ui/toaster';
import AddNewPizza from './components/AddNewPizza';
import { getAllPizzas } from './_actions';

export default async function DashboardPage() {
	const data = await getAllPizzas();
	return (
		<main>
			<h1 className='text-3xl'>Cambia los productos a mostrar al público</h1>
			<AddNewPizza />
			<div className='container mx-auto py-10'>
				<DataTable columns={columns} data={data} />
			</div>
			<Toaster />
		</main>
	);
}
