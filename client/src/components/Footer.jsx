import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin } from 'react-icons/fa'
const Footer = () => {
  return (
    <div className="bg-black text-white mt-10 lg:px-20 px-8 py-5 pt-10">
      <div className="grid lg:grid-cols-8 gap-8">
        <div className="col-span-3 ">
          <h1 className="text-2xl font-semibold">Genkart</h1>
          <h1 className="text-sm pt-2 text-justify">
            Product of Genrio . Shop the best casuals and t-shirts at Genkart.
            Latest fashion trends in comfortable clothing. It&apos;s a own
            project of{" "}
            <span className="font-semibold">
              <Link href={"https://sebe2k04.vercel.app/"}>Sebe</Link>
            </span>{" "}
            to showcase his skills throughout the world
          </h1>
        </div>
        <div className="col-span-2">
          <h1 className="text-xl font-semibold">Navigation</h1>
          <div className="grid gap-1 text-sm lg:grid-cols-2 pt-3 ">
            <Link className="hover:font-semibold duration-200" href={"/"}>Home</Link>
            <Link className="hover:font-semibold duration-200" href={"/product"}>Explore</Link>
            <Link className="hover:font-semibold duration-200" href="/categories/casuals">Casuals</Link>
            <Link className="hover:font-semibold duration-200" href="/categories/tshirts">T shirts</Link>
            <Link className="hover:font-semibold duration-200" href={"/trend"}>Trends</Link>
            <Link className="hover:font-semibold duration-200" href={"/offer"}>Offers</Link>
          </div>
        </div>
        <div className="col-span-3">
        <h1 className="text-xl font-semibold">Codebase</h1>
        <h3 className="text-justify text-sm">I provide entire codebase in github . Feel free to use and provide suggestions and issues on github . I provide contact information on the bootom of the page</h3>
          <div className="grid gap-1 text-sm grid-cols-2 pt-3">
            <Link className="hover:font-semibold duration-200" href={"https://github.com/Sebe2k04/Genkart-Next-Node-Ecommerce-v2"}>Codebase Link</Link>
          </div>
        </div>
      </div>
      <div className="">
      <div className="flex justify-center capitalize py-10 text-gray-400">
        <div className="">
          <h1 className="text-center">
            A product by{" "}
            <span>
              <Link
                href={"https://sebe2k04.vercel.app/"}
                about="_blank"
                className="px-1 text-white font-semibold "
              >
                {" "}
                Sebe{" "}
              </Link>
            </span>{" "}
            | GenRio
          </h1>
          <div className="flex justify-center gap-5 text-white text-2xl pt-5">
            <Link href={"https://www.linkedin.com/in/sebe2k04/"}>
              <FaLinkedin />
            </Link>
            <Link href={"https://github.com/Sebe2k04"}>
              <FaGithub />
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Footer;
