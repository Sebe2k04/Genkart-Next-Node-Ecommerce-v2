"use client";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import Search from "@/components/Search";
import { useGlobalContext } from "@/context/GlobalProvider";
import { axiosInstance } from "@/utils/axiosConfig";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const [products, setProducts] = useState([]);

  const [PaginatedValue, setPaginatedValue] = useState(1);

  const [loading, setLoading] = useState(true);

  const { searchTerm, setSearchTerm, pagination, setPagination } =
    useGlobalContext();

  useEffect(() => {
    setPagination({ ...pagination, currentPage: 1 });
    setSearchTerm("");
  }, []);

  useEffect(() => {
    if (PaginatedValue == pagination.totalPages) {
    } else {
      setPagination({ ...pagination, totalPages: PaginatedValue });
    }
  }, [PaginatedValue]);

  useEffect(() => {
    setLoading(true);
    const fetchCategory = async () => {
      const query = new URLSearchParams({
        search: searchTerm,
        pagination: pagination.currentPage,
      }).toString();
      try {
        const res = await axiosInstance.get(`/product/filter/trend?${query}`);
        // console.log(res.data.products);
        setProducts(res.data.products);
        setPaginatedValue(res.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching category");
      }
    };

    fetchCategory();
  }, [searchTerm]);

  return (
    <div className="lg:px-20 px-8 py-5">
      <div className="py-5">
        <h1 className="text-center font-semibold lg:text-2xl text-xl">
          {" "}
          Trending Products
        </h1>
      </div>
      <div className="lg:hidden pb-10">
        <Search />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="lg:grid-cols-4 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2 gap-8 py-5 pb-24">
          {products &&
            products.map((product, index) => (
              <div key={index} className="m-auto p-2">
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      )}
      <div className="flex justify-center">
        <Pagination />
      </div>
    </div>
  );
}
