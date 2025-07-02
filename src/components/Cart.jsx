import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Cart() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=6")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  const filterProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query)
  );

  

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
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

  return (
    <>
      <Navbar
        cart={cart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        totalAmount={totalAmount}
      />

      <div className="min-h-screen px-6 sm:px-16 md:px-24 font-sans mb-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Products</h1>


        <div className="mb-6 flex justify-center">
          <input
            className="py-2 px-4 rounded-md w-full sm:w-96 border border-gray-300"
            placeholder="Search for products..."
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filterProducts.map((product) => (
            <div key={product.id} className="flex flex-col items-center">
              <Link
                to={`/product/${product.id}`}
                className="bg-white border shadow p-5 w-[300px] h-[330px] flex flex-col justify-between text-center hover:shadow-md transition"
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
                  <p className="text-gray-700 text-lg">${product.price}</p>
                </div>
              </Link>

              <button
                onClick={() => addToCart(product)}
                className="bg-black text-white px-4 py-2 rounded-md mt-3 w-[200px]"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Cart;
