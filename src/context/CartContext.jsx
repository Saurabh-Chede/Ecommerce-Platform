// import { createContext, useContext, useState, } from "react";
// import { useEffect } from "react";
// import toast from "react-hot-toast";
// import { useUser } from "@clerk/clerk-react";
// import {
//   saveCartToFirestore,
//   getCartFromFirestore,
// } from "../services/cartService";

// const CartContext = createContext();
// export const useCart = () => useContext(CartContext);

// export function CartProvider({ children }) {
//   const { user } = useUser();
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const fetchCart = async () => {
//       if (!user) return;
//       const stored = await getCartFromFirestore(user.id);
//       setCart(stored);
//     };
//     fetchCart();
//   }, [user]);


//   useEffect(() => {
//     if (user) saveCartToFirestore(user.id, cart);
//   }, [cart, user]);

//   const addToCart = (product) => {
//     const exists = cart.find((item) => item.id === product.id);
//     if (exists) {
//       const updatedCart = cart.map((item) =>
//         item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//       );
//       setCart(updatedCart);
//     } else {
//       setCart([...cart, { ...product, quantity: 1 }]);
//       toast.success(`${product.title} added to cart`);
//     }
//   };

//   const increaseQuantity = (id) => {
//     const updatedCart = cart.map((item) =>
//       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//     );
//     setCart(updatedCart);
//   };

//   const decreaseQuantity = (id) => {
//     const updatedCart = cart
//       .map((item) =>
//         item.id === id ? { ...item, quantity: item.quantity - 1 } : item
//       )
//       .filter((item) => item.quantity > 0);
//     setCart(updatedCart);

//   };

//   const totalAmount = cart.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   return (
//     <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity, totalAmount }}>
//       {children}
//     </CartContext.Provider>
//   )
// }

import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import {
  saveCartToFirestore,
  getCartFromFirestore,
} from "../services/cartService";

// 1️⃣ Context Setup
const CartContext = createContext();
export const useCart = () => useContext(CartContext);

// 2️⃣ Provider
export function CartProvider({ children }) {
  const { user } = useUser();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 new state to track loading

  // 🔄 Load cart from Firestore on login/refresh
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        const savedCart = await getCartFromFirestore(user.id);
        setCart(savedCart);
      }
      setLoading(false); // ✅ done loading
    };

    fetchCart();
  }, [user]);

  // 💾 Save cart to Firestore on every update
  useEffect(() => {
    if (user && !loading) {
      saveCartToFirestore(user.id, cart);
    }
  }, [cart, user, loading]);

  // Cart actions
  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
      toast.success(`${product.title} added to cart`);
    }
  };

  const increaseQuantity = (id) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

  const decreaseQuantity = (id) =>
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // 3️⃣ Wait for Firestore load before rendering children
  if (loading) {
    return <div className="p-4">Loading cart...</div>; // Or a loader spinner
  }

  // 4️⃣ Return provider
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
