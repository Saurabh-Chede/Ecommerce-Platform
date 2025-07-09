
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const saveCartToFirestore = async (userId, cartItems) => {
  try {
    await setDoc(doc(db, "carts", userId), { items: cartItems });
  } catch (error) {
    console.error("Error saving cart:", error);
  }
};

export const getCartFromFirestore = async (userId) => {
  try {
    const docRef = doc(db, "carts", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().items || [];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};
