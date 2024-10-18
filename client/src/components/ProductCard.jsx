import React from "react";
import { GiShoppingCart } from "react-icons/gi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Link from "next/link";
import { axiosInstance } from "@/utils/axiosConfig";
import { toast } from "react-toastify";
import Image from "next/image";
import { useGlobalContext } from "@/context/GlobalProvider";

const ProductCard = ({ product }) => {

  const {userData} = useGlobalContext();

  const handleCart = async (id) => {
    if(userData){
      try {
        const res = await axiosInstance.post("/cart", {
          productId: id,
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
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 relative group w-fit lg:max-w-[250px] max-w-[300px] z-[10]">
      <Link href={`/product/${product._id}`}>
        <div className="flex justify-center">
          <div className="aspect-square	 object-cover">
            {/* <img
              src={product.image}
              loading="lazy"
              alt=""
              className=" object-cover max-w-[250px] max-h-[250px] lg:max-w-[200px] lg:max-h-[200px] rounded-md aspect-square	"
            /> */}

            <Image
              src={product.image}
              width="500"
              height="500"
              alt="product image"
              priority={false}
              placeholder="blur"
              blurDataURL={product.image}
              className=" object-cover max-w-[250px] max-h-[250px] lg:max-w-[200px] lg:max-h-[200px] rounded-md aspect-square	"
            />
          </div>
        </div>
        <div className="pt-3">
          <div className="flex gap-3">
            <div className="">
              <h1 className="pt-1">&#8377; {product.sellingPrice}</h1>
            </div>
            <div className="line-through text-gray-400">
              <h1 className="pt-1">&#8377; {product.MRPprice}</h1>
            </div>
          </div>
          <h1 className="truncate font-semibold capitalize">{product.name}</h1>
          <h1>&#9733;&#9733;&#9733;&#9733;&#9733;</h1>
          <h3 className="capitalize text-sm text-gray-400">
            {product.category}
          </h3>
        </div>
      </Link>
      <div
        onClick={() => handleCart(product._id)}
        className="flex cursor-pointer justify-center items-center gap-1 px-3 py-1 rounded-md border hover:bg-black hover:text-white duration-200 text-sm mt-2"
      >
        <GiShoppingCart className="font-semibold text-xl" />
        <h1 className="pt-1">Add to Cart</h1>
      </div>
      {/* <h1 className="pt-2 text-[12px]">For Demo purpose only - GenRio !</h1> */}
    </div>
  );
};

export default ProductCard;
