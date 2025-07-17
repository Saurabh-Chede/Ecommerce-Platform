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

import { ClerkProvider } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import AdminDashboard from "./pages/AdminDashboard";
import { fetchProducts, addProduct } from "./services/productService";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./components/Contact";
import AboutPage from "./components/About";
import Layout from "./components/Layout";
import AdminRoute from "./routes/AdminRoute";
import { Toaster } from "@/components/ui/sonner"
import { ClerkFirebaseBridge } from "./components/ClerkFirebaseBridge";
import CheckoutPage from "./components/Checkout";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

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
    <ClerkProvider publishableKey={clerkPubKey}>
       <ClerkFirebaseBridge /> {/* 👈 Add this here */}
      <CartProvider>
        <BrowserRouter>
         <Toaster richColors />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Cart products={products} />} />
              <Route path="/product/:id" element={<ProductDetail products={products} />} />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard onAddProduct={handleAddProduct} />
                  </AdminRoute>
                }
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={
                  <AdminRoute>
                    <AdminDashboard onAddProduct={handleAddProduct} />
                  </AdminRoute>
                }
              />
            </Route>
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ClerkProvider>
  );
}

export default App;

