"use client";
import CartProduct from "@/components/CartProduct";
import { useGlobalContext } from "@/context/GlobalProvider";
import { axiosInstance } from "@/utils/axiosConfig";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const { userAuth, userData ,setUserData  } = useGlobalContext();
  const router = useRouter();
  useEffect(()=>{
    const fetchCart = async () => {
        try {
            const res = await axiosInstance.get('/cart');
            console.log(res.data.cart);
            setUserData({...userData, cart: res.data});
        } catch (error) {
            console.log(error);
            toast.error("Error fetching cart");
        }
    }

    fetchCart();
  },[userData])
  return <div className="lg:px-20 px-8 py-5">
    <div className=""></div>
    <div className="">
        {
            userData?.cart && userData.cart.map((product,index)=>{
                return (
                    <div key={index} className="">
                        <CartProduct product={product.product} quantity={product.quantity}/>
                    </div>
                )
            })
        }
    </div>
  </div>;
}
