'use client'
import React from "react";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

const FooterHandler = () => {
  const path = usePathname();
  console.log(path,"footer");
  return (
    <div>
      <div>
        {path.startsWith("/admin") ||
        path.startsWith("/login") ||
        path.startsWith("/signup") ||
        path.startsWith("/forgot-password") ||
        path.startsWith("/reset-password") ? (
          ""
        ) : (
          <Footer />
        )}
      </div>
    </div>
  );
};

export default FooterHandler;
