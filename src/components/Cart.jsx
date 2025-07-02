import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

function Cart() {
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=10")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error("API Error:", err));
  });

  const filterProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query)
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

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <input
        placeholder="...serach"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />
      <div className="min-h-screen p-6 font-sans">
        <h1 className="text-4xl font-bold mb-6 text-center">Cart Page</h1>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {filterProducts.map((product) => (
            <div className="flex flex-col">
              <Link to={`/product/${product.id}`}>
                <div
                  key={product.id}
                  className="bg-white shadow-md p-5 w-full h-[330px] flex flex-col justify-between text-center hover:shadow-sm transition"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-32 mx-auto mb-3 object-contain"
                  />

                  <div className="flex-1">
                    <h2 className="text-md font-semibold mb-2 line-clamp-2">
                      {product.title}
                    </h2>
                    <p className="text-gray-700 mb-3 text-lg">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </Link>
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mt-auto"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Cart Section */}
        
        <CartItem
          cart={cart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          totalItems={totalItems}
          totalAmount={totalAmount}
        />
      </div>
    </>
  );
}

export default Cart;
