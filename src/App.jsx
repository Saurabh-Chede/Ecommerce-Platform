import "./App.css";
import Cart from "./components/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
