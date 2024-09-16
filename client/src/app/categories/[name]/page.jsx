"use client";
import ProductCard from "@/components/ProductCard";
import { useGlobalContext } from "@/context/GlobalProvider";
import { axiosInstance } from "@/utils/axiosConfig";
import { Pagination } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const { searchTerm, setSearchTerm } = useGlobalContext();

  const { pagination, setPagination } = useGlobalContext();

  useEffect(() => {
    setPagination({ ...pagination, currentPage: 1 });
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      const query = new URLSearchParams({
        search: searchTerm,
        category: name,
      }).toString();
      try {
        const res = await axiosInstance.get(`/product?${query}`);
        console.log(res.data.products);
        setProducts(res.data.products);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching category");
      }
    };

    fetchCategory();
  }, [searchTerm]);
  return (
    <div className="lg:px-20 px-8py-5">
      <div className="py-5">
        <h1 className="text-center capitalize">{name}</h1>
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
      <div className="flex justify-center py-5">
        <Pagination/>
      </div>
    </div>
  );
}
