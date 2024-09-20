import React from "react";
import { GiShoppingCart } from "react-icons/gi";
import Link from "next/link";
import { axiosInstance } from "@/utils/axiosConfig";
import { toast } from "react-toastify";
import { useGlobalContext } from "@/context/GlobalProvider";
import Image from "next/image";


const CartProduct = ({ product, quantity }) => {
  const { userData, setUserData,setCartModified,cartModified } = useGlobalContext();

  console.log("userdata",userData.cart)

  const handleRemoveProduct = async (id) => {
    try {
      const res = await axiosInstance.delete(`/cart/${id}`);
      console.log(res.data)
      // setUserData({ ...userData, cart: res.data });
      setCartModified(!cartModified)
      toast.success("Product removed to Cart");
      // location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Error adding to Cart");
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 relative group w-fit lg:max-w-[250px] max-w-[300px] z-[10]">
      <Link href={`/product/${product._id}`}>
        <div className="flex justify-center">
          <div className="">
            <Image
              src={product.image}
              width="500"
              height="500"
              alt="product image"
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
        onClick={() => handleRemoveProduct(product._id)}
        className="flex cursor-pointer justify-center items-center gap-1 px-3 py-1 rounded-md border hover:bg-black hover:text-white duration-200 text-sm mt-2"
      >
        <GiShoppingCart className="font-semibold text-xl" />
        <h1 className="pt-1">Remove</h1>
      </div>
      <h1 className="pt-2">Nos : {quantity}</h1>
    </div>
  );
};

export default CartProduct;
