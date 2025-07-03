import "./App.css";
import Cart from "./components/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
import { CartProvider } from "./context/cartContext";

function App() {

  return (
    <>
    <CartProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
