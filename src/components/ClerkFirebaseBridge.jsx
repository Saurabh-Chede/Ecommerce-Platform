import { useAuth } from "@clerk/clerk-react";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { useEffect } from "react";
import { app } from "../firebase"; 

const auth = getAuth(app);

export function ClerkFirebaseBridge() {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    const sync = async () => {
      if (!isSignedIn) return;
      const token = await getToken({ template: "integration_firebase" });
      if (token) {
        await signInWithCustomToken(auth, token);
        console.log("✅ Firebase user signed in");
      }
    };

    sync();
  }, [isSignedIn]);

  return null;
}
