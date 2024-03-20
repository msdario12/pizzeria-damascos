'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { addOneItemLS, getItemFromLS, removeOneItemLS } from '@/lib/utils';
export default function ProductCard({
	pizza,
	addItem,
	removeItem,
	defineItem,
}) {
	const [countProduct, setCountProduct] = useState(0);
	if (!pizza) {
		return '';
	}
	useEffect(() => {
		const localItem = getItemFromLS('cart');
		if (localItem) {
			const item = localItem.find((el) => el.id === pizza.id);
			if (item) {
				setCountProduct(item.count);
				defineItem(pizza.id, Number(item.count), Number(pizza.price));
			}
		}
	}, []);
	const handlePlusItem = () => {
		setCountProduct((prev) => prev + 1);
		addOneItemLS(pizza.id);
		addItem(pizza.id, pizza.price, pizza.name);
	};
	const handleMinusItem = () => {
		setCountProduct((prev) => prev - 1);
		if (countProduct < 1) {
			setCountProduct(0);
		}
		removeOneItemLS(pizza.id);
		removeItem(pizza.id);
	};
	const { name, description, price, img } = pizza;
	return (
		<Card className='pt-3 my-4'>
			<CardContent className='flex items-center justify-between gap-x-5'>
				<div className='flex flex-col gap-x-5 justify-between items-center w-40'>
					{img ? <Image src={img} className='w-full object-cover h-24' width={200} height={200} /> : ''}
					<div className='flex gap-x-4  items-center mt-5'>
						<Button onClick={handleMinusItem}>-</Button>
						<span className='font-bold'>{countProduct}</span>
						<Button onClick={handlePlusItem}>+</Button>
					</div>
				</div>
				<div className='text-right'>
					<h2 className='font-semibold text-xl'>{name}</h2>
					<p className='text-sm my-2 hidden sm:block'>{description}</p>
					<span className='text-2xl font-bold'>{'$ ' + price}</span>
				</div>
			</CardContent>
		</Card>
	);
}
