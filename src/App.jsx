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
import PrivateAdminRoute from "./components/PrivateAdminRoute";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./components/Dashboard";
import ContactPage from "./components/Contact";
import AboutPage from "./components/About";
import Layout from "./components/Layout"; 

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
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Cart products={products} />} />
          <Route path="/product/:id" element={<ProductDetail products={products} />} />
          <Route
            path="/admin"
            element={
              <PrivateAdminRoute>
                <AdminDashboard onAddProduct={handleAddProduct} />
              </PrivateAdminRoute>
            }
          />
           <Route path="/about" element={<AboutPage />} />
           <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

