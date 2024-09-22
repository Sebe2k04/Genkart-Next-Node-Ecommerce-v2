"use client";
import Search from "@/components/Search";
import Link from "next/link";
import { FaCirclePlus } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { FaBox } from "react-icons/fa6";
import { Select, Option, Spinner } from "@material-tailwind/react";
import { Switch } from "@material-tailwind/react";
import { useRef, useState } from "react";
import { axiosConfig } from "@/utils/axiosConfig";
import { toast } from "react-toastify";
import axios from "axios";
import { axiosInstance } from "@/utils/axiosConfig";

export default function Page() {
  const categories = [
    {
      label: "Casuals",
      value: "casuals",
    },
    {
      label: "T shirts",
      value: "tshirts",
    },
  ];

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [vendor, setVendor] = useState("GenRio");
  const [MRPprice, setMRPprice] = useState("");
  const [sellingprice, setSellingprice] = useState("");
  const [quantity, setQuantity] = useState(10);
  const [description, setDescription] = useState("");
  const [trend, setTrend] = useState(false);
  const [offer, setOffer] = useState(false);
  const [image, setImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputFile = useRef(null);

  console.log(image);
  console.log(additionalImages);
  const MAX_LENGTH = 2;
  const handleReset = () => {
    if (inputFile.current) {
        inputFile.current.value = "";
        inputFile.current.type = "text";
        inputFile.current.type = "file";
    }
};
  const handleAdditionalImages = (e) => {
    if (Array.from(e.target.files).length > MAX_LENGTH) {
      e.preventDefault();
      toast.error(`Cannot upload files more than ${MAX_LENGTH}`);
      // e.target.files = null;
      handleReset();
      return;
    } else {
      setAdditionalImages(e.target.files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("description", description);
    formdata.append("vendor", vendor);
    formdata.append("MRPprice", MRPprice);
    formdata.append("sellingPrice", sellingprice);
    formdata.append("quantity", quantity);
    formdata.append("category", category);
    formdata.append("trend", trend);
    formdata.append("offer", offer);
    formdata.append("image", image);
    // let additionalImagesData = JSON.parse(additionalImages)
    // additionalImagesData.forEach((img) => formdata.append('additionalImages', img))

    for (let i = 0; i < additionalImages.length; i++) {
      formdata.append("additionalImages", additionalImages[i]);
    }

    try {
      const res = await axiosInstance.post(`/product`, formdata, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      console.log(res.data);
      setLoading(false);
      toast.success("Product added successfully");
    } catch (error) {
      toast.error("Error creating product");
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="lg:px-10 px-8 py-8 lg:pt-8 pt-24 ">
      <div
        className={
          loading ? "fixed z-[50] lg:left-[55%] top-[45%] left-[45%]" : "hidden"
        }
      >
        <div className="flex justify-center items-center bg-white p-5 rounded-xl">
          <div className="">
            <Spinner className="h-10 w-10" />
          </div>
        </div>
      </div>
      <div className="lg:flex justify-between items-center ">
        <div className="flex gap-2 items-center">
          <Link href={"/admin/secure/products"}>
            <IoIosArrowBack />
          </Link>

          <h1 className="text-xl font-semibold">Create Product</h1>
        </div>
        <div className="flex justify-center lg:block pt-5 lg:pt-0">
          <Link
            href={"/admin/secure/products"}
            className="flex bg-black px-5 py-2 rounded-xl text-white items-center gap-2"
          >
            <FaBox />
            <h1>All Products</h1>
          </Link>
        </div>
      </div>
      <div className="">
        <form action="" className="grid gap-5 py-5" onSubmit={handleSubmit}>
          <div className="grid gap-3">
            <label className=" text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
              className=" w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600 sm:text-sm"
            />
          </div>
          <div className="relative z-[0] grid gap-3">
            <label className=" text-sm font-medium text-gray-700">
              Select Category
            </label>
            <Select
              required
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
            <label className=" text-sm font-medium text-gray-700">Vendor</label>
            <input
              type="text"
              required
              onChange={(e) => setVendor(e.target.value)}
              className=" w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600 sm:text-sm"
            />
          </div>
          <div className="grid gap-3">
            <label className=" text-sm font-medium text-gray-700">
              MRP Price
            </label>
            <input
              type="number"
              required
              onChange={(e) => setMRPprice(e.target.value)}
              className=" w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600 sm:text-sm"
            />
          </div>
          <div className="grid gap-3">
            <label className=" text-sm font-medium text-gray-700">
              Selling Price
            </label>
            <input
              type="number"
              required
              onChange={(e) => setSellingprice(e.target.value)}
              className=" w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600 sm:text-sm"
            />
          </div>
          <div className="grid gap-3">
            <label className=" text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              required
              defaultValue={10}
              onChange={(e) => setQuantity(e.target.value)}
              className=" w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600 sm:text-sm"
            />
          </div>
          <div className="grid gap-3">
            <label className=" text-sm font-medium text-gray-700">
              Product Image
            </label>
            {/* <input
              type="text"
              defaultValue={10}
              className=" w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600 sm:text-sm"
            /> */}
            <input
              type="file"
              name="image"
              id="image"
              required
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="file:bg-gray-50 file:px-5 file:py-2 file:rounded-md file:border file:border-gray-200 lg:file:mr-10 file:mr-5"
            />
          </div>
          <div className="grid gap-3">
            <label className=" text-sm font-medium text-gray-700">
              Additional Images - <span className="text-red-400">Max 2 images</span>
            </label>
            {/* <input
              type="text"
              defaultValue={10}
              className=" w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600 sm:text-sm"
            /> */}
            <input
              type="file"
              name="additionalImages"
              id="additionalImages"
              multiple
              required
              accept="image/*"
              ref={inputFile}
              onChange={handleAdditionalImages}
              className="file:bg-gray-50 file:px-5 file:py-2 file:rounded-md file:border file:border-gray-200 lg:file:mr-10 file:mr-5"
            />
          </div>

          <div className="grid gap-3">
            <label className=" text-sm font-medium text-gray-700">
              Product Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600 sm:text-sm"
              rows="5"
            />
          </div>
          <div className="grid gap-3">
            <label className=" text-sm font-medium text-gray-700">Trend</label>
            <Switch onChange={(e) => setTrend(e.target.checked)} />
          </div>

          <div className="grid gap-3">
            <label className=" text-sm font-medium text-gray-700">Offer</label>
            <Switch onChange={(e) => setOffer(e.target.checked)} />
          </div>
          <div className="grid gap-3 pt-5">
            <input
              type="submit"
              required
              value={"Create Product"}
              className=" w-full px-3 py-2 border border-gray-300 bg-black text-white rounded-md sm:text-sm"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
