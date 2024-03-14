'use client';

import pizzas from '@/exampleData';
import ProductCard from '../ProductCard/ProductCard';
import useCartList from '@/hooks/useCartList';

export default function ProductList({ data }) {
	const { cartList, setCartList, addOneItemToCart, removeOneItemFromCart } =
		useCartList(data);

	const defineCountOfItemToCart = (id, count, price) => {
		const foundItem = data.find((el) => el.id === id);
		setCartList((prev) => [
			...prev,
			{ id, count, price, name: foundItem.name },
		]);
		setCartList((prev) => prev.filter((el) => el.count > 0));
	};
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
						defineItem={defineCountOfItemToCart}
					/>
				))}
		</div>
	);
}
