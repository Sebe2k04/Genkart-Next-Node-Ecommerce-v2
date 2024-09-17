"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "./Navbar";

const NavbarHandler = () => {
  const path = usePathname();
  return (
    <div>
      {path.startsWith("/admin") ||
      path.startsWith("/login") ||
      path.startsWith("/signup") ||
      path.startsWith("/forgot-password") ||
      path.startsWith("/reset-password") ? (
        ""
      ) : (
        <Navbar />
      )}
    </div>
  );
};

export default NavbarHandler;
