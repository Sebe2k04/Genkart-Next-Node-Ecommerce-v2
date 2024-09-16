"use client";
import { useGlobalContext } from "@/context/GlobalProvider";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
const Search = () => {
  const router = useRouter();
  const path = usePathname();
  const { searchTerm, setSearchTerm } = useGlobalContext();

  const [term, setTerm] = useState("");
  const handleInputChange = (e) => {
    setTerm(e.target.value);
  };
  const handleSearch = () => {
    setSearchTerm(term);
    if (path === "/product" || path.startsWith("/admin")) {
      console.log("searchpath");
    } else {
      router.push("/product");
    }
  };

  useEffect(() => {
    console.log(searchTerm);
  }, [searchTerm]);

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className=" border flex h-fit w-fit pr-3 rounded-xl">
          <input
            type="text"
            defaultValue={searchTerm}
            name="search"
            id="search"
            onChange={handleInputChange}
            className=" bg-inherit rounded-xl  lg:min-w-[300px] focus:outline-none py-2 px-5"
          />
          <div className="flex items-center justify-end cursor-pointer  relative z-[100]">
            <CiSearch
              onClick={handleSearch}
              className="text-2xl cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
