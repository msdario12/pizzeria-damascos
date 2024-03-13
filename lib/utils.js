import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

function setCartItem(item) {
	return localStorage.setItem('cart', JSON.stringify(item));
}

function checkIfItemExistInLS(id, list) {
	return list.find((el) => el.id === id);
}

export function getItemFromLS(key) {
	return JSON.parse(localStorage.getItem(key));
}

export function addOneItemLS(id) {
	const parseLocal = getItemFromLS('cart');
	if (!parseLocal) {
		setCartItem([{ id, count: 1 }]);
		return;
	}
	if (!checkIfItemExistInLS(id, parseLocal)) {
		parseLocal.push({ id, count: 1 });
	} else {
		parseLocal.map((item) => {
			if (item.id === id) {
				item.count = item.count + 1;
			}
		});
	}
	setCartItem(parseLocal);
}

export function removeOneItemLS(id) {
	const parseLocal = getItemFromLS('cart');
	if (!parseLocal) {
		return;
	}
	if (!checkIfItemExistInLS(id, parseLocal)) {
		return;
	} else {
		parseLocal.map((item) => {
			if (item.id === id) {
				item.count = item.count - 1;
			}
		});
	}
	const filterLocal = parseLocal.filter((el) => el.count > 0);
	setCartItem(filterLocal);
}

export const createBase64Img = (file) => {
	return new Promise((res) => {
		const fileReader = new FileReader();
		fileReader.addEventListener('load', (e) => {
			const base64Img = e.target.result;
			res(base64Img);
		});
		const blobImg = new Blob([file], { type: file.type });
		fileReader.readAsDataURL(blobImg);
	});
};

export async function createJSONFromForm(data, e) {
	const { name, description, price } = data;
	const imgFile = e.target.img.files[0];
	const base64Img = await createBase64Img(imgFile);
	const newPizzaItem = { name, description, price, img: String(base64Img) };
	const jsonPizza = JSON.stringify(newPizzaItem);
	return jsonPizza;
}
