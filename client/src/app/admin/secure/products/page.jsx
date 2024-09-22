"use client";
import Search from "@/components/Search";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-toastify";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiCancel } from "react-icons/ti";
import { axiosInstance } from "@/utils/axiosConfig";
import { useGlobalContext } from "@/context/GlobalProvider";
import Filter from "@/components/Filter";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { GiShoppingCart } from "react-icons/gi";
import { BiSolidOffer } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Pagination from "@/components/Pagination";
import Loader from "@/components/Loader";

export default function Page() {
  const [openView, setOpenView] = useState(false);
  const [product, setProduct] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [modified, setModified] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const [PaginatedValue, SetPaginatedValue] = useState(1);

  const [loading, setLoading] = useState(true);

  const handleOpenView = (data) => {
    setProduct(data);
    setOpenView(!openView);
    setCurrentImage(data.image);
  };
  const handleOpenDelete = (id) => {
    setDeleteId(id);
    setOpenDelete(!openDelete);
  };

  // console.log(product);

  const handleDelete = async () => {
    setOpenDelete(!openDelete);
    try {
      const res = await axiosInstance.delete(`/product/${deleteId}`);
      console.log(res.data);
      toast.success("Product Removed");
      setModified(true);
    } catch (error) {
      toast.error("Error Removing Product");
      console.error(error);
    }
  };

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

  useEffect(() => {
    if (PaginatedValue == pagination.totalPages) {
    } else {
      setPagination({ ...pagination, totalPages: PaginatedValue});
    }
  }, [PaginatedValue]);

  const memoizedData = useMemo(() => {
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
        SetPaginatedValue(res.data.totalPages);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching Product");
        console.error(error);
      }
    };
    return async () => {
      setLoading(true);
      await fetchProducts();
    };
  }, [searchTerm, filters, modified, pagination]);
  useEffect(() => {
    memoizedData();
  }, [memoizedData]);
  return (
    <div className="lg:px-10 px-8 py-8 lg:pt-8 pt-24">
      <Dialog
        className="bg-gray-100 h-[80vh] p-5"
        open={openView}
        handler={handleOpenView}
      >
        <DialogHeader>
          <div className="flex w-full justify-between gap-20">
            <h1>View</h1>
            <div
              onClick={() => setOpenView(!openView)}
              className="flex gap-2 items-center bg-black text-white px-3 py-1 rounded-md"
            >
              <h1 className="text-sm">Close</h1>
            </div>
          </div>
        </DialogHeader>
        <DialogBody>
          <div className="relative h-[60vh] overflow-y-scroll text-black px-5">
            {product ? (
              <div className="pt-5 ">
                <div className="grid  gap-5 ">
                  <div className="grid grid-cols-1  gap-5">
                    <div className="flex  order-2  justify-center">
                      <div className="grid  place-items-start grid-cols-3  gap-5 py-2 ">
                        {product?.additionalImages.map((image, index) => (
                          <div
                            onClick={() => setCurrentImage(image)}
                            key={index}
                            className="mx-auto max-w-[80px] max-h-[80px] relative"
                          >
                            <img
                              src={image}
                              alt=""
                              className="rounded-md max-w-[100px] max-h-[100px] aspect-square mx-auto object-cover "
                            />
                          </div>
                        ))}
                        <img
                          src={product.image}
                          onClick={() => setCurrentImage(product.image)}
                          alt=""
                          className="rounded-md mx-auto object-cover max-h-[100px] max-w-[100px] aspect-square"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-3  order-1">
                      <img
                        src={currentImage}
                        alt=""
                        className="rounded-md w-full max-h-[400px] lg:max-h-full lg:w-full object-cover duration-200 "
                      />
                    </div>
                  </div>
                  <div className="pt-5 flex flex-col justify-between ">
                    <div className="flex gap-2 items-center">
                      <SiHomeassistantcommunitystore className="text-xl" />
                      <h1 className="uppercase">{product.vendor}</h1>
                    </div>
                    <div className="pt-5">
                      <h1 className="font-semibold lg:text-4xl text-3xl">
                        {product.name}
                      </h1>
                      <h1 className="capitalize text-gray-400 lg:text-lg md:text-md text-sm">
                        {product.category}
                      </h1>
                      <h1>&#9733;&#9733;&#9733;&#9733;&#9733;</h1>
                    </div>
                    <div className="py-5 ">
                      <h1 className="text-3xl font-semibold">
                        &#8377; {product.sellingPrice}
                      </h1>
                      <div className="line-through text-gray-400">
                        <h1 className="pt-1">&#8377; {product.MRPprice}</h1>
                      </div>
                    </div>
                    <div className="">
                      <div className="flex gap-2 items-center">
                        <h1 className="text-gray-400 text-sm">
                          Available Stock : {product.quantity} nos
                        </h1>
                      </div>
                      <div className="">
                        <h1 className="text-gray-400 text-sm">
                          Product Code : {product._id}
                        </h1>
                      </div>
                    </div>
                    <div className="">
                      <h1
                        className={
                          product.trend
                            ? "px-3 py-1 bg-gray-200 rounded-md w-fit"
                            : "text-gray-400 line-through"
                        }
                      >
                        Trending Product
                      </h1>
                      <div
                        className={
                          product.offer
                            ? "flex items-center gap-2 pt-2"
                            : "text-gray-400 line-through pt-2 flex items-center gap-2"
                        }
                      >
                        <BiSolidOffer className="text-xl" />
                        <h1 className="pt-1">Offers available</h1>
                      </div>
                    </div>
                    {/* <div className="flex cursor-pointer justify-center items-center gap-1 px-3 py-2 rounded-md border bg-black text-white duration-200 text-sm mt-2">
                      <GiShoppingCart className="font-semibold text-xl" />
                      <h1 className="pt-1">Add to Cart</h1>
                    </div> */}
                  </div>
                </div>
                <div className="pt-10">
                  <div className="">
                    <h1 className="text-2xl font-semibold">Description</h1>
                    <h3 className="text-justify pt-3">{product.description}</h3>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="flex justify-center capitalize pt-10 text-gray-400">
              <div className="">
                <h1 className="text-center">
                  A product of{" "}
                  <span>
                    <Link
                      href={"https://sebe2k04.vercel.app/"}
                      about="_blank"
                      className="px-1 text-black "
                    >
                      {" "}
                      Sebe{" "}
                    </Link>
                  </span>{" "}
                  | GenRio
                </h1>
                <div className="flex justify-center gap-5 text-black text-2xl pt-5">
                  <Link href={"https://www.linkedin.com/in/sebe2k04/"}>
                    <FaLinkedin />
                  </Link>
                  <Link href={"https://github.com/Sebe2k04"}>
                    <FaGithub />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter></DialogFooter>
      </Dialog>

      <Dialog
        className="bg-gray-100 w-[200px]"
        open={openDelete}
        handler={handleOpenDelete}
        size="xs"
      >
        <DialogBody>
          <div className="cursor-pointer text-black">
            <h1 className="text-center pb-5 ">
              {" "}
              Are you sure to delete this item?
            </h1>
            <div className="flex justify-between px-5">
              <div
                onClick={handleDelete}
                className="flex gap-2 items-center bg-black text-white px-3 py-1 rounded-md"
              >
                <RiDeleteBin5Line className="text-xl" />

                <h1>Delete</h1>
              </div>
              <div
                onClick={handleOpenDelete}
                className="flex gap-1 items-center border border-black px-3 py-1 rounded-md"
              >
                <TiCancel className="text-2xl" />

                <h1>Cancel</h1>
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>

      <div className="lg:flex justify-between items-center ">
        <div className="flex gap-2 items-center">
          <Link href={"/admin/secure/home"}>
            <IoIosArrowBack />
          </Link>

          <h1 className="text-xl font-semibold">All Products</h1>
        </div>
        <div className="flex justify-center lg:block pt-5 lg:pt-0">
          <Search />
        </div>
      </div>
      <div className="flex justify-between py-5">
        <div className="">
          <Filter />
        </div>
        <Link
          href={"/admin/secure/products/create"}
          className="flex bg-black px-5 py-2 rounded-xl text-white items-center gap-2"
        >
          <FaCirclePlus />
          <h1>Create</h1>
        </Link>
      </div>
      {
        loading ? <Loader/> : (
          <div className="">
            {products && (
        <div className="w-full overflow-x-scroll pb-20">
          <table className="table-auto w-full">
            <thead>
              <tr className="py-5 bg-gray-200 w-full ">
                <th className="lg:px-8 px-5 py-5 ">Image</th>
                <th className="lg:px-8 px-5 py-5 ">Name</th>
                <th className="lg:px-8 px-5 py-5 ">Quantity</th>
                <th className="lg:px-8 px-5 py-5 ">MRP</th>
                <th className="lg:px-8 px-5 py-5 ">Sell Price</th>
                <th className="lg:px-8 px-5 py-5 ">Created At</th>
                <th className="lg:px-8 px-5 py-5 ">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="px-5 text-center py-3 flex justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-w-[100px] max-h-[100px] aspect-square object-cover rounded-md"
                    />
                  </td>
                  <td className="px-5 text-center py-3">{product.name}</td>
                  <td className="px-5 text-center py-3">{product.quantity}</td>
                  <td className="px-5 text-center py-3">
                    &#8377; {product.MRPprice}
                  </td>
                  <td className="px-5 text-center py-3">
                    &#8377; {product.sellingPrice}
                  </td>
                  <td className="px-5 text-center py-3">
                    {new Date(product.createdAt).toLocaleString()}
                  </td>
                  <td className="px-5 text-center py-3">
                    <div className="flex justify-center">
                      <div className="relative group">
                        <button className="hover:text-black hover:scale-125 duration-100 relative z-[1]">
                          ...
                        </button>
                        <div className="absolute right-0 pt-5 bg-white z-[10] text-gray-400 hidden group-hover:block hover:block">
                          <div className="container bg-white px-5 pt-3 pb-1 w-full shadow-lg rounded-xl ">
                            <div className=" min-w-fit text-sm bg-white">
                              <ul>
                                <li className="mb-2 hover:text-black cursor-pointer">
                                  <h1 onClick={() => handleOpenView(product)}>
                                    View
                                  </h1>
                                </li>
                                <li className="mb-2 hover:text-black">
                                  <Link
                                    href={`/admin/secure/products/update/${product._id}`}
                                  >
                                    Edit
                                  </Link>
                                </li>
                                <li className="mb-2 hover:text-black">
                                  <h1
                                    onClick={() =>
                                      handleOpenDelete(product._id)
                                    }
                                  >
                                    Delete
                                  </h1>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

          </div>
        )
      }
      <div className="flex justify-center py-5">
        <Pagination />
      </div>
    </div>
  );
}
