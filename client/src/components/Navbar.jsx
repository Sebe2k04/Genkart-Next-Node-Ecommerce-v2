"use client";
import React, { useEffect, useState } from "react";
import { FaOpencart } from "react-icons/fa";

import { HiOutlineShoppingBag } from "react-icons/hi2";
import Link from "next/link";
import Search from "./Search";
import { Drawer } from "@mui/material";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { useGlobalContext } from "@/context/GlobalProvider";
import { axiosInstance } from "@/utils/axiosConfig";
import { toast } from "react-toastify";
import { removeCookie } from "@/actions/removeCookie";

const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const path = usePathname();

  const [userNav, setUserNav] = useState(false);
  const { userAuth, setUserAuth, userData, setUserData } = useGlobalContext();
  useEffect(() => {
    if (userData) {
      setUserNav(true);
    } else {
      setUserNav(false);
    }
  }, [userData,userAuth]);


  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      // console.log(res.data);
      await removeCookie("token");
      setUserData(null);
      setUserAuth(false);
      toast.success("Logout Successfully");
      if (path === "/") {
        console.log("homepage no route set")
        setUserData("");
        location.reload();

      } else {
        // router.reload();
        setUserData("")
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to logout");
    }
  };

  return (
    <div className="">
      <div className="fixed w-full bg-white z-[100]">
        <main className="w-full ">
          <nav className="lg:px-20 px-10">
            <div className="border-b pt-5 pb-4 grid gap-5">
              <div className="flex justify-between  ">
                <div className="flex items-center gap-5">
                  <FaOpencart className="text-3xl" />
                  <h1 className="text-2xl font-semibold text-center">
                    G<span className=" text-gray-300 ">K</span>
                  </h1>
                </div>
                <div className="lg:flex hidden">
                  <Search />
                </div>
                <div className="lg:flex hidden gap-8 items-center">
                  <Link href={"/cart"}>
                    <HiOutlineShoppingBag className="text-2xl font-semibold" />
                  </Link>
                  <div className="relative group">
                    <button className="">
                      {userData ? (
                        <img
                          src={userData.profileImage}
                          alt=""
                          className="w-10 rounded-full"
                        />
                      ) : (
                        <img
                          src="/profile.png"
                          alt=""
                          className="w-10 rounded-full"
                        />
                      )}
                    </button>
                    <div className="absolute right-0 pt-2 bg-transparent text-gray-400 hidden group-hover:block hover:block">
                      <div className="container bg-white px-5 pt-3 pb-1 w-full shadow-lg rounded-xl ">
                        <div className=" min-w-fit text-sm">
                          {userNav ? (
                            <ul>
                              <li className="mb-2 hover:text-black">
                                <Link href="/profile">Profile</Link>
                              </li>
                              <li className="mb-2 hover:text-black">
                                <Link href="/cart">Cart</Link>
                              </li>
                              <li className="mb-2 hover:text-black cursor-pointer">
                                <h1 onClick={handleLogout}>Logout</h1>
                              </li>
                            </ul>
                          ) : (
                            <ul>
                              <li className="mb-2 hover:text-black">
                                <Link href="/login">Login</Link>
                              </li>
                              <li className="mb-2 hover:text-black">
                                <Link href="/signup">SignUp</Link>
                              </li>
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-2xl lg:hidden">
                  <HiOutlineMenuAlt4 onClick={toggleDrawer(true)} />
                </div>
              </div>
              <div className="lg:flex hidden justify-start gap-8 px-5 font-semibold">
                <Link href={"/"}>Home</Link>
                <Link href={"/product"}>Explore</Link>
                <div className="relative group">
                  <button className="">Categories</button>
                  <div className="absolute left-0 pt-5 bg-transparent text-gray-400 hidden group-hover:block hover:block">
                    <div className="container bg-white px-5 pt-3 pb-1 w-full shadow-lg rounded-xl ">
                      <div className=" min-w-fit text-sm">
                        <ul>
                          <li className="mb-2 hover:text-black">
                            <Link href="/categories/casuals">Casuals</Link>
                          </li>
                          <li className="mb-2 hover:text-black">
                            <Link href="/categories/tshirts">T shirts</Link>
                          </li>
                          <li className="mb-2 hover:text-black">
                            <Link href="/categories/">All&nbsp;Categories</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <Link href={"/trend"}>Trends</Link>
                <Link href={"/offer"}>Offers</Link>
              </div>
            </div>
          </nav>
        </main>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <section className="flex flex-col justify-between w-full min-w-[150px] h-[100vh] px-10">
          <div className="">
            <div className="flex justify-end pt-10">
              <IoMdClose className="text-4xl" onClick={toggleDrawer(false)} />
            </div>
            <div className="flex justify-center pt-10 font-bold text-2xl ec tracking-[5px]">
              <h1>Menu</h1>
            </div>
            {/* <section className="flex items-center pt-10">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="What are you looking for?"
                  className="bg-zinc-100/30 border-2 px-1 py-2 rounded-xl min-w-[250px] head pr-[50px] pl-5 focus:outline-none"
                />
                <IoSearch className="text-3xl text-zinc-400 ml-[-40px] border-l pl-2 bg-zinc-100/30" />
              </section> */}
            <div className="flex  flex-col gap-5  pt-10 ">
              <Link onClick={() => setOpen(false)} href={"/"}>
                Home
              </Link>
              <Link onClick={() => setOpen(false)} href={"/product"}>
                Explore
              </Link>
              <div className="relative group">
                <button className="">Categories</button>
                <div className="absolute left-0 pt-5 bg-transparent text-gray-400 hidden group-hover:block hover:block">
                  <div className="container bg-white px-5 pt-3 pb-1 w-full shadow-lg rounded-xl ">
                    <div className=" min-w-fit text-sm">
                      <ul>
                        <li className="mb-2 hover:text-black">
                          <Link
                            onClick={() => setOpen(false)}
                            href="/categories/casuals"
                          >
                            Casuals
                          </Link>
                        </li>
                        <li className="mb-2 hover:text-black">
                          <Link
                            onClick={() => setOpen(false)}
                            href="/categories/tshirts"
                          >
                            T shirts
                          </Link>
                        </li>
                        <li className="mb-2 hover:text-black">
                          <Link
                            onClick={() => setOpen(false)}
                            href="/categories/"
                          >
                            All&nbsp;Categories
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <Link href={"/trend"}>Trends</Link>
              <Link href={"/offer"}>Offers</Link>
            </div>
          </div>
          <div className="bottom flex align-bottom text-black pb-10 justify-center  pt-10">
            <div className="">
              {userNav ? (
                <section className="grid gap-4">
                  <div className="flex ">
                    <Link href={"/cart"}>Cart</Link>
                  </div>
                  <div className="flex ">
                    <Link href={"/profile"}>Profile</Link>
                  </div>
                  <section className="flex  pb-5">
                    <button
                      onClick={handleLogout}
                      className="bg-black text-white px-4 py-1 rounded-xl"
                    >
                      Logout
                    </button>
                  </section>
                </section>
              ) : (
                <section className="grid gap-4">
                  <div className="flex justify-center">
                    <Link href={"/signup"}>Signup</Link>
                  </div>
                  <section className="flex justify-center pb-5">
                    <Link
                      href={"/login"}
                      className="bg-black text-white px-4 py-1 rounded-xl"
                    >
                      LogIn
                    </Link>
                  </section>
                </section>
              )}
              <div className="flex items-center gap-5">
                <FaOpencart className="text-3xl" />
                <h1 className="text-2xl font-semibold text-center">
                  G<span className="text-zinc-400 "> K</span>
                </h1>
              </div>
            </div>
          </div>
        </section>
      </Drawer>
      <div className="lg:h-[140px] h-[70px]  w-full"></div>
    </div>
  );
};

export default Navbar;
