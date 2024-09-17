"use client";

import Filter from "@/components/Filter";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import Search from "@/components/Search";
import { useGlobalContext } from "@/context/GlobalProvider";
import { axiosInstance } from "@/utils/axiosConfig";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const {
    products,
    setProducts,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    pagination,
    setPagination,
    userData,
    setUserData,
  } = useGlobalContext();
  // console.log(searchTerm, "in p");
  // console.log(pagination, "in p");
  // console.log(filters, "in p");
  const [PaginatedValue, setPaginatedValue] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPagination({ ...pagination, currentPage: 1 });
  }, []);

  useEffect(() => {
    if (PaginatedValue == pagination.totalPages) {
    } else {
      setPagination({ ...pagination, totalPages: PaginatedValue });
    }
  }, [PaginatedValue]);
  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      const query = new URLSearchParams({
        search: searchTerm,
        category: filters.category,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        page: pagination.currentPage,
      }).toString();
      try {
        const res = await axiosInstance.get(`/product?${query}`);
        // console.log(res.data);
        setProducts(res.data.products);
        setPaginatedValue(res.data.totalPages);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching Product");
        console.error(error);
      }
    };
    fetchProducts();
  }, [searchTerm, filters, pagination]);

  return (
    <div className="lg:px-20 px-8 py-5">
      {loading ? (
        <Loader />
      ) : (
        <div className="">
          <div className="flex lg:justify-end items-center gap-3 justify-between">
            <div className="lg:hidden">
              <Search />
            </div>
            <div className="">
              <Filter />
            </div>
          </div>

          <div className="lg:grid-cols-4 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2 gap-8 py-5 pb-24">
            {products &&
              products.map((product, index) => (
                <div key={index} className="m-auto p-2">
                  <ProductCard product={product} />
                </div>
              ))}
          </div>
          <div className="flex justify-center py-5">
            <Pagination />
          </div>
        </div>
      )}
    </div>
  );
}
