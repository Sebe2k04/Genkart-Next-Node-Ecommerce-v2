"use client";
import React, { useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { SiGoogleanalytics } from "react-icons/si";
import { AiOutlineProduct } from "react-icons/ai";
import { BiSolidCategory } from "react-icons/bi";
import { FaBox } from "react-icons/fa6";
import { FaOpencart, FaUser } from "react-icons/fa";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { Drawer } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { Spinner } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/utils/axiosConfig";
import { removeCookie } from "@/actions/removeCookie";

const AdminNavbar = () => {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const routes = [
    {
      path: "/admin/secure/home",
      icon: <GoHomeFill />,
      label: "Home",
    },
    {
      path: "/admin/secure/dashboard",
      icon: <SiGoogleanalytics />,
      label: "Analytics",
    },
    {
      path: "/admin/secure/products",
      icon: <FaBox />,
      label: "Products",
    },
    {
      path: "/admin/secure/users",
      icon: <FaUser />,
      label: "Users",
    },
    {
      path: "/admin/secure/categories",
      icon: <BiSolidCategory />,
      label: "Categories",
    },
    // {
    //   path: "/admin/secure/logout",
    //   icon: <IoLogOutOutline />,
    //   label: "Logout",
    // },
  ];

  // console.log(path);

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post("/auth/admin/logout");
      console.log(res.data);
      removeCookie("adminToken");
      toast.success("Logout successfully");
      router.push("/admin");
    } catch (error) {
      console.error(error);
      toast.error("Unable to Logout");
    }
  };

  return (
    <div className="">
      <section className="lg:hidden">
        <div className="fixed z-[100] w-full bg-white">
          <main className="w-full ">
            <nav className="lg:px-20 px-10">
              <div className=" pt-5 pb-4 grid gap-5">
                <div className="flex justify-between  ">
                  <div className="flex items-center gap-5">
                    <FaOpencart className="text-3xl" />
                    <h1 className="text-2xl font-semibold text-center">
                      G<span className="text-zinc-200 ">K</span>
                    </h1>
                  </div>
                  <div className="lg:flex hidden"></div>

                  <div className="text-2xl lg:hidden">
                    <HiOutlineMenuAlt4 onClick={toggleDrawer(true)} />
                  </div>
                </div>
                <div className="lg:flex hidden justify-start gap-8 px-5 font-semibold"></div>
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
                {routes.map((route, index) => {
                  return (
                    <Link
                      key={index}
                      href={route.path}
                      className={
                        path.startsWith(route.path)
                          ? "flex gap-5 items-center p-2 rounded-md text-black"
                          : "flex gap-5 items-center p-2 rounded-md"
                      }
                    >
                      <div className="text-xl ">{route.icon}</div>
                      <h1 className="">{route.label}</h1>
                    </Link>
                  );
                })}
                <div
                  onClick={handleLogout}
                  className="flex items-center gap-2 p-2 bg-black justify-center rounded-md text-white cursor-pointer"
                >
                  <IoLogOutOutline className="text-2xl" />
                  <h1>Logout</h1>
                </div>
              </div>
            </div>
            <div className="bottom flex align-bottom text-black pb-10 justify-center  pt-10">
              <div className="">
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
      </section>
      <section className="lg:flex hidden w-fit p-2 h-screen sticky top-0 left-0">
        <div className="">
          <div className="w-fit shadow-md h-full rounded-xl">
            <div className="py-10 pl-5 pr-8 text-gray-400 flex flex-col h-full justify-between">
              <div className="grid gap-2">
                {routes.map((route, index) => {
                  return (
                    <Link
                      key={index}
                      href={route.path}
                      className={
                        path.startsWith(route.path)
                          ? "flex gap-5 items-center p-2 rounded-md text-black"
                          : "flex gap-5 items-center p-2 rounded-md"
                      }
                    >
                      <div className="text-xl ">{route.icon}</div>
                      <h1 className="">{route.label}</h1>
                    </Link>
                  );
                })}
                <div
                  onClick={handleLogout}
                  className="flex items-center gap-2 p-2 bg-black justify-center rounded-md text-white cursor-pointer"
                >
                  <IoLogOutOutline className="text-2xl" />
                  <h1>Logout</h1>
                </div>
              </div>
              <div className="flex justify-center items-center gap-2">
                <FaOpencart className="text-3xl" />
                <h1 className="text-2xl font-semibold text-center">
                  G<span className="text-zinc-200 ">K</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminNavbar;
