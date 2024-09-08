import React from "react";
import { FaOpencart } from "react-icons/fa";

import { HiOutlineShoppingBag } from "react-icons/hi2";
import Link from "next/link";
import Search from "./Search";

const Navbar = () => {
  return (
    <div className="">
      <div className="fixed w-full bg-white">
        <main className="w-full ">
          <nav className="lg:px-20 px-10">
            <div className="border-b pt-5 pb-4 grid gap-5">
              <div className="flex justify-between  ">
                <div className="flex items-center gap-5">
                  <FaOpencart className="text-3xl" />
                  <h1 className="text-2xl font-semibold text-center">
                    G<span className="text-zinc-200 ">K</span>
                  </h1>
                </div>
                <Search />
                <div className="flex gap-8 items-center">
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
              </div>
              <div className="flex justify-start gap-8 px-5 font-semibold">
                <Link href={"/"}>Home</Link>
                <Link href={"/"}>Explore</Link>
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
      <div className="lg:h-[140px]"></div>
    </div>
  );
};

export default Navbar;
