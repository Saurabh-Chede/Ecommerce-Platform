import { db } from "../firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

// Save user's cart to Firestore
export const saveCartToFirestore = async (userId, cartItems) => {
  const ref = doc(db, "cart", userId);
  await setDoc(ref, {
    items: cartItems,
    updatedAt: serverTimestamp()
  }, { merge: true });
};

// Get user's cart from Firestore
export const getCartFromFirestore = async (userId) => {
  const ref = doc(db, "cart", userId);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data().items || [] : [];
};

