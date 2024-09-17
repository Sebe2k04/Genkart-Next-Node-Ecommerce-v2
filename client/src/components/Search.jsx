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
    // if (path === "/product" || path.startsWith("/admin")) {
    //   console.log("searchpath");
    // } else {
    //   router.push("/product");
    // }
    if(path=== "/"){
      router.push("/product")
    }
  };

  useEffect(() => {
    // console.log(searchTerm);
    setTerm(searchTerm)
  }, [searchTerm]);

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className=" border flex h-fit w-fit rounded-xl ">
          <input
            type="text"
            name="search"
            id="search"
            value={term}
            onChange={handleInputChange}
            className=" rounded-xl  lg:min-w-[300px] lg:max-w-[400px] max-w-[200px] md:max-w-[300px] focus:outline-none py-2 px-5"
          />
          <div onClick={handleSearch} className="">
            <div className="flex items-center justify-center h-full cursor-pointer relative pr-3 pl-2 rounded-r-xl-3 z-[100]">
              <CiSearch className="text-2xl cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
