'use client';
import { getItemFromLS} from '@/lib/utils';
import { createContext, useEffect, useState } from 'react';

export const CartData = createContext({});

export const CartContext = ({ children }) => {
	const [cartList, setCartList] = useState([]);
  
	const loadCartFromLocalstorage = () => {
    // get from localstorage
		const localstorageList = getItemFromLS('cart');
    setCartList(localstorageList)
    return localstorageList
	};

  const loadDataToLS = data => {
      localStorage.setItem('cart', JSON.stringify((data)))
  }

	const addOneItemToCart = (id, price, name) => {
    const localList = getItemFromLS('cart')
    
		const foundedItemIndex = localList.findIndex((el) => el.id === id);
    
		if (foundedItemIndex === -1) {
			// Item not found
      const obj = { id, count: 1, price, name }
      localList.push(obj)
      
      loadDataToLS(localList)
      setCartList(localList)
      
			return;
		}
    // Found Item
    let foundItem = localList[foundedItemIndex]
    localList[foundedItemIndex] = {...foundItem, count: foundItem.count + 1 }
    
    loadDataToLS(localList)
    setCartList(localList)
	};

	const removeOneItemFromCart = (id) => {
    const localList = getItemFromLS('cart')
    
		const foundedItemIndex = localList.findIndex((el) => el.id === id);
    
		if (foundedItemIndex === -1) {
			// Item not found
			return;
		}
    
    // Found Item
    let foundItem = localList[foundedItemIndex]
    if (foundItem.count === 0) {
      // Remove if is 1 before try on minus one
      const filteredList = localList.filter( item => item.id !== id)
      loadDataToLS(filteredList)
      setCartList(filteredList)
      return
    }
    localList[foundedItemIndex] = {...foundItem, count: foundItem.count - 1 }
    loadDataToLS(localList)
    setCartList(localList)
    
	};
  

  useEffect(() => {
    const localList = loadCartFromLocalstorage()
    if (!localList) {
      loadDataToLS([])
    }
  },[])


	return (
		<CartData.Provider
			value={{
				cartList,
				setCartList,
				addOneItemToCart,
				removeOneItemFromCart,
        loadCartFromLocalstorage
			}}>
			{children}
		</CartData.Provider>
	);
};

export default CartContext;
