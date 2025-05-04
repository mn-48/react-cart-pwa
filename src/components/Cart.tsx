import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  qty: number;
}

const products: Product[] = [
  { id: 1, name: "Apple", price: 50 },
  { id: 2, name: "Banana", price: 20 },
];

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛍️ Products</h1>
      {products.map((p) => (
        <div key={p.id} className="flex justify-between items-center mb-2 bg-white p-3 rounded shadow">
          <span>{p.name} - {p.price}৳</span>
          <button
            onClick={() => addToCart(p)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add
          </button>
        </div>
      ))}

      <h2 className="text-xl font-bold mt-6">🛒 Cart</h2>
      {cart.length === 0 && <p>Cart is empty.</p>}
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between items-center bg-gray-100 p-3 rounded my-2">
          <span>{item.name} x {item.qty}</span>
          <div>
            <span className="mr-3">{item.price * item.qty}৳</span>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <h3 className="font-semibold mt-4">
        Total: {cart.reduce((total, item) => total + item.price * item.qty, 0)}৳
      </h3>
    </div>
  );
};

export default Cart;
