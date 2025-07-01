import { useState } from "react";

const products = [
  { id: 1, product: "Vaseline", price: 100 },
  { id: 2, product: "Gelly", price: 200 },
  { id: 3, product: "Lotion", price: 140 },
];

function Cart() {
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState("");

  const filterProducts = products.filter((product) =>
    product.product.toLowerCase().includes(query)
  );

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  };

  const totalAmount = cart.reduce((acc, item) => (
    acc + item.price * item.quantity
  ), 0)

  return (
    <>
      <input
        placeholder="...serach"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />
      <div className="min-h-screen p-6 bg-gray-100 font-sans">
        <h1 className="text-4xl font-bold mb-6 text-center">🛒 Cart Page</h1>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {filterProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-xl p-5 text-center border hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{product.product}</h2>
              <p className="text-gray-700 mb-4 text-lg">₹{product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Cart Section */}
        <h2 className="text-2xl font-bold mb-4">Cart ({cart.length} items)</h2>

        {cart.length === 0 ? (
          <p className="text-gray-600">Cart is empty</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow border"
              >
                <h3 className="text-lg font-semibold mb-1">{item.product}</h3>
                <p className="text-gray-700 mb-2">Quantity: {item.quantity}</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    -
                  </button>

                  <span className="text-lg font-semibold">{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

        <h3 className="text-xl font-bold mt-4">
          🧾 Total: ₹{totalAmount}
        </h3>
      </div>
    </>
  );
}

export default Cart;
