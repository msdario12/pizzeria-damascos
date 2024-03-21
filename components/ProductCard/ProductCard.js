'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {  useContext, useEffect, useState  } from 'react';
import { CartData } from '@/context/cartContext';


export default function ProductCard({
	pizza,
	addItem,
	removeItem,
}) {
	const [countProduct, setCountProduct] = useState(0);
  const {cartList} =  useContext(CartData)
  
	if (!pizza) {
		return '';
	}

  useEffect(() => {
   const foundedItem = cartList.find(el => el.id === pizza._id) 
    if (foundedItem) {
      setCountProduct(foundedItem.count)
    }
  }, [cartList])
  
	const { name, description, price, img, _id } = pizza;
  
	return (
		<Card className='pt-3 my-4'>
			<CardContent className='flex items-center justify-between gap-x-5'>
				<div className='flex flex-col gap-x-5 justify-between items-center w-40'>
					{img ? <Image src={img} className='w-full object-cover h-24' width={200} height={200} /> : ''}
					<div className='flex gap-x-4  items-center mt-5'>
						<Button onClick={() => removeItem(_id)}>-</Button>
						<span className='font-bold'>{countProduct}</span>
						<Button onClick={() => addItem(_id, price, name)}>+</Button>
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
