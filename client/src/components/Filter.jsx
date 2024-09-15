"use client";
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
const Filter = () => {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = (data) => {
    setOpenFilter(!openFilter);
  };

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
          <div className="relative h-[60vh] overflow-y-scroll"></div>
        </DialogBody>
        <DialogFooter>
          <div className="flex justify-end">
            <div className="bg-black text-white flex gap-2 px-3 py-2 rounded-md items-center cursor-pointer ">
              <FaFilter className="text-xl" />
              <h2 className="lg:flex hidden">Apply Filters</h2>
            </div>
          </div>
        </DialogFooter>
      </Dialog>
      <div onClick={handleOpenFilter} className="bg-black text-white flex gap-2 px-3 py-2 rounded-md items-center cursor-pointer ">
        <FaFilter className="text-xl" />
        <h2 className="lg:flex hidden">Apply Filters</h2>
      </div>
    </div>
  );
};

export default Filter;
