"use client";
import CartProduct from "@/components/CartProduct";
import Loader from "@/components/Loader";
import { useGlobalContext } from "@/context/GlobalProvider";
import { axiosInstance } from "@/utils/axiosConfig";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const { userAuth, userData, setUserData } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axiosInstance.get("/cart");
        console.log(res.data.cart);
        setUserData({ ...userData, cart: res.data });
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching cart");
      }
    };

    fetchCart();
  }, []);
  return (
    <div className="lg:px-20 px-8 py-5">
      <div className="py-5">
        <h1 className="text-xl font-semibold text-center">My Cart</h1>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="lg:grid-cols-4 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2 gap-8 py-5 pb-24">
          {userData?.cart &&
            userData.cart.map((product, index) => {
              return (
                <div key={index} className="m-auto p-2">
                  <CartProduct
                    product={product.product}
                    quantity={product.quantity}
                  />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
