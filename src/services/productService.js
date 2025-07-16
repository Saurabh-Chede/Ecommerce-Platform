import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const productsRef = collection(db, "products");

export const fetchProducts = async () => {
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addProduct = async (product) => {
  await addDoc(productsRef, product);
};
