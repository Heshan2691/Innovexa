import React from "react";
import Button from "@/atoms/Button";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-primary p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-brightWhite">HealthTracker</h1>
      <Button variant="secondary">Profile</Button>
    </header>
  );
};

export default Header;
