
import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner"
import {
  saveCartToFirestore,
  getCartFromFirestore,
} from "../services/cartService";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const { user } = useUser();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hasFetchedCart, setHasFetchedCart] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        const savedCart = await getCartFromFirestore(user.id);
        setCart(savedCart);
        setHasFetchedCart(true);
      }
      setLoading(false);
    };
    fetchCart();
  }, [user]);

  useEffect(() => {
    if (user && hasFetchedCart) {
      saveCartToFirestore(user.id, cart);
    }
  }, [cart, user, hasFetchedCart]);

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
      toast(`${product.title} added to cart`);
    }
  };

  const increaseQuantity = (id) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

  const totalItems = cart?.reduce((acc, item) => acc + item.quantity, 0);

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

  // if (loading) {
  //   return <div className="p-4">Loading cart...</div>;
  // }

  // Return provider
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        totalAmount,
        isCartOpen,
        setIsCartOpen,
        totalItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
