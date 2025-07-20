
// import { db } from "../firebase";
// import { doc, setDoc, getDoc } from "firebase/firestore";

// export const saveCartToFirestore = async (userId, cartItems) => {
//   try {
//     await setDoc(doc(db, "carts", userId), { items: cartItems });
//   } catch (error) {
//     console.error("Error saving cart:", error);
//   }
// };

// export const getCartFromFirestore = async (userId) => {
//   try {
//     const docRef = doc(db, "carts", userId);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       return docSnap.data().items || [];
//     } else {
//       return [];
//     }
//   } catch (error) {
//     console.error("Error fetching cart:", error);
//     return [];
//   }
// };

import { db } from "../firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

// Save user's cart to Firestore
export const saveCartToFirestore = async (userId, cartItems) => {
  const ref = doc(db, "carts", userId);
  await setDoc(ref, {
    items: cartItems,
    updatedAt: serverTimestamp()
  }, { merge: true });
};

// Get user's cart from Firestore
export const getCartFromFirestore = async (userId) => {
  const ref = doc(db, "carts", userId);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data().items || [] : [];
};

