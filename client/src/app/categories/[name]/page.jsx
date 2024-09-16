"use client"
import { useGlobalContext } from "@/context/GlobalProvider";
import { axiosInstance } from "@/utils/axiosConfig";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const { searchTerm, setSearchTerm } = useGlobalContext();

  useEffect(() => {
    const fetchCategory = async () => {
      const query = new URLSearchParams({
        search: searchTerm,
        category: filters.category,
      }).toString();
      try {
        const res = await axiosInstance.get(`/product?${query}`);
        console.log(res.data);
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
    </div>
  );
}
