"use client";
import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { Select, Option, Spinner } from "@material-tailwind/react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { axiosInstance } from "@/utils/axiosConfig";
const Filter = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const handleOpenFilter = (data) => {
    setOpenFilter(!openFilter);
  };

  const { filters, setFilters, setProducts } = useGlobalContext();
  const categories = [
    {
      label: "Casuals",
      value: "casuals",
    },
    {
      label: "T shirts",
      value: "tshirts",
    },
    {
      label: "None",
      value: "",
    },
  ];
  const handleFilter = () => {
    setFilters({
      ...filters,
      category,
      minPrice,
      maxPrice,
    });
    setOpenFilter(false);
    // axiosInstance
    //   .get(`/products?category=${filters.category}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}`)
    //   .then((response) => {
    //     setProducts(response.data);
    //   })
    //  .catch((error) => {
    //     console.error("Error fetching products: ", error);
    //   });
  };

  useEffect(() => {
    setCategory(filters.category);
  }, [filters]);

  return (
    <div>
      <Dialog
        className="bg-gray-100  p-5"
        open={openFilter}
        handler={handleOpenFilter}
      >
        <DialogHeader>
          <div className="flex w-full justify-between gap-20">
            <h1>Filters</h1>
            <div
              onClick={handleOpenFilter}
              className="flex gap-2 items-center bg-black text-white px-3 py-1 rounded-md  cursor-pointer"
            >
              <h1 className="text-sm">Close</h1>
            </div>
          </div>
        </DialogHeader>
        <DialogBody>
          <div className="relative grid gap-5">
            <div className="relative z-[0] grid gap-3">
              <label className=" text-sm font-medium text-gray-700">
                Select Category
              </label>
              <Select
                value={category}
                id="category"
                name="category"
                placeholder={"Select Category"}
                className="border-gray-300 focus:border-gray-600 focus:outline-none placeholder:text-gray-400 label:text-gray-300 focus:ring-0 "
              >
                {categories.map((category, index) => (
                  <Option
                    onClick={() => setCategory(category.value)}
                    key={index}
                    value={category.value}
                  >
                    {category.label}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="grid gap-3">
              <label className=" text-sm font-medium text-gray-700">
                Min Price
              </label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="capitalize w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600 sm:text-sm"
              />
            </div>
            <div className="grid gap-3">
              <label className=" text-sm font-medium text-gray-700">
                Max Price
              </label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className=" w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600 sm:text-sm"
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <div className="flex justify-end">
            <div
              onClick={handleFilter}
              className="bg-black text-white flex gap-2 px-3 py-2 rounded-md items-center cursor-pointer "
            >
              <FaFilter className="text-xl" />
              <h2 className="">Apply Filters</h2>
            </div>
          </div>
        </DialogFooter>
      </Dialog>
      <div
        onClick={handleOpenFilter}
        className="bg-black text-white flex gap-2 px-3 py-2 rounded-xl items-center cursor-pointer "
      >
        <FaFilter className="text-xl" />
        <h2 className="lg:flex hidden">Apply Filters</h2>
      </div>
    </div>
  );
};

export default Filter;
