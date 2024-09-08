import React from "react";
import { CiSearch } from "react-icons/ci";
const Search = () => {
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="bg-gray-100 flex h-fit w-fit pr-3 rounded-xl">
          <input
            type="text"
            className="bg-gray-100 rounded-xl  lg:min-w-[350px] focus:outline-none py-2 px-5"
          />
          <div className="flex items-center justify-end">
            <CiSearch className="text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
