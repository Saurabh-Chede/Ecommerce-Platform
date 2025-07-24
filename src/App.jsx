import "./App.css";
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
import AutoBuilder from "./components/AutoBuilder";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

  const pizza = new QueryClient()


  return (
    <QueryClientProvider client={pizza}>
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
            <Route path="/autobuilder" element={<AutoBuilder />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ClerkProvider>
    </QueryClientProvider>
  );
}

export default App;

