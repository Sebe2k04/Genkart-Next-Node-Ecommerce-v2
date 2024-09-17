"use client";
import { axiosInstance } from "@/utils/axiosConfig";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { FaOpencart, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-toastify";

export default function Page() {
  
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ResetPassword />
    </Suspense>
  );
}

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");

  const [show, setShow] = useState(false);
  const handleShow = () => {
    show === true ? setShow(false) : setShow(true);
  };
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setToken(searchParams.get("token"));
  }, []);
  console.log(password);
  const handleReset = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const res = await axiosInstance.put("/auth/reset-password", {
          newPassword: password,
          token,
        });
        // console.log(res.data);
        toast.success("Password reset successfully");
        router.push("/login");
      } catch (error) {
        console.error(error);
        toast.error("Error on password reset");
      }
    } else {
      toast.error("Password must be same");
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
        <div className="flex flex-col justify-between lg:order-1 order-2">
          <div className=""></div>
          <div className="flex items-center justify-center ">
            <div className="">
              <h1 className="text-center font-semibold text-2xl">
                Reset Password
              </h1>
              <div className="flex justify-center pt-5">
                <h3 className="max-w-[300px] text-center text-sm ">
                  Enter your password to gain access to your account , Please
                  remember your password from now on !
                </h3>
              </div>
              <form
                action=""
                onSubmit={handleReset}
                className="grid gap-2 pt-5"
              >
                <div className="grid gap-2">
                  <label htmlFor="" className="font-semibold">
                    Password
                  </label>
                  <div className="flex border border-black/20 rounded-xl pl-2">
                    <input
                      type={show ? "text" : "password"}
                      name="password"
                      id="password"
                      required
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
                      name="confirmPassword"
                      id="confirmPassword"
                      required
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

                <div className="pt-2">
                  <input
                    type="submit"
                    value="Set Password"
                    className="bg-black text-white p-2 rounded-md min-w-[300px] font-semibold"
                  />
                </div>
                <div className="pt-5">
                  <h1 className="text-gray-400 text-center">
                    Back to{" "}
                    <span className="font-semibold text-black">
                      <Link href={"/login"}>Login ?</Link>
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
            src="/reset.jpg"
            width="1000"
            height="1000"
            alt=""
            className="w-full max-w-[500px] object-fill m-auto"
          />
        </div>
      </div>
    </div>
  );
};
