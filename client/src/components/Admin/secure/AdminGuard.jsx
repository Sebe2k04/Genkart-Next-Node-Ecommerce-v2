"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AdminGuard = () => {
  const router = useRouter();
  let adminToken;
  useEffect(() => {
    const checkCookie = async() => {
      adminToken = await document.cookie

      console.log(adminToken);
      if (!adminToken) {
        router.push("/admin");
      }
    };
    checkCookie();
  }, []);
  return <div></div>;
};

export default AdminGuard;
