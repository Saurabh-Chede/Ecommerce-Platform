import { SignIn } from "@clerk/clerk-react";

function LoginPage() {
  return (
    <div className="flex justify-center mt-20">
      <SignIn path="/login" routing="path" signUpUrl="/signup" />
    </div>
  );
}

export default LoginPage;
