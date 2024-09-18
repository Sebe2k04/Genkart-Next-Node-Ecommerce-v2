import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="lg:px-20 px-10  ">
      <main className=" min-h-[80vh] flex items-center">
        <div className="grid lg:grid-cols-2">
          <div className="">
            <Image
              src={"/hero1.jpg"}
              width="1000"
              height="1000"
              alt=""
              className="w-[500px] h-auto rounded-xl opacity-100 m-auto"
            />
          </div>
          <div className="my-auto grid gap-5 lg:gap-0 pt-5 lg:pt-0">
            <h1 className="lg:text-5xl text-3xl font-semibold font-sans lg:leading-[60px]">
              Don&apos;t be slow! Our prices are low..!
            </h1>
            <h3>
              Genkart is a ecommerce platform to enhance online shopping
              performance for the customers to provide what they need ?{" "}
            </h3>
            <div className="pt-5">
              <Link
                href={"/product"}
                className="px-5 py-2 rounded-2xl bg-black text-white"
              >
                Explore More
              </Link>
            </div>
          </div>
        </div>
      </main>
      <div className="">
        {/* <p>Genkart is an e-commerce platform that connects local businesses with customers. Our mission is to provide a safe, convenient, and affordable shopping experience for our customers.</p> */}
      </div>
    </div>
  );
};

export default Hero;
