"use client";
import { useGlobalContext } from "@/context/GlobalProvider";
import { axiosInstance } from "@/utils/axiosConfig";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SetUserAuth = ({ token, auth }) => {
  const router = useRouter();
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
        fetchUserData();
      } else {
        setUserAuth(false);
      }
    };
    authCheck();
  }, [userAuth]);
  return <div></div>;
};

export default SetUserAuth;
