import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

const PrivateAdminRoute = ({children}) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  if (checking) return <p>Checking authentication...</p>;

  // 💡 For demo: simple check with email
  if (!user || user.email !== "saurabhchede21@gmail.com") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateAdminRoute;
