import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Pagination from "./Pagination";
import { useCart } from "../context/CartContext";
import Footer from "./Footer";

function Cart({products}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [query, setQuery] = useState("");
  

  // useEffect(() => {
  //   fetch("https://fakestoreapi.com/products")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProducts(data);
  //     })
  //     .catch((err) => console.error("API Error:", err));
  // }, []);


  const filterProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query)
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filterProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filterProducts.length / itemsPerPage);

  const { cart, addToCart, increaseQuantity, decreaseQuantity, totalAmount } = useCart();

  return (
    <>
      {/* <Navbar
        cart={cart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        totalAmount={totalAmount}
      /> */}

      <div className="min-h-screen px-6 sm:px-16 md:px-24 font-sans mb-8">
        {/* <h1 className="text-4xl font-bold mb-6 text-center">Products</h1> */}

        <div className="mb-6 mt-3 flex justify-center">
          <input
            className="py-2 px-4 rounded-md w-full sm:w-96 border border-gray-300"
            placeholder="Search for products..."
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value.toLowerCase());
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paginatedProducts.map((product) => (
           <div key={product.id} className="p-3 hover:shadow-md border border-dotted border-gray-900/25">
             <div className="flex flex-col items-center">
              <Link
                to={`/product/${product.id}`}
                className="bg-white p-5 w-[300px] h-[250px] flex flex-col justify-between text-center"
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
                className="bg-black text-white px-4 py-2  mt-3 w-[200px]"
              >
                Add to Cart
              </button>
            </div>
           </div>
          ))}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      <Footer />
    </>
  );
}

export default Cart;
