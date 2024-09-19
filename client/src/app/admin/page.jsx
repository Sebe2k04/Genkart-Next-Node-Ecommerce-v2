"use client";
import { setCookie } from "@/actions/setCookie";
import { axiosInstance } from "@/utils/axiosConfig";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaOpencart, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleShow = () => {
    show === true ? setShow(false) : setShow(true);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [pop, setPop] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/auth/admin/login", {
        email,
        password,
      });
      // console.log(res.data);
      await setCookie("adminToken", res.data.adminToken);
      router.push("/admin/secure/dashboard");
      toast.success("Logged In Successfully");
    } catch (error) {
      console.error(error);
      // console.log(error.response.data.message);
      toast.error("Issue on Login");
    }
  };

  return (
    <div className="bg-gray-100 lg:p-10 p-2 lg:px-32 min-h-[100vh] w-full">
      <div className=" grid gap-5 lg:grid-cols-2 bg-white p-5 rounded-2xl min-h-[90vh]">
        <div className="flex flex-col justify-between lg:order-1 order-2">
          <div className=""></div>
          <div className="flex items-center justify-center ">
            <div className="">
              <h1 className="text-center font-semibold text-2xl">
                Welcome Sebe
              </h1>
              <h3 className="text-center text-sm text-black/50">Admin</h3>
              <form
                action=""
                className="grid gap-2 pt-5"
                onSubmit={handleSubmit}
              >
                <div className="grid gap-2">
                  <label htmlFor="" className="font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    name=""
                    id=""
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-5 py-2 border border-black/20 rounded-xl  focus:outline-none "
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="" className="font-semibold">
                    Password
                  </label>
                  <div className="flex border border-black/20 rounded-xl pl-2">
                    <input
                      type={show ? "text" : "password"}
                      name=""
                      id=""
                      onChange={(e) => setPassword(e.target.value)}
                      className="px-3 py-2  w-full focus:outline-none "
                    />
                    <div className="w-8 flex items-center">
                      {show ? (
                        <FaRegEyeSlash
                          className=" absolute text-zinc-400 "
                          onClick={handleShow}
                        />
                      ) : (
                        <FaRegEye
                          className=" absolute text-zinc-400 "
                          onClick={handleShow}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <input
                    type="submit"
                    value="Log In"
                    className="bg-black text-white p-2 rounded-md min-w-[300px] font-semibold"
                  />
                </div>
                <div className="pt-5">
                  <h1 className="text-gray-400 text-center">
                    Not a Admin ?{" "}
                    <span className="font-semibold text-black">
                      <Link href={"/"}>Go to Home</Link>
                    </span>
                  </h1>
                </div>
              </form>
            </div>
          </div>
          <div className="flex lg:justify-start justify-end p-2 ">
            <div className="flex items-center gap-3 rounded-xl  px-2 py-3 ">
              <FaOpencart className="text-3xl" />
              <h1 className="text-2xl font-semibold text-center">
                G<span className="text-zinc-500 ">K</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="my-auto rounded-2xl lg:order-2 order-1">
          <Image
            src="/admin.jpg"
            width="1000"
            height="1000"
            alt=""
            className="w-full max-w-[500px] object-fill m-auto"
          />
        </div>
      </div>
    </div>
  );
}
