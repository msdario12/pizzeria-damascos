import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function setCartItem(item) {
  return localStorage.setItem("cart", JSON.stringify(item));
}

function checkIfItemExistInLS(id, list) {
  return list.find((el) => el.id === id);
}

export function addOneItemLS(id) {
  const local = localStorage.getItem("cart");
  if (!local) {
    setCartItem([{ id, count: 1 }]);
    return;
  }
  const parseLocal = JSON.parse(local);
  if (!checkIfItemExistInLS(id, parseLocal)) {
    parseLocal.push({ id, count: 1 });
  } else {
    parseLocal.map((item) => {
      if (item.id === id) {
        item.count = item.count + 1;
      }
    });
  }
  console.log(parseLocal);
  setCartItem(parseLocal);
}

export function removeOneItemLS(id) {
  const local = localStorage.getItem("cart");
  if (!local) {
    return;
  }
  const parseLocal = JSON.parse(local);
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
