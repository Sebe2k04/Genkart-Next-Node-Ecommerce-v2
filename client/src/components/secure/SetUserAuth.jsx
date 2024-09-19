"use client";
import { useGlobalContext } from "@/context/GlobalProvider";
import { axiosInstance } from "@/utils/axiosConfig";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SetUserAuth = ({ token, auth }) => {
  // const router = useRouter();
  console.log("setuserauth",auth)
  const path = usePathname();
  const { userAuth, setUserAuth, userData, setUserData } = useGlobalContext();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axiosInstance.get("/user/me");
        console.log(res.data);
        setUserData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const authCheck = () => {
      if (auth) {
        setUserAuth(auth);
        console.log("token is available");
        if (userData) {
          console.log("user data is available");
        } else {
          fetchUserData();
          console.log("user data is not available");
        }
      } else {
        setUserAuth(false);
        setUserData(null);
      }
    };
    authCheck();
  }, [path,auth]);
  return <div></div>;
};

export default SetUserAuth;
