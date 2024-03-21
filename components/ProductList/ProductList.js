'use client';
import { useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import useCartList from '@/hooks/useCartList';


export default function ProductList({ data }) {
	const { addOneItemToCart, removeOneItemFromCart, loadCartFromLocalstorage } =
		useCartList();

	return (
		<div>
			<h1 className='text-3xl font-bold mb-5'>Lista de variedades</h1>
			{data &&
				data.map((el) => (
					<ProductCard
						key={el._id}
						pizza={el}
						removeItem={removeOneItemFromCart}
						addItem={addOneItemToCart}
					/>
				))}
		</div>
	);
}
