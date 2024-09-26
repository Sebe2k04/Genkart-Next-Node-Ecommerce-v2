"use client";

import { axiosInstance } from "@/utils/axiosConfig";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { GiShoppingCart } from "react-icons/gi";
import { BiSolidOffer } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import Loader from "@/components/Loader";
import Image from "next/image";
import SmallFooter from "@/components/SmallFooter";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function Page() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState("");
  const {userData} = useGlobalContext();

  const handleCart = async (pid) => {
    if(userData){
      try {
        const res = await axiosInstance.post("/cart", {
          productId: pid,
          quantity: 1,
        });
        // console.log(res.data);
        toast.success("Product added to Cart");
      } catch (error) {
        console.log(error);
        toast.error("Error adding to Cart");
      }
    }
    else{
      toast.error("Login required");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/product/${id}`);
        // console.log(res.data);
        setProduct(res.data);
        setCurrentImage(res.data.image);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching product");
      }
    };
    fetchProduct();
  }, []);

  return (
    <div className="lg:px-20 px-8 pt-5 pb-10">
      <div className="flex gap-2 items-center">
        <div
          onClick={() => router.back()}
          className="flex gap-1 items-center hover:font-semibold cursor-pointer hover:underline underline-offset-4"
        >
          <IoIosArrowBack />
          <h1 className="pt-[3px]">Back</h1>
        </div>
      </div>
      {product ? (
        <div className="pt-5">
          <div className="grid lg:grid-cols-2 gap-5 ">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div className="md:order-1 order-2 grid md:grid-cols-1 place-items-start grid-cols-3 md:grid-rows-4 gap-5 py-2 ">
                {product?.additionalImages.map((image, index) => (
                  <div
                    onClick={() => setCurrentImage(image)}
                    key={index}
                    className="mx-auto max-w-[100px] max-h-[100px] relative"
                  >
                    <Image
                      src={image}
                      width="500"
                      height="500"
                      alt="product image"
                      priority={false}
                      placeholder="blur"
                      blurDataURL={image}
                      className="rounded-md max-w-[100px] max-h-[100px] aspect-square mx-auto object-cover "
                    />
                  </div>
                ))}
                {/* <img
                  src={product.image}
                  onClick={() => setCurrentImage(product.image)}
                  alt=""
                  className="rounded-md mx-auto object-cover max-h-[100px] max-w-[100px] aspect-square"
                /> */}
                <Image
                  src={product.image}
                  width="500"
                  height="500"
                  onClick={() => setCurrentImage(product.image)}
                  alt="product image"
                  priority={false}
                  placeholder="blur"
                  blurDataURL={product.image}
                  className="rounded-md mx-auto object-cover max-h-[100px] max-w-[100px] aspect-square"
                />
              </div>
              <div className="md:col-span-3 lg:order-2 order-1">
                {/* <img
                  src={currentImage}
                  alt=""
                  className="rounded-md w-full max-h-[400px] lg:max-h-full lg:w-full object-cover duration-200 "
                /> */}

                <Image
                  src={currentImage}
                  width="500"
                  height="500"
                  alt="product image"
                  priority={false}
                  placeholder="blur"
                  blurDataURL={currentImage}
                  className="rounded-md w-full max-h-[400px] lg:max-h-full lg:w-full object-cover duration-200 "
                />
              </div>
            </div>
            <div className="pt-5 flex flex-col justify-between ">
              <div className="flex gap-2 items-center">
                <SiHomeassistantcommunitystore className="text-xl" />
                <h1 className="uppercase">{product.vendor}</h1>
              </div>
              <div className="pt-5">
                <h1 className="font-semibold lg:text-4xl text-3xl">
                  {product.name}
                </h1>
                <h1 className="capitalize text-gray-400 lg:text-lg md:text-md text-sm">
                  {product.category}
                </h1>
                <h1>&#9733;&#9733;&#9733;&#9733;&#9733;</h1>
              </div>
              <div className="py-5 ">
                <h1 className="text-3xl font-semibold">
                  &#8377; {product.sellingPrice}
                </h1>
                <div className="line-through text-gray-400">
                  <h1 className="pt-1">&#8377; {product.MRPprice}</h1>
                </div>
              </div>
              <div className="">
                <div className="flex gap-2 items-center">
                  <h1 className="text-gray-400 text-sm">
                    Available Stock : {product.quantity} nos
                  </h1>
                </div>
                <div className="">
                  <h1 className="text-gray-400 text-sm">
                    Product Code : {product._id}
                  </h1>
                </div>
              </div>
              <div className="">
                <h1
                  className={
                    product.trend
                      ? "px-3 py-1 bg-gray-200 rounded-md w-fit"
                      : "text-gray-400 line-through"
                  }
                >
                  Trending Product
                </h1>
                <div
                  className={
                    product.offer
                      ? "flex items-center gap-2 pt-2"
                      : "text-gray-400 line-through pt-2 flex items-center gap-2"
                  }
                >
                  <BiSolidOffer className="text-xl" />
                  <h1 className="pt-1">Offers available</h1>
                </div>
              </div>
              <div onClick={() => handleCart(product._id)} className="flex cursor-pointer justify-center items-center gap-1 px-3 py-2 rounded-md border bg-black text-white duration-200 text-sm mt-2">
                <GiShoppingCart className="font-semibold text-xl" />
                <h1 className="pt-1">Add to Cart</h1>
              </div>
            </div>
          </div>
          <div className="pt-10">
            <div className="">
              <h1 className="text-2xl font-semibold">Description</h1>
              <h3 className="text-justify pt-3">{product.description}</h3>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
      <SmallFooter/>
    </div>
  );
}
