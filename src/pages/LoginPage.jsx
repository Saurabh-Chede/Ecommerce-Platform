// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { app } from "../firebase";
// import { useEffect } from "react"; 

// function LoginPage() {
//   const navigate = useNavigate();
//   const auth = getAuth(app);

//   const handleLogin = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, provider);
//       console.log("User:", result.user);
//       navigate("/admin"); // redirect to admin if login success
//     } catch (err) {
//       console.error("Login Error:", err);
//     }
//   };

//   useEffect(() => {
//     document.title = "Login";
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h2 className="text-3xl font-bold mb-6">Admin Login</h2>
//       <button
//         onClick={handleLogin}
//         className="bg-blue-600 text-white px-6 py-2 rounded shadow"
//       >
//         Sign in with Google
//       </button>
//     </div>
//   );
// }

// export default LoginPage

// src/pages/LoginPage.jsx
import { SignIn } from "@clerk/clerk-react";

function LoginPage() {
  return (
    <div className="flex justify-center mt-20">
      <SignIn path="/login" routing="path" signUpUrl="/signup" />
    </div>
  );
}

export default LoginPage;
