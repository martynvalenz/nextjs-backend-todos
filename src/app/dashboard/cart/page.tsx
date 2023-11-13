import { WidgetItem } from "@/components";
import { products, type Product } from "@/products/data/products";
import { ItemCart } from "@/shopping-cart/intex";
import { cookies } from "next/headers";

export const metadata = {
  title: "Shopping Cart",
  description: "Shopping Cart",
};

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart:{[id:string]:number}):ProductInCart[] => {
  const productsInCart:ProductInCart[] = [];
  for (const id of Object.keys(cart)) {
    const product = products.find((product) => product.id === id);
    if(product) {
      productsInCart.push({product, quantity: cart[id]});
    }
  }

  return productsInCart;
}

export default function CartPage() {
  const cookiesStore = cookies();
  const cart = JSON.parse(cookiesStore.get('cart')?.value || '{}') as {[id:string]:number};
  const productsInCart = getProductsInCart(cart);
  const totalToPay = productsInCart.reduce((total, {product, quantity}) => total + product.price * quantity, 0);
  
  return (
    <div>
      <h1 className="text-4xl">Productos en el carrito</h1>
      <hr className="mb-2" />
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {
            productsInCart.map(({product, quantity}) => (
              <ItemCart key={product.id} product={product} quantity={quantity} />
            ))
          }
        </div>
        <div className="flex flex-col w-full sm:w-4/12">
          <WidgetItem title="Total a pagar">
            <div className="flex flex-col text-center">
              <h3 className="text-3xl font-bold text-gray-700 transition-all">${(totalToPay * 1.15).toFixed(2)}</h3>
              <div className="font-bold text-center text-gray-500 transition-all">Impuestos 15%: ${(totalToPay * 0.15).toFixed(2)}</div>
            </div>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
}