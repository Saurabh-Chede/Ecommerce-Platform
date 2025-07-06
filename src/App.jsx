import "./App.css";
// import Cart from "./components/Cart";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ProductDetail from "./components/ProductDetail";
// import { CartProvider } from "./context/CartContext";
// import AdminDashboard from "./pages/AdminDashboard";
// import { useState ,useEffect} from "react";

// function App() {
//  const [products, setProducts] = useState(() => {
//     const saved = localStorage.getItem("products");
//     return saved ? JSON.parse(saved) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("products", JSON.stringify(products));
//   }, [products]);

//   const handleAddProduct = (newProduct) => {
//     setProducts((prev) => [...prev, newProduct]);
//   };

//   return (
//     <>
//       <CartProvider>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Cart products={products} />} />
//             <Route path="/product/:id" element={<ProductDetail products={products} />} />
//             <Route
//               path="/admin"
//               element={<AdminDashboard onAddProduct={handleAddProduct} />}
//             />
//           </Routes>
//         </BrowserRouter>
//       </CartProvider>
//     </>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import AdminDashboard from "./pages/AdminDashboard";
import { fetchProducts, addProduct } from "./services/productService";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, []);

  const handleAddProduct = async (newProduct) => {
    await addProduct(newProduct);
    const updated = await fetchProducts();
    setProducts(updated);
  };

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Cart products={products} />} />
          <Route path="/product/:id" element={<ProductDetail products={products} />} />
          <Route path="/admin" element={<AdminDashboard onAddProduct={handleAddProduct} />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

