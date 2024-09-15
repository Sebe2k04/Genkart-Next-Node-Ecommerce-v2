"use client";
import Search from "@/components/Search";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-toastify";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiCancel } from "react-icons/ti";
import { axiosInstance } from "@/utils/axiosConfig";


export default function Page() {
  const [products, setProducts] = useState([]);
  const [openView, setOpenView] = useState(false);
  const [current, setCurrent] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [modified,setModified] = useState(false)
  const handleOpenView = (data) => {
    setCurrent(data);
    setOpenView(!openView);
  };
  const handleOpenDelete = (id) => {
    setDeleteId(id);
    setOpenDelete(!openDelete);
  };

  console.log(current);

  const handleDelete = async () => {
    setOpenDelete(!openDelete);
    try {
      const res = await axiosInstance.delete(`/product/${deleteId}`)
      console.log(res.data);
      toast.success("Product Removed");
      setModified(true);
    } catch (error) {
      toast.error("Error Removing Product");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get('/product')
        setProducts(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching products");
      }
    };

    fetchProducts();
  }, [modified]);
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
                onClick={handleOpenView}
                className="flex gap-2 items-center bg-black text-white px-3 py-1 rounded-md"
              >
               

                <h1 className="text-sm">Close</h1>
              </div>
          </div>
        </DialogHeader>
        <DialogBody>
          <div className="relative h-[60vh] overflow-y-scroll"></div>
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
        <div className=""></div>
        <Link
          href={"/admin/secure/products/create"}
          className="flex bg-black px-5 py-2 rounded-xl text-white items-center gap-2"
        >
          <FaCirclePlus />
          <h1>Create</h1>
        </Link>
      </div>
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
                  <img src={product.image} alt={product.name} width="100" />
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
                                  onClick={() => handleOpenDelete(product._id)}
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
    </div>
  );
}
