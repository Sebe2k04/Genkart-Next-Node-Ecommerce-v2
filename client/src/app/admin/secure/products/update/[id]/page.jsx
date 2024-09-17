"use client";
import Search from "@/components/Search";
import Link from "next/link";
import { FaCirclePlus } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { FaBox } from "react-icons/fa6";
import { Select, Option, Spinner } from "@material-tailwind/react";
import { Switch } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { axiosConfig } from "@/utils/axiosConfig";
import { toast } from "react-toastify";
import axios from "axios";
import { axiosInstance } from "@/utils/axiosConfig";
import { useParams } from "next/navigation";
import Image from "next/image";

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

  const { id } = useParams();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [vendor, setVendor] = useState("GenRio");
  const [MRPprice, setMRPprice] = useState("");
  const [sellingprice, setSellingprice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [trend, setTrend] = useState(false);
  const [offer, setOffer] = useState(false);
  const [image, setImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [oldData, setOldData] = useState();
  const [loading, setLoading] = useState(false);

  const inputFile = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/product/${id}`);
        setOldData(res.data);
        setLoading(false);
        console.log(res.data);
        setName(res.data.name);
        setCategory(res.data.category);
        setVendor(res.data.vendor);
        setMRPprice(res.data.MRPprice);
        setSellingprice(res.data.sellingPrice);
        setQuantity(res.data.quantity);
        setDescription(res.data.description);
        setTrend(res.data.trend);
        setOffer(res.data.offer);
        // setImage(res.data.image);
        // setAdditionalImages(res.data.additionalImages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, []);

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
    if (image) {
      formdata.append("image", image);
    }
    // let additionalImagesData = JSON.parse(additionalImages)
    // additionalImagesData.forEach((img) => formdata.append('additionalImages', img))

    if (additionalImages.length > 0) {
      for (let i = 0; i < additionalImages.length; i++) {
        formdata.append("additionalImages", additionalImages[i]);
      }
    }

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/product/${id}`,
        formdata,
        axiosConfig,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("Error updating product");
      console.error(error);
    }
  };

  return (
    <div className="h-full ">
      <div className={loading ? "absolute w-full h-screen" : "hidden"}>
        <div className="flex justify-center items-center bg-white p-5 rounded-xl">
          <Spinner className="h-10 w-10" />
        </div>
      </div>
      {oldData ? (
        <div className="lg:px-10 px-8 py-8 lg:pt-8 pt-24">
          <div className="lg:flex justify-between items-center ">
            <div className="flex gap-2 items-center">
              <Link href={"/admin/secure/products"}>
                <IoIosArrowBack />
              </Link>

              <h1 className="text-xl font-semibold">Update Product</h1>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className=" w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600 sm:text-sm"
                />
              </div>
              <div className="relative z-[0] grid gap-3">
                <label className=" text-sm font-medium text-gray-700">
                  Select Category
                </label>
                <Select
                  value={category}
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
                  Vendor
                </label>
                <input
                  type="text"
                  value={vendor}
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
                  value={MRPprice}
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
                  value={sellingprice}
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
                  value={quantity}
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
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="file:bg-gray-50 file:px-5 file:py-2 file:rounded-md file:border file:border-gray-200 lg:file:mr-10 file:mr-5"
                />
              </div>
              <div className="">
                <h1>Image</h1>
                <div className="flex flex-wrap py-5">
                  {/* <img src={URL.createObjectURL(image)} alt="" className="w-[300px]" /> */}
                  <Image
                    src={image ? URL.createObjectURL(image) : oldData.image}
                    width="1000"
                    height="1000"
                    alt=""
                    className="w-[300px] rounded-xl"
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <label className=" text-sm font-medium text-gray-700">
                  Additional Images -{" "}
                  <span className="text-red-400">Max 2 images</span>
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
                  accept="image/*"
                  ref={inputFile}
                  onChange={handleAdditionalImages}
                  className="file:bg-gray-50 file:px-5 file:py-2 file:rounded-md file:border file:border-gray-200 lg:file:mr-10 file:mr-5"
                />
              </div>
              <div className="">
                <h1>Additional image</h1>
                {additionalImages.length > 0 ? (
                  <div className="flex flex-wrap py-5">
                    <Image
                      width="1000"
                      height="1000"
                      src={URL.createObjectURL(additionalImages[0])}
                      alt=""
                      className="w-[300px] rounded-xl aspect-square object-cover p-5"
                    />
                    <Image
                      width="1000"
                      height="1000"
                      src={URL.createObjectURL(additionalImages[1])}
                      alt=""
                      className="w-[300px] rounded-xl aspect-square object-cover p-5"
                    />
                  </div>
                ) : (
                  <div className="flex flex-wrap py-5">
                    {oldData.additionalImages.map((image, index) => (
                      <div key={index} className="">
                        {/* <img src={URL.createObjectURL(image)} alt="" key={index} /> */}
                        <Image
                          width="1000"
                          height="1000"
                          src={image}
                          alt=""
                          className="w-[300px] rounded-xl aspect-square object-cover p-5"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="grid gap-3">
                <label className=" text-sm font-medium text-gray-700">
                  Product Description
                </label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600 sm:text-sm"
                  rows="5"
                />
              </div>
              <div className="grid gap-3">
                <label className=" text-sm font-medium text-gray-700">
                  Trend
                </label>
                <Switch
                  checked={trend}
                  onChange={(e) => setTrend(e.target.checked)}
                />
              </div>

              <div className="grid gap-3">
                <label className=" text-sm font-medium text-gray-700">
                  Offer
                </label>
                <Switch
                  checked={offer}
                  onChange={(e) => setOffer(e.target.checked)}
                />
              </div>
              <div className="grid gap-3 pt-5">
                <input
                  type="submit"
                  value={"Update Product"}
                  className=" w-full px-3 py-2 border border-gray-300 bg-black text-white rounded-md sm:text-sm"
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen ">
          <Spinner className="h-10 w-10" />
        </div>
      )}
    </div>
  );
}
