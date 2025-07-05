import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div
      className="px-5 py-0 flex justify-between  items-center shadow-md dark:bg-gray-800 " style={{ backgroundColor: "#6B21A8" }}
      
    >
      <Link to="/">
        <img src="/logo.png" alt="Nirvana Nihilation" width={70} />
      </Link>
      {isSignedIn ? (
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="outline">Home</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to="/auth/sign-in">
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
