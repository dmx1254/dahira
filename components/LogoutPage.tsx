"use client";

import React from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const LogoutPage = () => {
  const logout = async () => {
    await signOut();
  };
  return (
    <Button
      variant="ghost"
      className="flex items-center gap-2 outline-none hover:text-red-500 text-[#7A7C7E]"
      onClick={logout}
    >
      <LogOut />
      <span className="text-sm sm:text-base">Déconnexion</span>
    </Button>
  );
};

export default LogoutPage;
