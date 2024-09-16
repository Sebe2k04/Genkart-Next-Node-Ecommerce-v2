'use client'
import ProductCard from "@/components/ProductCard";
import { axiosInstance } from "@/utils/axiosConfig";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchTrend = async () => {
      try {
        const res = await axiosInstance.get("/product/filter/trend");
        console.log(res.data);
        setProducts(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching trending products");
      }
    };
    fetchTrend();
  }, []);

  return (
    <div className="lg:px-20 px-8 py-5">
      <div className="py-5">
        <h1 className="text-center font-semibold lg:text-2xl text-xl">
          {" "}
          Trending Products
        </h1>
      </div>
      <div className="">
        {products &&
          products.map((product, index) => {
            return (
              <div key={index} className="">
                <ProductCard product={product} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
