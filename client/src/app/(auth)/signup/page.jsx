"use client";
import { axiosInstance } from "@/utils/axiosConfig";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaOpencart, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleShow = () => {
    show === true ? setShow(false) : setShow(true);
  };

  const handleCheck = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      handleSubmit();
    } else {
      toast.warn("Password must be same", {
        autoClose: 3000, // Closes after 3 seconds
      });
    }
  };

  const handleSubmit = async () => {

    try {
      

      const res = await axiosInstance.post("/auth/signup", {
        name,
        email,
        password,
      });
      // console.log(res);
      toast.success("Account created", {
        autoClose: 3000, // Closes after 3 seconds
      });
      router.push('/login')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 lg:p-10 p-2 lg:px-32 min-h-[100vh] w-full">
    <div className="flex gap-2 items-center py-5 px-3">
        <div
          onClick={() => router.push("/")}
          className="flex gap-1 items-center hover:font-semibold cursor-pointer hover:underline underline-offset-4"
        >
          <IoIosArrowBack />
          <h1 className="pt-[3px]">Back to Home</h1>
        </div>
      </div>
      <div className=" grid gap-5 lg:grid-cols-2 bg-white p-5 rounded-2xl min-h-[90vh]">
        <div className="my-auto rounded-2xl">
          <Image
            src="/signup.jpg"
            width="1000"
            height="1000"
            alt=""
            className="w-full max-w-[500px] object-fill m-auto"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className=""></div>
          <div className="flex items-center justify-center ">
            <div className="">
              <h1 className="text-center font-semibold text-2xl">Welcome</h1>
              <form action="" className="grid gap-2 pt-5">
                <div className="grid gap-2">
                  <label htmlFor="" className="font-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    name=""
                    id=""
                    required
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className="px-5 py-2 border border-black/20 rounded-xl  focus:outline-none "
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="" className="font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    name=""
                    id=""
                    required
                    value={email}
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
                      required
                      value={password}
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
                <div className="grid gap-2">
                  <label htmlFor="" className="font-semibold">
                    Confirm Password
                  </label>
                  <div className="flex border border-black/20 rounded-xl pl-2">
                    <input
                      type={show ? "text" : "password"}
                      name=""
                      id=""
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                    value="Sign Up"
                    onClick={handleCheck}
                    className="bg-black text-white p-2 rounded-md min-w-[300px] font-semibold"
                  />
                </div>
                <div className="pt-5">
                  <h1 className="text-gray-400 text-center">
                    Already a User ?{" "}
                    <span className="font-semibold text-black">
                      <Link href={"/login"}>Login</Link>
                    </span>
                  </h1>
                </div>
              </form>
            </div>
          </div>
          <div className="flex justify-end p-2 ">
            <div className="flex items-center gap-3 rounded-xl  px-2 py-3 ">
              <FaOpencart className="text-3xl" />
              <h1 className="text-2xl font-semibold text-center">
                G<span className="text-zinc-500 ">K</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
