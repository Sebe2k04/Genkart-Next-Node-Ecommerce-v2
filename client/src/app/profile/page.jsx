"use client";

import Loader from "@/components/Loader";
import { useGlobalContext } from "@/context/GlobalProvider";
import { axiosInstance } from "@/utils/axiosConfig";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const { userData, setUserData } = useGlobalContext();

  useEffect(() => {
    const fecthUser = async () => {
      try {
        const res = await axiosInstance.get("/user/me");
        setUserData(res.data);
        // console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fecthUser();
  }, []);

  // console.log(userData);
  return (
    <div className="lg:px-20 px-8 py-10">
      <div className="">
        {userData ? (
          <div className="">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <div className="py-5 grid lg:grid-cols-2 grid-cols-1">
              <div className="">
                <img
                  src={userData.profileImage}
                  alt=""
                  className="mx-auto min-w-[200px] max-w-[300px] rounded-md"
                />
              </div>
              <div className=" lg:pt-0 pt-5">
                <div className="py-3">
                  <h1 className="font-semibold text-xl">Name :</h1>
                  <h1 className="capitalize pt-2">{userData.name}</h1>
                </div>
                <div className="py-3">
                  <h1 className="font-semibold text-xl">Email :</h1>

                  <h1 className="pt-2">{userData.email}</h1>
                </div>
                <div className="py-5">
                  <Link href={"/profile/edit"} className="py-2 px-5 text-white bg-black rounded-md">Edit Profile</Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loader/>
        )}
      </div>
    </div>
  );
}
