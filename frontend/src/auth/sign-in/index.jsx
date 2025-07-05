import React from "react";
import { SignIn } from "@clerk/clerk-react";
import Header from "../../components/custom/Header.jsx";

function SignInPage() {
  return (
    <>
      <Header />
      <div className="flex justify-center my-10">
        <SignIn />
      </div>
    </>
  );
}

export default SignInPage;
