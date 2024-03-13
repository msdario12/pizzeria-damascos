'use client';
import { createContext, useState } from 'react';

export const CartData = createContext({});

export const CartContext = ({ children }) => {
	const [cartList, setCartList] = useState([]);

	const addOneItemToCart = (id, price, name) => {
		const foundedItemIndex = cartList.findIndex((el) => el.id === id);
		if (foundedItemIndex === -1) {
			// Item not found
			setCartList((prev) => [...prev, { id, count: 1, price, name }]);
			return;
		}
		setCartList((prev) =>
			prev.map((el, index) => {
				if (index === foundedItemIndex) {
					return { ...el, count: el.count + 1 };
				} else {
					return el;
				}
			})
		);
		console.log(cartList);
	};

	const removeOneItemFromCart = (id) => {
		setCartList((prev) =>
			prev.map((el) => {
				if (el.id === id) {
					return { ...el, count: el.count - 1 };
				} else {
					return el;
				}
			})
		);
		setCartList((prev) => prev.filter((el) => el.count > 0));
	};

	return (
		<CartData.Provider
			value={{
				cartList,
				setCartList,
				addOneItemToCart,
				removeOneItemFromCart,
			}}>
			{children}
		</CartData.Provider>
	);
};

export default CartContext;
