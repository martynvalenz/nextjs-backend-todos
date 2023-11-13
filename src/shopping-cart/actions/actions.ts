// 'use client'

import { getCookie, hasCookie, setCookie } from "cookies-next"

/*
cookie:cart
{
  'uuid-123-1':4,
  'uuid-123-2':2,
  'uuid-123-3':1,
}
*/

export const getCookieCart = ():{[id:string]:number} => {
  if(hasCookie('cart')){
    const cookieCart = JSON.parse(getCookie('cart') as string ?? '{}');
    return cookieCart;
  }

  return {};
}

export const addProductToCart = (id:string) => {
  const cookieCart = getCookieCart();
  if(cookieCart[id]){
    cookieCart[id] += 1;
  }else{
    cookieCart[id] = 1;
  }

  setCookie('cart', JSON.stringify(cookieCart));
}

export const removeProductFromCart = (id:string) => {
  const cookieCart = getCookieCart();
  if(cookieCart[id]){
    delete cookieCart[id];
  }

  setCookie('cart', JSON.stringify(cookieCart));
}

export const removeSingleItemFromCart = (id:string) => {
  const cookieCart = getCookieCart();
  if(!cookieCart[id]) return;

  if(cookieCart[id] === 1){
    delete cookieCart[id];
  }
  else{
    cookieCart[id] -= 1;
  }
  setCookie('cart', JSON.stringify(cookieCart));
}