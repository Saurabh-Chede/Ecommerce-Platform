
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, isSignedIn } = useUser();

  if (!isSignedIn) return <Navigate to="/login" />;

 
  const isAdmin = user?.primaryEmailAddress?.emailAddress === "saurabhchede21@gmail.com";

  return isAdmin ? children : <Navigate to="/" />;

};

export default AdminRoute;
