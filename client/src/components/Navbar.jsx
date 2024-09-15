"use client";
import React, { useState } from "react";
import { FaOpencart } from "react-icons/fa";

import { HiOutlineShoppingBag } from "react-icons/hi2";
import Link from "next/link";
import Search from "./Search";
import { Drawer } from "@mui/material";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { usePathname } from "next/navigation";
import { HiOutlineMenuAlt4 } from "react-icons/hi";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
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
                  <HiOutlineShoppingBag className="text-2xl font-semibold" />

                  <div className="relative group">
                    <button className="">
                      <img
                        src="/profile.png"
                        alt=""
                        className="w-10 rounded-full"
                      />
                    </button>
                    <div className="absolute right-0 pt-2 bg-transparent text-gray-400 hidden group-hover:block hover:block">
                      <div className="container bg-white px-5 pt-3 pb-1 w-full shadow-lg rounded-xl ">
                        <div className=" min-w-fit text-sm">
                          <ul>
                            <li className="mb-2 hover:text-black">
                              <Link href="#">Profile</Link>
                            </li>
                            <li className="mb-2 hover:text-black">
                              <Link href="#">Cart</Link>
                            </li>
                            <li className="mb-2 hover:text-black">
                              <Link href="#">Logout</Link>
                            </li>
                          </ul>
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
                            <Link href="#">Casuals</Link>
                          </li>
                          <li className="mb-2 hover:text-black">
                            <Link href="#">T shirts</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <Link href={""}>Trends</Link>
                <Link href={""}>Offers</Link>
              </div>
            </div>
          </nav>
        </main>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <section className="flex flex-col justify-between w-full min-w-[250px] min-h-[100vh] px-10">
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
            <div className="flex  flex-col gap-5  pt-10 text-center">
              <Link href={"/"}>Home</Link>
              <Link href={"/product"}>Explore</Link>
              <div className="relative group">
                <button className="">Categories</button>
                <div className="absolute left-0 pt-5 bg-transparent text-gray-400 hidden group-hover:block hover:block">
                  <div className="container bg-white px-5 pt-3 pb-1 w-full shadow-lg rounded-xl ">
                    <div className=" min-w-fit text-sm">
                      <ul>
                        <li className="mb-2 hover:text-black">
                          <Link href="#">Casuals</Link>
                        </li>
                        <li className="mb-2 hover:text-black">
                          <Link href="#">T shirts</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <Link href={""}>Trends</Link>
              <Link href={""}>Offers</Link>
            </div>
          </div>
          <div className="bottom flex align-bottom text-black pb-10 justify-center  pt-10">
            <div className="">
              <section className="flex gap-5 justify-center items-center pb-5">
                <section className="flex flex-col gap-5 items-center">
                  <button
                    // onClick={handleLogout}
                    className="bg-gray-500 text-white px-4 py-1 rounded-xl"
                  >
                    Logout
                  </button>
                </section>
              </section>
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
